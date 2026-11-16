/** Everything this library throws. */
export class MercyPayError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

export interface ApiErrorBody {
  type?: string;
  code?: string;
  message?: string;
  param?: string | null;
  request_id?: string;
  doc_url?: string;
  errors?: Record<string, string[]>;
  [field: string]: unknown;
}

/**
 * An error answered by the API. Branch on `code` (stable), never on `message` (French, may
 * change). Quote `requestId` to the Mercy Pay support.
 */
export class ApiError extends MercyPayError {
  readonly status: number;
  readonly type: string | null;
  readonly code: string | null;
  readonly param: string | null;
  readonly requestId: string | null;
  readonly errors: Record<string, string[]>;
  readonly raw: ApiErrorBody;

  constructor(status: number, body: ApiErrorBody, requestId: string | null) {
    super(body.message ?? `Mercy Pay a répondu ${status}.`);
    this.status = status;
    this.type = body.type ?? null;
    this.code = body.code ?? null;
    this.param = body.param ?? null;
    this.requestId = body.request_id ?? requestId;
    this.errors = body.errors ?? {};
    this.raw = body;
  }

  static from(status: number, body: unknown, requestId: string | null): ApiError {
    const error = (typeof body === 'object' && body !== null && 'error' in body ? (body as { error: ApiErrorBody }).error : {}) ?? {};
    const type = error.type;

    if (type === 'authentication_error' || status === 401) return new AuthenticationError(status, error, requestId);
    if (type === 'rate_limit_error' || status === 429) return new RateLimitError(status, error, requestId);
    if (type === 'idempotency_error') return new IdempotencyError(status, error, requestId);
    if (type === 'payment_error') return new PaymentError(status, error, requestId);
    if (status >= 500 || type === 'api_error') return new ApiServerError(status, error, requestId);
    return new InvalidRequestError(status, error, requestId);
  }
}

/** A missing, wrong or revoked key, or live mode before the account is verified. */
export class AuthenticationError extends ApiError {}
/** A refused parameter, an object not found, an action not allowed. */
export class InvalidRequestError extends ApiError {}
/** Refused by the operator or the bank, or a balance too low. */
export class PaymentError extends ApiError {}
/** The idempotency key is missing, reused with other content, or still in use. */
export class IdempotencyError extends ApiError {}
/** Too many requests: slow down. */
export class RateLimitError extends ApiError {}
/** A problem on Mercy Pay's side. Retry later with the same idempotency key. */
export class ApiServerError extends ApiError {}

/**
 * No answer from Mercy Pay (network, timeout). The request may or may not have been taken
 * into account: send it again with the same idempotency key, never a new one.
 */
export class ConnectionError extends MercyPayError {}

/** A webhook whose signature is missing, wrong or too old: answer 400 and ignore it. */
export class SignatureVerificationError extends MercyPayError {}
