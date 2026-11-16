import { describe, expect, it } from 'vitest';
import { ApiServerError, ConnectionError, InvalidRequestError, PaymentError } from '../src/index.js';
import { fakeClient, json } from './helpers.js';

describe('client', () => {
  it('sends the key and unwraps the object', async () => {
    const { client, requests } = fakeClient(json(200, { data: { id: 'pay_1', object: 'payment', status: 'succeeded' } }));

    const payment = await client.payments.retrieve('pay_1', { expand: ['checkout_session'] });

    expect(payment.status).toBe('succeeded');
    expect(requests[0]).toMatchObject({ method: 'GET', url: 'https://api.test/api/v1/payments/pay_1?expand%5B%5D=checkout_session', body: undefined });
    expect(requests[0]!.headers.Authorization).toBe('Bearer mp_sandbox_test');
    expect(requests[0]!.headers['User-Agent']).toMatch(/^mercy-pay-node\//);
  });

  it('sends a POST as JSON with an idempotency key', async () => {
    const { client, requests } = fakeClient();

    await client.checkoutSessions.create({ amount: 15000, currency: 'XAF', metadata: { order: '4821' } }, { idempotencyKey: 'order-4821' });
    await client.refunds.cancel('re_1');

    expect(requests[0]!.body).toBe('{"amount":15000,"currency":"XAF","metadata":{"order":"4821"}}');
    expect(requests[0]!.headers['Idempotency-Key']).toBe('order-4821');
    expect(requests[1]!.body).toBe('{}');
    expect(requests[1]!.headers['Idempotency-Key']).toMatch(/^node_[0-9a-f]{32}$/);
  });

  it('retries with the same idempotency key', async () => {
    const { client, requests } = fakeClient(new TypeError('fetch failed'), json(502, {}), json(201, { data: { id: 'po_1' } }));

    const payout = await client.payouts.create({ amount: 4000 });

    expect(payout.id).toBe('po_1');
    expect(requests).toHaveLength(3);
    expect(new Set(requests.map((request) => request.headers['Idempotency-Key'])).size).toBe(1);
  });

  it('gives up after the retries', async () => {
    const { client, requests } = fakeClient(json(500, {}), json(500, {}), json(500, { error: { type: 'api_error', code: 'server_error' } }));
    await expect(client.account.retrieve()).rejects.toBeInstanceOf(ApiServerError);
    expect(requests).toHaveLength(3);

    const offline = fakeClient(new TypeError('down'), new TypeError('down'), new TypeError('down'));
    await expect(offline.client.account.retrieve()).rejects.toBeInstanceOf(ConnectionError);
  });

  it('throws typed errors with what the API said, without retrying a 4xx', async () => {
    const { client, requests } = fakeClient(
      json(422, { error: { type: 'invalid_request_error', code: 'validation_failed', message: 'Montant invalide.', param: 'amount', request_id: 'req_9', errors: { amount: ['Montant invalide.'] } } }),
      json(402, { error: { type: 'payment_error', code: 'payment_declined', message: 'Refusé.' } }),
    );

    const error = await client.payments.create({ amount: -1 }).catch((caught: unknown) => caught);
    expect(error).toBeInstanceOf(InvalidRequestError);
    expect(error).toMatchObject({ status: 422, code: 'validation_failed', param: 'amount', requestId: 'req_9', errors: { amount: ['Montant invalide.'] } });
    expect(requests).toHaveLength(1);

    await expect(client.payments.create({ amount: 1 })).rejects.toBeInstanceOf(PaymentError);
  });

  it('iterates through every page', async () => {
    const { client, requests } = fakeClient(
      json(200, { object: 'list', has_more: true, next_cursor: 'pay_2', data: [{ id: 'pay_1' }, { id: 'pay_2' }] }),
      json(200, { object: 'list', has_more: false, next_cursor: null, data: [{ id: 'pay_3' }] }),
    );

    const page = await client.payments.list({ limit: 2, created: { gte: '2026-11-01' } });
    const ids: string[] = [];
    for await (const payment of page) ids.push(payment.id);

    expect(page.data).toHaveLength(2);
    expect(ids).toEqual(['pay_1', 'pay_2', 'pay_3']);
    expect(requests[1]!.url).toBe('https://api.test/api/v1/payments?limit=2&created%5Bgte%5D=2026-11-01&starting_after=pay_2');
  });

  it('escapes ids in the path', async () => {
    const { client, requests } = fakeClient();
    await client.customers.retrieve('cus_1/../x');
    expect(requests[0]!.url).toBe('https://api.test/api/v1/customers/cus_1%2F..%2Fx');
  });
});
