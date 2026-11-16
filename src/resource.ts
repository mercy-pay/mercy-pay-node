import type { MercyPay } from './client.js';
import { Page } from './page.js';

export interface RequestOptions {
  /** The same key for the same operation, so a retry never creates twice. Generated if absent. */
  idempotencyKey?: string;
}

export abstract class Resource {
  constructor(protected readonly client: MercyPay) {}

  protected async requestObject<T>(method: string, path: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<T> {
    const body = (await this.client.request(method, path, params, options)) as { data?: T } & T;
    return (body && typeof body === 'object' && 'data' in body ? body.data : body) as T;
  }

  protected async requestList<T>(path: string, params: Record<string, unknown> = {}): Promise<Page<T>> {
    const body = (await this.client.request('GET', path, params)) as { data?: T[]; has_more?: boolean; next_cursor?: string | null };
    return new Page<T>(body.data ?? [], body.has_more ?? false, body.next_cursor ?? null, (next) => this.requestList<T>(path, next), params);
  }
}
