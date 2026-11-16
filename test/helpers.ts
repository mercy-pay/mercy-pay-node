import { MercyPay } from '../src/index.js';

export interface Recorded {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string | undefined;
}

type Answer = Response | Error;

/** A fetch that answers from a queue and remembers every request: no network in the tests. */
export function fakeClient(...answers: Answer[]): { client: MercyPay; requests: Recorded[] } {
  const requests: Recorded[] = [];
  const fakeFetch = (async (url: string, init: RequestInit) => {
    requests.push({ method: String(init.method), url, headers: init.headers as Record<string, string>, body: init.body as string | undefined });
    const answer = answers.shift() ?? json(200, { data: {} });
    if (answer instanceof Error) throw answer;
    return answer;
  }) as unknown as typeof fetch;

  return {
    client: new MercyPay('mp_sandbox_test', { baseUrl: 'https://api.test', fetch: fakeFetch, sleep: async () => {} }),
    requests,
  };
}

export function json(status: number, body: unknown, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...headers } });
}
