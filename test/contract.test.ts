import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { fakeClient } from './helpers.js';

interface Operation { service: string; method: string; http: string; path: string; ids: string[]; operationId: string }

const spec = JSON.parse(readFileSync(new URL('./openapi.json', import.meta.url), 'utf8')) as { paths: Record<string, Record<string, { operationId: string }>> };
const operations = new Map<string, Operation>(
  (JSON.parse(readFileSync(new URL('../scripts/operations.json', import.meta.url), 'utf8')) as Operation[]).map((op) => [op.operationId, op]),
);

const property = (service: string): string => {
  const name = ['Account', 'ProviderStatus', 'BillingPortal'].includes(service) ? service : `${service}s`;
  return name[0]!.toLowerCase() + name.slice(1);
};

describe('contract with the API reference', () => {
  const cases = Object.entries(spec.paths).flatMap(([path, methods]) => Object.entries(methods).map(([verb, definition]) => ({ path, verb, operationId: definition.operationId })));

  it.each(cases)('$operationId calls $verb $path', async ({ path, verb, operationId }) => {
    const operation = operations.get(operationId);
    expect(operation, `aucune méthode pour ${operationId}`).toBeDefined();

    const { client, requests } = fakeClient();
    const ids = operation!.ids.map((name) => `id_${name}`);
    const method = operation!.method === 'all' ? 'list' : operation!.method;
    const resource = (client as unknown as Record<string, Record<string, (...args: unknown[]) => Promise<unknown>>>)[property(operation!.service)]!;
    await resource[method]!(...ids);

    const remaining = [...ids];
    const expected = path.replace(/\{[^}]+\}/g, () => remaining.shift()!);
    expect(requests[0]!.method).toBe(verb.toUpperCase());
    expect(requests[0]!.url.split('?')[0]).toBe(`https://api.test${expected}`);
  });

  it('lists no operation the reference does not have', () => {
    expect(operations.size).toBe(cases.length);
  });
});
