// Written by hand: the helpers on top of the generated resources.

import { MercyPayError } from './errors.js';
import { CheckoutSessionsResource, PaymentsResource, TestHelpersResource } from './resources.js';
import type { CheckoutSession, Payment, TestMobileMoneyNumber } from './types.js';
import type { MobileMoneyProvider } from './catalog.js';

export interface WaitOptions {
  /** Milliseconds before giving up. 120 000 (2 minutes) by default. */
  timeout?: number;
  /** Milliseconds before the first new read. 2 000 by default, then a little longer each time, up to 10 000. */
  interval?: number;
}

/** The wait ended before the object reached a final status. Its last state is in `last`. */
export class WaitTimeoutError<T> extends MercyPayError {
  constructor(message: string, readonly last: T) {
    super(message);
    this.name = 'WaitTimeoutError';
  }
}

const FINAL_PAYMENT_STATUSES = ['succeeded', 'failed', 'canceled', 'expired', 'refunded', 'disputed'];
const FINAL_SESSION_STATUSES = ['completed', 'expired', 'cancelled'];

async function poll<T extends { status: string }>(
  read: () => Promise<T>,
  final: string[],
  sleep: (milliseconds: number) => Promise<void>,
  options: WaitOptions,
  what: string,
): Promise<T> {
  const deadline = Date.now() + (options.timeout ?? 120_000);
  let delay = options.interval ?? 2_000;
  let current = await read();

  while (!final.includes(current.status)) {
    if (Date.now() + delay > deadline) {
      throw new WaitTimeoutError(`${what} n'a pas atteint de statut final à temps (statut : ${current.status}).`, current);
    }
    await sleep(delay);
    delay = Math.min(Math.round(delay * 1.5), 10_000);
    current = await read();
  }

  return current;
}

export class Payments extends PaymentsResource {
  /**
   * Reads the payment until it is final (succeeded, failed, canceled, expired…), for a
   * script or a test. On a server, prefer the payment.succeeded webhook.
   */
  waitForFinalStatus(id: string, options: WaitOptions = {}): Promise<Payment> {
    return poll(() => this.retrieve(id), FINAL_PAYMENT_STATUSES, this.client.sleep, options, `Le paiement ${id}`);
  }
}

export class CheckoutSessions extends CheckoutSessionsResource {
  /** Reads the session until it is completed, expired or cancelled. */
  waitForCompletion(id: string, options: WaitOptions = {}): Promise<CheckoutSession> {
    return poll(() => this.retrieve(id), FINAL_SESSION_STATUSES, this.client.sleep, options, `La session ${id}`);
  }
}

/** What a sandbox number does: a payment outcome or failure_code, or a refused payout. */
export type TestOutcome = 'succeeded' | 'pending' | 'payout_failed' | 'insufficient_balance' | 'payer_not_found' | 'payer_limit_reached' | 'payment_not_approved' | (string & {});

export class TestHelpers extends TestHelpersResource {
  /**
   * The sandbox number giving this outcome for this operator, or null when the operator
   * has none.
   *
   * ```ts
   * const phone = await mercyPay.testHelpers.mobileMoneyNumber('MTN_MOMO_CMR', 'insufficient_balance');
   * ```
   */
  async mobileMoneyNumber(provider: MobileMoneyProvider, outcome: TestOutcome = 'succeeded'): Promise<string | null> {
    const page = await this.mobileMoneyNumbers({ provider });
    const match = (number: TestMobileMoneyNumber): boolean =>
      outcome === 'payout_failed'
        ? number.applies_to === 'payout'
        : number.applies_to === 'payment' && (number.outcome === outcome || number.failure_code === outcome);

    return page.data.find(match)?.phone ?? null;
  }
}
