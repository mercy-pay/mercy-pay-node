import { SignatureVerificationError } from './errors.js';
import type { Event } from './types.js';

export const DEFAULT_TOLERANCE_SECONDS = 300;

const encoder = new TextEncoder();

function toText(payload: string | Uint8Array): string {
  return typeof payload === 'string' ? payload : new TextDecoder().decode(payload);
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(message)));
  return Array.from(signature, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let i = 0; i < a.length; i++) difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return difference === 0;
}

export interface VerifyOptions {
  /** Seconds a signature stays valid. 300 by default. */
  tolerance?: number;
  /** Unix seconds, for tests. */
  now?: number;
}

/**
 * Checks the MercyPay-Signature header: an HMAC-SHA256 of "{t}.{raw body}" with the
 * endpoint's secret, and t recent. Works in Node, Bun, Deno and edge runtimes (Web Crypto).
 */
export async function verifySignature(payload: string | Uint8Array, header: string | null | undefined, secret: string, options: VerifyOptions = {}): Promise<void> {
  if (!header) throw new SignatureVerificationError('En-tête MercyPay-Signature absent.');

  let timestamp: number | null = null;
  const signatures: string[] = [];
  for (const part of header.split(',')) {
    const [key, value = ''] = part.trim().split('=', 2) as [string, string?];
    if (key === 't' && /^\d+$/.test(value)) timestamp = Number(value);
    else if (key === 'v1' && value !== '') signatures.push(value);
  }

  if (timestamp === null || signatures.length === 0) throw new SignatureVerificationError('En-tête MercyPay-Signature mal formé.');

  const now = options.now ?? Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > (options.tolerance ?? DEFAULT_TOLERANCE_SECONDS)) {
    throw new SignatureVerificationError('Signature trop ancienne : le webhook a peut-être été rejoué.');
  }

  const expected = await hmacHex(secret, `${timestamp}.${toText(payload)}`);
  if (!signatures.some((signature) => constantTimeEqual(signature, expected))) {
    throw new SignatureVerificationError('Signature invalide : vérifiez le secret de votre endpoint.');
  }
}

/**
 * Verifies the signature, then returns the event. Pass the raw body exactly as received
 * (`await request.text()`), never a re-serialized object.
 */
export async function constructEvent(payload: string | Uint8Array, header: string | null | undefined, secret: string, options: VerifyOptions = {}): Promise<Event> {
  await verifySignature(payload, header, secret, options);
  try {
    return JSON.parse(toText(payload)) as Event;
  } catch {
    throw new SignatureVerificationError("Le corps du webhook n'est pas du JSON valide.");
  }
}

export const webhooks = { constructEvent, verifySignature };
