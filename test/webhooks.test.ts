import { createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { MercyPay, SignatureVerificationError, constructEvent } from '../src/index.js';

// The same vector as the Mercy Pay servers and every other official library.
const SECRET = 'whsec_test';
const PAYLOAD = '{"id":"evt_test","object":"event"}';
const TIMESTAMP = 1791022800;
const SIGNATURE = '52dafa4217ab4708f69eaeecb1f77e14f6405da36a477620c75328c30567e13b';

describe('webhooks', () => {
  it('gives the event when the signature is right', async () => {
    const event = await constructEvent(PAYLOAD, `t=${TIMESTAMP},v1=${SIGNATURE}`, SECRET, { now: TIMESTAMP + 60 });
    expect(event.id).toBe('evt_test');

    const fromBytes = await MercyPay.webhooks.constructEvent(new TextEncoder().encode(PAYLOAD), `t=${TIMESTAMP},v1=deadbeef,v1=${SIGNATURE}`, SECRET, { now: TIMESTAMP });
    expect(fromBytes.id).toBe('evt_test');
  });

  it.each([
    ['changed body', PAYLOAD + ' ', `t=${TIMESTAMP},v1=${SIGNATURE}`, TIMESTAMP],
    ['too old', PAYLOAD, `t=${TIMESTAMP},v1=${SIGNATURE}`, TIMESTAMP + 301],
    ['missing header', PAYLOAD, null, TIMESTAMP],
    ['no v1', PAYLOAD, `t=${TIMESTAMP}`, TIMESTAMP],
    ['wrong secret', PAYLOAD, `t=${TIMESTAMP},v1=${createHmac('sha256', 'whsec_other').update(`${TIMESTAMP}.${PAYLOAD}`).digest('hex')}`, TIMESTAMP],
  ])('refuses a webhook with a %s', async (_case, payload, header, now) => {
    await expect(constructEvent(payload, header, SECRET, { now })).rejects.toBeInstanceOf(SignatureVerificationError);
  });
});
