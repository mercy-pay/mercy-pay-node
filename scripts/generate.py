"""Generates src/types.ts (the API objects) and src/resources.ts (one class per resource)
from the API reference copy (test/openapi.json) and scripts/operations.json.
Run: python3 scripts/generate.py"""
import json, os, re

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec = json.load(open(os.path.join(root, 'test/openapi.json')))
ops = json.load(open(os.path.join(root, 'scripts/operations.json')))
schemas = spec['components']['schemas']

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
open(os.path.join(root, 'src/types.ts'), 'w').write('\n'.join(lines))

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
        if is_list:
            args.append('params: Record<string, unknown> = {}')
            out.append(f'  {method}({", ".join(args)}): Promise<Page<{returns}>> {{')
            out.append(f'    return this.requestList<{returns}>({path}, params);')
        else:
            if o['http'] != 'DELETE' or True:
                args.append('params: Record<string, unknown> = {}')
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
print('types:', len(schemas) - 1, 'resources:', len(classes), 'operations:', len(ops))
