# Mercy Pay pour Node.js

La bibliothèque officielle de l'API [Mercy Pay](https://mercy-pay.com) pour Node.js 20 ou plus, en TypeScript, sans dépendance. Elle marche aussi avec Bun, Deno et les runtimes edge.

```sh
npm install @mercy-pay/node
```

Gardez votre clé API sur votre serveur, jamais dans un navigateur ou une app mobile.

## Encaisser un paiement

```ts
import { MercyPay } from '@mercy-pay/node';

const mercyPay = new MercyPay(process.env.MERCY_PAY_API_KEY!);

const session = await mercyPay.checkoutSessions.create(
  {
    amount: 15000,
    currency: 'XAF',
    description: 'Commande 4821',
    success_url: 'https://boutique.example/merci',
    metadata: { order_id: '4821' },
  },
  { idempotencyKey: 'order-4821' },
);

// Redirigez le client vers session.checkout_url
```

Les montants sont en unités mineures. Chaque objet est typé : `session.status`, `payment.payer.phone`…

Avec Next.js, voyez [`@mercy-pay/next`](https://github.com/mercy-pay/next).

## Recevoir les webhooks

```ts
import { MercyPay, SignatureVerificationError } from '@mercy-pay/node';

// Express : app.post('/webhooks/mercy-pay', express.raw({ type: 'application/json' }), handler)
async function handler(req, res) {
  let event;
  try {
    event = await MercyPay.webhooks.constructEvent(req.body, req.get('MercyPay-Signature'), process.env.MERCY_PAY_WEBHOOK_SECRET!);
  } catch (error) {
    if (error instanceof SignatureVerificationError) return res.sendStatus(400);
    throw error;
  }

  if (event.type === 'payment.succeeded') {
    // Marquez la commande comme payée.
  }

  res.sendStatus(200);
}
```

Passez le corps brut (`Buffer`, `Uint8Array` ou texte), jamais un objet déjà parsé puis resérialisé. Un même événement peut arriver deux fois : servez-vous de `event.id`.

## Listes

```ts
for await (const payment of await mercyPay.payments.list({ limit: 100, status: 'succeeded' })) {
  // Toutes les pages, chargées au fur et à mesure.
}

const page = await mercyPay.payouts.list({ limit: 20 });
page.data;     // cette page
page.hasMore;  // s'il y en a d'autres
```

## Erreurs

```ts
import { ConnectionError, InvalidRequestError, PaymentError } from '@mercy-pay/node';

try {
  await mercyPay.payouts.create(params, { idempotencyKey: `payout-${id}` });
} catch (error) {
  if (error instanceof InvalidRequestError) {
    error.code;  // validation_failed, insufficient_balance…
    error.param; // le champ en cause
  } else if (error instanceof PaymentError) {
    // Refusé par l'opérateur ou la banque.
  } else if (error instanceof ConnectionError) {
    // Pas de réponse : relancez avec la même idempotencyKey.
  }
}
```

Toutes les erreurs de l'API héritent de `ApiError` (`status`, `type`, `code`, `param`, `requestId`, `errors`). Fiez-vous à `code`, pas à `message`.

## Nouvelles tentatives et idempotence

Une coupure réseau, un `429` ou une erreur `5xx` sont retentés deux fois. Chaque `POST` porte une `Idempotency-Key`, la même à chaque tentative : un paiement ou un retrait n'est jamais créé en double. Passez la vôtre pour couvrir aussi vos propres relances.

## Options

```ts
new MercyPay(apiKey, {
  timeout: 30_000, // millisecondes
  maxRetries: 2,
  fetch: myFetch,  // votre fetch, pour un proxy
});
```

## Sandbox

Une clé `mp_sandbox_…` ne touche pas à l'argent réel. `await mercyPay.testHelpers.triggerEvent({ type: 'payment.succeeded' })` envoie un événement de test à vos endpoints, et la [CLI](https://docs.mercy-pay.com/developers/cli) relaie les webhooks vers votre ordinateur.

## Développement

`npm test` lance les tests, sans réseau. `test/openapi.json` est une copie de la référence de l'API : `npm run generate` régénère les types et les ressources, et un test vérifie que chaque endpoint a sa méthode.
