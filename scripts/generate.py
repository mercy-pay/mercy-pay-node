"""Generates src/types.ts (the API objects) and src/resources.ts (one class per resource)
from the API reference copy (test/openapi.json) and scripts/operations.json.
Run: python3 scripts/generate.py"""
import json, os, re

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec = json.load(open(os.path.join(root, 'test/openapi.json')))
ops = json.load(open(os.path.join(root, 'scripts/operations.json')))
schemas = spec['components']['schemas']
catalog = json.load(open(os.path.join(root, 'test/catalog.json')))
params_by_ref = spec['components'].get('parameters', {})

# Request fields whose values come from the catalog: known values, any other string still
# accepted so a new operator never breaks a build.
CATALOG_FIELDS = {'provider': 'MobileMoneyProvider', 'country': 'CountryCode', 'allowed_countries': 'CountryCode[]'}

def ts_type(prop):
    if '$ref' in prop:
        return prop['$ref'].split('/')[-1]
    if 'oneOf' in prop or 'anyOf' in prop:
        return ' | '.join(ts_type(p) for p in prop.get('oneOf', prop.get('anyOf')))
    if 'const' in prop:
        return json.dumps(prop['const'])
    t = prop.get('type', 'unknown')
    types = t if isinstance(t, list) else [t]
    out = []
    for one in types:
        if one == 'null': out.append('null')
        elif one == 'string':
            out.append(' | '.join(json.dumps(e) for e in prop['enum'] if e is not None) if prop.get('enum') else 'string')
        elif one in ('integer', 'number'): out.append('number')
        elif one == 'boolean': out.append('boolean')
        elif one == 'array':
            item = ts_type(prop.get('items', {})) if prop.get('items') else 'unknown'
            out.append(f'Array<{item}>' if '|' in item else f'{item}[]')
        elif one == 'object':
            if prop.get('properties'):
                fields = '; '.join(f'{k}: {ts_type(v)}' for k, v in prop['properties'].items())
                out.append('{ ' + fields + ' }')
            else:
                out.append('Record<string, unknown>')
        else: out.append('unknown')
    return ' | '.join(dict.fromkeys(out))

lines = ['// Généré par scripts/generate.py depuis la référence de l\'API. Ne pas modifier à la main.', '']
for name, schema in schemas.items():
    if name == 'Error':
        continue
    lines.append(f'export interface {name} {{')
    for field, prop in schema.get('properties', {}).items():
        desc = prop.get('description')
        if desc:
            lines.append(f'  /** {desc.replace("*/", "")} */')
        lines.append(f'  {field}: {ts_type(prop)};')
    lines.append('  [field: string]: unknown;')
    lines.append('}')
    lines.append('')
def pascal(s):
    return s[0].upper() + s[1:]

def quoted(name):
    return name if re.match(r'^[A-Za-z_][A-Za-z0-9_]*$', name) else json.dumps(name)

param_fields = {}
for path, methods in spec['paths'].items():
    for verb, d in methods.items():
        fields = []
        for p in d.get('parameters', []):
            p = params_by_ref[p['$ref'].split('/')[-1]] if '$ref' in p else p
            if p['in'] == 'query':
                fields.append((p['name'], p.get('schema', {}), p.get('required', False), p.get('description')))
        body = d.get('requestBody', {}).get('content', {}).get('application/json', {}).get('schema', {})
        required = set(body.get('required', []))
        for name, prop in body.get('properties', {}).items():
            fields.append((name, prop, name in required, prop.get('description')))
        param_fields[d['operationId']] = fields

lines.append('// Ce que chaque opération accepte.')
lines.append('')
for op_id, fields in param_fields.items():
    lines.append(f'export interface {pascal(op_id)}Params {{')
    groups = {}
    for name, prop, required, desc in fields:
        # The client writes `expand: [...]` as expand[]=… and `created: { gte }` as created[gte]=….
        if name.endswith('[]'):
            name = name[:-2]
        group = re.match(r'^(\w+)\[(\w+)\]$', name)
        if group:
            groups.setdefault(group.group(1), []).append((group.group(2), ts_type(prop), desc))
            continue
        if desc:
            lines.append(f'  /** {desc.replace("*/", "")} */')
        kind = CATALOG_FIELDS.get(name) if prop.get('type') in ('string', 'array') and not prop.get('enum') else None
        lines.append(f'  {quoted(name)}{"" if required else "?"}: {kind or ts_type(prop)};')
    for group, members in groups.items():
        lines.append('  ' + group + '?: { ' + '; '.join(f'{m}?: {t}' for m, t, _ in members) + ' };')
    lines.append('}')
    lines.append('')

lines.insert(2, "import type { CountryCode, MobileMoneyProvider } from './catalog.js';")
lines.insert(3, '')
open(os.path.join(root, 'src/types.ts'), 'w').write('\n'.join(lines))

