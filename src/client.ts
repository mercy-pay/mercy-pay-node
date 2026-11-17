import { ApiError, ConnectionError } from './errors.js';
import { toQuery } from './query.js';
import type { RequestOptions } from './resource.js';
import {
  AccountResource,
  BillingPortalResource,
  CheckoutSessionsResource,
  CustomersResource,
  EventsResource,
  FeesResource,
  InvoicesResource,
  PaymentLinksResource,
  PaymentsResource,
  PayoutsResource,
  PlansResource,
  ProviderStatusResource,
  RefundsResource,
  RequestLogsResource,
  SubscriptionsResource,
  TestHelpersResource,
  WalletTransfersResource,
  WalletsResource,
  WebhookEndpointsResource,
  EmbedDomainsResource,
} from './resources.js';
import { webhooks } from './webhooks.js';

export const VERSION = '0.2.0';

export interface MercyPayOptions {
  /** https://mercy-pay.com by default. */
  baseUrl?: string;
  /** Milliseconds before giving up on one attempt. 30 000 by default. */
  timeout?: number;
  /** Retries after a network error, a 429 or a 5xx. 2 by default. */
  maxRetries?: number;
  /** Your own fetch, for a proxy or tests. */
  fetch?: typeof fetch;
  /** @internal */
  sleep?: (milliseconds: number) => Promise<void>;
}

/**
 * The entry point: one client per API key. Keep the key on your server, never in a browser
 * or an app.
 *
 * ```ts
 * const mercyPay = new MercyPay(process.env.MERCY_PAY_API_KEY!);
 * const session = await mercyPay.checkoutSessions.create({ amount: 15000, currency: 'XAF' });
 * ```
 */
export class MercyPay {
  static readonly webhooks = webhooks;
  readonly webhooks = webhooks;

  readonly account = new AccountResource(this);
  readonly billingPortal = new BillingPortalResource(this);
  readonly checkoutSessions = new CheckoutSessionsResource(this);
  readonly customers = new CustomersResource(this);
  readonly events = new EventsResource(this);
  readonly fees = new FeesResource(this);
  readonly invoices = new InvoicesResource(this);
  readonly paymentLinks = new PaymentLinksResource(this);
  readonly payments = new PaymentsResource(this);
  readonly payouts = new PayoutsResource(this);
  readonly plans = new PlansResource(this);
  readonly providerStatus = new ProviderStatusResource(this);
  readonly refunds = new RefundsResource(this);
  readonly requestLogs = new RequestLogsResource(this);
  readonly subscriptions = new SubscriptionsResource(this);
  readonly testHelpers = new TestHelpersResource(this);
  readonly wallets = new WalletsResource(this);
  readonly walletTransfers = new WalletTransfersResource(this);
  readonly webhookEndpoints = new WebhookEndpointsResource(this);
  readonly embedDomains = new EmbedDomainsResource(this);

  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly maxRetries: number;
  private readonly fetchImplementation: typeof fetch;
  private readonly sleep: (milliseconds: number) => Promise<void>;

  constructor(
    private readonly apiKey: string,
    options: MercyPayOptions = {},
  ) {
    if (!apiKey) throw new Error('Clé API manquante : passez votre clé mp_sandbox_… ou mp_live_….');
    this.baseUrl = (options.baseUrl ?? 'https://mercy-pay.com').replace(/\/+$/, '');
    this.timeout = options.timeout ?? 30_000;
    this.maxRetries = Math.max(0, options.maxRetries ?? 2);
    this.fetchImplementation = options.fetch ?? globalThis.fetch.bind(globalThis);
    this.sleep = options.sleep ?? ((milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)));
  }

  /**
   * Sends one call and returns the decoded body. Used by the resources; call it yourself for
   * an endpoint this version does not know yet: `mercyPay.request('GET', 'account')`.
   * GET and DELETE send `params` in the query string, the others as JSON. A POST always
   * carries an Idempotency-Key, the same on every attempt.
   */
  async request(method: string, path: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<unknown> {
    const verb = method.toUpperCase();
    let url = `${this.baseUrl}/api/v1/${path.replace(/^\/+/, '').replace(/^(api\/)?v1\//, '')}`;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiKey}`,
      Accept: 'application/json',
      'User-Agent': `mercy-pay-node/${VERSION}`,
    };
    let body: string | undefined;

    if (verb === 'GET' || verb === 'DELETE') {
      const query = toQuery(params);
      if (query) url += `?${query}`;
    } else {
      body = JSON.stringify(params);
      headers['Content-Type'] = 'application/json';
    }
    if (verb === 'POST') headers['Idempotency-Key'] = options.idempotencyKey ?? `node_${crypto.randomUUID().replace(/-/g, '')}`;

    for (let attempt = 0; ; attempt++) {
      let response: Response;
      try {
        response = await this.fetchImplementation(url, { method: verb, headers, body, signal: AbortSignal.timeout(this.timeout) });
      } catch (error) {
        if (attempt >= this.maxRetries) {
          throw new ConnectionError(`Mercy Pay n'a pas pu être joint : ${error instanceof Error ? error.message : String(error)}`);
        }
        await this.sleep(this.backoff(attempt + 1, null));
        continue;
      }

      if ((response.status === 429 || response.status >= 500) && attempt < this.maxRetries) {
        await response.body?.cancel();
        await this.sleep(this.backoff(attempt + 1, response.headers.get('Retry-After')));
        continue;
      }

      const text = await response.text();
      let decoded: unknown = {};
      if (text !== '') {
        try {
          decoded = JSON.parse(text);
        } catch {
          decoded = {};
        }
      }

      if (response.status >= 400) throw ApiError.from(response.status, decoded, response.headers.get('Request-Id'));
      return decoded;
    }
  }

  /** Milliseconds before the next attempt: what Retry-After says, otherwise 0.5 s, 1 s, 2 s… */
  private backoff(attempt: number, retryAfter: string | null): number {
    if (retryAfter !== null && /^\d+$/.test(retryAfter)) return Math.min(Number(retryAfter), 60) * 1000;
    return 500 * 2 ** (attempt - 1);
  }
}
