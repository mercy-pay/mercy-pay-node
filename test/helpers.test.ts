import { describe, expect, it } from 'vitest';
import { COUNTRIES, EVENT_TYPES, WaitTimeoutError } from '../src/index.js';
import { fakeClient, json } from './helpers.js';

const payment = (status: string) => json(200, { data: { id: 'pay_1', object: 'payment', status } });

describe('waitForFinalStatus', () => {
  it('reads the payment again until its status is final', async () => {
    const { client, requests } = fakeClient(payment('pending'), payment('processing'), payment('succeeded'));

    const final = await client.payments.waitForFinalStatus('pay_1');

    expect(final.status).toBe('succeeded');
    expect(requests).toHaveLength(3);
  });

  it('gives up after the timeout and hands back the last state', async () => {
    const { client } = fakeClient(payment('pending'), payment('pending'), payment('pending'));

    const error = await client.payments.waitForFinalStatus('pay_1', { timeout: 1_000, interval: 600 }).catch((caught: unknown) => caught);

    expect(error).toBeInstanceOf(WaitTimeoutError);
    expect((error as WaitTimeoutError<{ status: string }>).last.status).toBe('pending');
  });

  it('waits for a session to complete', async () => {
    const session = (status: string) => json(200, { data: { id: 'cs_1', object: 'checkout_session', status } });
    const { client } = fakeClient(session('pending_payment'), session('completed'));

    expect((await client.checkoutSessions.waitForCompletion('cs_1')).status).toBe('completed');
  });
});

describe('testHelpers.mobileMoneyNumber', () => {
  it('picks the sandbox number for an outcome or a failure code', async () => {
    const numbers = json(200, {
      object: 'list',
      has_more: false,
      data: [
        { country: 'CMR', provider: 'ORANGE_CMR', phone: '237693456789', applies_to: 'payment', outcome: 'succeeded', failure_code: null },
        { country: 'CMR', provider: 'ORANGE_CMR', phone: '237693456049', applies_to: 'payment', outcome: 'failed', failure_code: 'insufficient_balance' },
        { country: 'CMR', provider: 'ORANGE_CMR', phone: '237693456119', applies_to: 'payout', outcome: 'failed', failure_code: null },
      ],
    });
    const { client, requests } = fakeClient(numbers, numbers.clone(), numbers.clone(), numbers.clone());

    expect(await client.testHelpers.mobileMoneyNumber('ORANGE_CMR')).toBe('237693456789');
    expect(await client.testHelpers.mobileMoneyNumber('ORANGE_CMR', 'insufficient_balance')).toBe('237693456049');
    expect(await client.testHelpers.mobileMoneyNumber('ORANGE_CMR', 'payout_failed')).toBe('237693456119');
    expect(await client.testHelpers.mobileMoneyNumber('ORANGE_CMR', 'payer_not_found')).toBeNull();
    expect(requests[0]!.url).toBe('https://api.test/api/v1/test_helpers/mobile_money_numbers?provider=ORANGE_CMR');
  });
});

describe('catalog', () => {
  it('lists the open countries with their operators, and every event type', () => {
    expect(COUNTRIES.find((country) => country.code === 'CMR')?.providers.map((provider) => provider.code)).toContain('MTN_MOMO_CMR');
    expect(EVENT_TYPES).toContain('payment.succeeded');
  });
});