# The catalog as constants: autocompletion for operators, countries and event types.
countries = catalog['countries']
providers = [p['code'] for c in countries for p in c['providers']]
cat = ['// Généré par scripts/generate.py depuis le catalogue Mercy Pay. Ne pas modifier à la main.', '']
cat.append('/** The open countries and their mobile money operators. */')
cat.append('export const COUNTRIES = ' + json.dumps([{'code': c['code'], 'name': c['name'], 'currency': c['currency'], 'providers': c['providers']} for c in countries], ensure_ascii=False, indent=2) + ' as const;')
cat.append('')
cat.append('/** A mobile money operator code. Any other string stays accepted: the list grows. */')
cat.append('export type MobileMoneyProvider = ' + ' | '.join(json.dumps(p) for p in providers) + ' | (string & {});')
cat.append('')
cat.append('/** A country code (ISO 3166-1 alpha-3). Any other string stays accepted: the list grows. */')
cat.append('export type CountryCode = ' + ' | '.join(json.dumps(c['code']) for c in countries) + ' | (string & {});')
cat.append('')
cat.append('/** Every webhook event type. */')
cat.append('export const EVENT_TYPES = ' + json.dumps(catalog['event_types']) + ' as const;')
cat.append('')
cat.append('export type EventType = (typeof EVENT_TYPES)[number];')
cat.append('')
open(os.path.join(root, 'src/catalog.ts'), 'w').write('\n'.join(cat))

# Which object each operation returns, read from its success response.
op_by_id, op_is_list, op_summary = {}, {}, {}
for path, methods in spec['paths'].items():
    for verb, d in methods.items():
        ok = next((r for s, r in d['responses'].items() if s.startswith('2')), {})
        schema = ok.get('content', {}).get('application/json', {}).get('schema', {})
        data = schema.get('properties', {}).get('data', {})
        ref = data.get('$ref') or data.get('items', {}).get('$ref')
        op_by_id[d['operationId']] = ref.split('/')[-1] if ref else None
        op_is_list[d['operationId']] = schema.get('properties', {}).get('object', {}).get('const') == 'list' or data.get('type') == 'array'
        op_summary[d['operationId']] = d.get('summary', '')

classes = {}
for o in ops:
    classes.setdefault(o['service'], []).append(o)

def plural(service):
    return service if service in ('Account', 'ProviderStatus', 'BillingPortal') else service + 's'

def camel(s):
    return s[0].lower() + s[1:]

used = set()
out = ['// Généré par scripts/generate.py depuis la référence de l\'API. Ne pas modifier à la main.', '',
       "import type { Page } from './page.js';", "import { Resource, type RequestOptions } from './resource.js';", '__TYPES__', '']
for service, items in classes.items():
    out.append(f'export class {plural(service)}Resource extends Resource {{')
    for o in items:
        method = 'list' if o['method'] == 'all' else o['method']
        model = op_by_id.get(o['operationId']) or {'getAccount': 'Account', 'createFeeQuote': 'FeeQuote', 'getProviderStatus': 'ProviderStatus'}.get(o['operationId'])
        returns = model or 'Record<string, unknown>'
        if model: used.add(model)
        args = [f'{camel(i)}: string' for i in o['ids']]
        path = '`' + re.sub(r'\{\}', lambda m, it=iter(o['ids']): '${enc(' + camel(next(it)) + ')}', o['path']) + '`'
        is_list = op_is_list[o['operationId']]
        out.append(f'  /** {op_summary[o["operationId"]]}. {o["http"]} /api/v1/{o["path"].replace("{}", "{id}")} */')
        ptype = pascal(o['operationId']) + 'Params'
        used.add(ptype)
        has_required = any(r for _, _, r, _ in param_fields[o['operationId']])
        param_arg = f'params: {ptype}' + ('' if has_required else ' = {}')
        if is_list:
            args.append(param_arg)
            out.append(f'  {method}({", ".join(args)}): Promise<Page<{returns}>> {{')
            out.append(f'    return this.requestList<{returns}>({path}, params);')
        else:
            args.append(param_arg)
            if o['http'] == 'POST':
                args.append('options: RequestOptions = {}')
            extra = ', options' if o['http'] == 'POST' else ''
            out.append(f'  {method}({", ".join(args)}): Promise<{returns}> {{')
            out.append(f"    return this.requestObject<{returns}>('{o['http']}', {path}, params{extra});")
        out.append('  }')
        out.append('')
    out[-1] = '}'
    out.append('')
extra = {'Account', 'FeeQuote', 'ProviderStatus'}
types_import = "import type { " + ', '.join(sorted(used & extra)) + " } from './extra-types.js';\nimport type { " + ', '.join(sorted(used - extra)) + " } from './types.js';"
text = '\n'.join(out).replace('__TYPES__', types_import).replace('enc(', 'encodeURIComponent(')
open(os.path.join(root, 'src/resources.ts'), 'w').write(text)
print('params:', len(param_fields), 'types:', len(schemas) - 1, 'resources:', len(classes), 'operations:', len(ops))
