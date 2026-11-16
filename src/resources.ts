// Généré par scripts/generate.py depuis la référence de l'API. Ne pas modifier à la main.

import type { Page } from './page.js';
import { Resource, type RequestOptions } from './resource.js';
import type { Account, FeeQuote, ProviderStatus } from './extra-types.js';
import type { CheckoutSession, Customer, Event, Invoice, Payment, PaymentLink, PaymentMethod, Payout, Plan, Refund, RequestLog, Subscription, Wallet, WalletTransfer, WebhookDelivery, WebhookEndpoint } from './types.js';

export class AccountResource extends Resource {
  /** Lire le compte. GET /api/v1/account */
  retrieve(params: Record<string, unknown> = {}): Promise<Account> {
    return this.requestObject<Account>('GET', `account`, params);
  }
}

export class FeesResource extends Resource {
  /** Calculer les frais d'un paiement. POST /api/v1/fees/quote */
  quote(params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<FeeQuote> {
    return this.requestObject<FeeQuote>('POST', `fees/quote`, params, options);
  }
}

export class ProviderStatusResource extends Resource {
  /** État des opérateurs. GET /api/v1/provider_status */
  retrieve(params: Record<string, unknown> = {}): Promise<ProviderStatus> {
    return this.requestObject<ProviderStatus>('GET', `provider_status`, params);
  }
}

export class CheckoutSessionsResource extends Resource {
  /** Créer une session. POST /api/v1/checkout_sessions */
  create(params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<CheckoutSession> {
    return this.requestObject<CheckoutSession>('POST', `checkout_sessions`, params, options);
  }

  /** Lister les sessions. GET /api/v1/checkout_sessions */
  list(params: Record<string, unknown> = {}): Promise<Page<CheckoutSession>> {
    return this.requestList<CheckoutSession>(`checkout_sessions`, params);
  }

  /** Lire une session. GET /api/v1/checkout_sessions/{id} */
  retrieve(id: string, params: Record<string, unknown> = {}): Promise<CheckoutSession> {
    return this.requestObject<CheckoutSession>('GET', `checkout_sessions/${encodeURIComponent(id)}`, params);
  }

  /** Expirer une session. POST /api/v1/checkout_sessions/{id}/expire */
  expire(id: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<CheckoutSession> {
    return this.requestObject<CheckoutSession>('POST', `checkout_sessions/${encodeURIComponent(id)}/expire`, params, options);
  }
}

export class PaymentsResource extends Resource {
  /** Encaisser un paiement. POST /api/v1/payments */
  create(params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Payment> {
    return this.requestObject<Payment>('POST', `payments`, params, options);
  }

  /** Lister les paiements. GET /api/v1/payments */
  list(params: Record<string, unknown> = {}): Promise<Page<Payment>> {
    return this.requestList<Payment>(`payments`, params);
  }

  /** Lire un paiement. GET /api/v1/payments/{id} */
  retrieve(id: string, params: Record<string, unknown> = {}): Promise<Payment> {
    return this.requestObject<Payment>('GET', `payments/${encodeURIComponent(id)}`, params);
  }

  /** Rembourser un paiement. POST /api/v1/payments/{id}/refunds */
  refund(id: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Refund> {
    return this.requestObject<Refund>('POST', `payments/${encodeURIComponent(id)}/refunds`, params, options);
  }
}

export class RefundsResource extends Resource {
  /** Lister les remboursements. GET /api/v1/refunds */
  list(params: Record<string, unknown> = {}): Promise<Page<Refund>> {
    return this.requestList<Refund>(`refunds`, params);
  }

  /** Lire un remboursement. GET /api/v1/refunds/{id} */
  retrieve(id: string, params: Record<string, unknown> = {}): Promise<Refund> {
    return this.requestObject<Refund>('GET', `refunds/${encodeURIComponent(id)}`, params);
  }

  /** Annuler un remboursement retardé. POST /api/v1/refunds/{id}/cancel */
  cancel(id: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Refund> {
    return this.requestObject<Refund>('POST', `refunds/${encodeURIComponent(id)}/cancel`, params, options);
  }
}

export class WalletsResource extends Resource {
  /** Lire les soldes. GET /api/v1/wallets */
  list(params: Record<string, unknown> = {}): Promise<Page<Wallet>> {
    return this.requestList<Wallet>(`wallets`, params);
  }
}

export class WalletTransfersResource extends Resource {
  /** Lister les virements entre soldes. GET /api/v1/wallet_transfers */
  list(params: Record<string, unknown> = {}): Promise<Page<WalletTransfer>> {
    return this.requestList<WalletTransfer>(`wallet_transfers`, params);
  }

  /** Virer entre deux soldes. POST /api/v1/wallet_transfers */
  create(params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<WalletTransfer> {
    return this.requestObject<WalletTransfer>('POST', `wallet_transfers`, params, options);
  }
}

export class PayoutsResource extends Resource {
  /** Demander un retrait. POST /api/v1/payouts */
  create(params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Payout> {
    return this.requestObject<Payout>('POST', `payouts`, params, options);
  }

  /** Lister les retraits. GET /api/v1/payouts */
  list(params: Record<string, unknown> = {}): Promise<Page<Payout>> {
    return this.requestList<Payout>(`payouts`, params);
  }

  /** Lire un retrait. GET /api/v1/payouts/{id} */
  retrieve(id: string, params: Record<string, unknown> = {}): Promise<Payout> {
    return this.requestObject<Payout>('GET', `payouts/${encodeURIComponent(id)}`, params);
  }
}

export class PaymentLinksResource extends Resource {
  /** Créer un lien. POST /api/v1/payment_links */
  create(params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<PaymentLink> {
    return this.requestObject<PaymentLink>('POST', `payment_links`, params, options);
  }

  /** Lister les liens. GET /api/v1/payment_links */
  list(params: Record<string, unknown> = {}): Promise<Page<PaymentLink>> {
    return this.requestList<PaymentLink>(`payment_links`, params);
  }

  /** Lire un lien. GET /api/v1/payment_links/{id} */
  retrieve(id: string, params: Record<string, unknown> = {}): Promise<PaymentLink> {
    return this.requestObject<PaymentLink>('GET', `payment_links/${encodeURIComponent(id)}`, params);
  }

  /** Modifier un lien. PATCH /api/v1/payment_links/{id} */
  update(id: string, params: Record<string, unknown> = {}): Promise<PaymentLink> {
    return this.requestObject<PaymentLink>('PATCH', `payment_links/${encodeURIComponent(id)}`, params);
  }

  /** Supprimer un lien. DELETE /api/v1/payment_links/{id} */
  delete(id: string, params: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
    return this.requestObject<Record<string, unknown>>('DELETE', `payment_links/${encodeURIComponent(id)}`, params);
  }

  /** Archiver un lien. POST /api/v1/payment_links/{id}/archive */
  archive(id: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<PaymentLink> {
    return this.requestObject<PaymentLink>('POST', `payment_links/${encodeURIComponent(id)}/archive`, params, options);
  }

  /** Paiements d'un lien. GET /api/v1/payment_links/{id}/payments */
  payments(id: string, params: Record<string, unknown> = {}): Promise<Page<Payment>> {
    return this.requestList<Payment>(`payment_links/${encodeURIComponent(id)}/payments`, params);
  }
}

export class PlansResource extends Resource {
  /** Créer un plan. POST /api/v1/plans */
  create(params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Plan> {
    return this.requestObject<Plan>('POST', `plans`, params, options);
  }

  /** Lister les plans. GET /api/v1/plans */
  list(params: Record<string, unknown> = {}): Promise<Page<Plan>> {
    return this.requestList<Plan>(`plans`, params);
  }

  /** Lire un plan. GET /api/v1/plans/{id} */
  retrieve(id: string, params: Record<string, unknown> = {}): Promise<Plan> {
    return this.requestObject<Plan>('GET', `plans/${encodeURIComponent(id)}`, params);
  }

  /** Modifier un plan. PATCH /api/v1/plans/{id} */
  update(id: string, params: Record<string, unknown> = {}): Promise<Plan> {
    return this.requestObject<Plan>('PATCH', `plans/${encodeURIComponent(id)}`, params);
  }

  /** Supprimer un plan. DELETE /api/v1/plans/{id} */
  delete(id: string, params: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
    return this.requestObject<Record<string, unknown>>('DELETE', `plans/${encodeURIComponent(id)}`, params);
  }

  /** Archiver un plan. POST /api/v1/plans/{id}/archive */
  archive(id: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Plan> {
    return this.requestObject<Plan>('POST', `plans/${encodeURIComponent(id)}/archive`, params, options);
  }

  /** Réactiver un plan. POST /api/v1/plans/{id}/restore */
  restore(id: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Plan> {
    return this.requestObject<Plan>('POST', `plans/${encodeURIComponent(id)}/restore`, params, options);
  }
}

export class CustomersResource extends Resource {
  /** Créer un client. POST /api/v1/customers */
  create(params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Customer> {
    return this.requestObject<Customer>('POST', `customers`, params, options);
  }

  /** Lister les clients. GET /api/v1/customers */
  list(params: Record<string, unknown> = {}): Promise<Page<Customer>> {
    return this.requestList<Customer>(`customers`, params);
  }

  /** Lire un client. GET /api/v1/customers/{id} */
  retrieve(id: string, params: Record<string, unknown> = {}): Promise<Customer> {
    return this.requestObject<Customer>('GET', `customers/${encodeURIComponent(id)}`, params);
  }

  /** Modifier un client. PATCH /api/v1/customers/{id} */
  update(id: string, params: Record<string, unknown> = {}): Promise<Customer> {
    return this.requestObject<Customer>('PATCH', `customers/${encodeURIComponent(id)}`, params);
  }

  /** Supprimer un client. DELETE /api/v1/customers/{id} */
  delete(id: string, params: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
    return this.requestObject<Record<string, unknown>>('DELETE', `customers/${encodeURIComponent(id)}`, params);
  }

  /** Moyens de paiement d'un client. GET /api/v1/customers/{id}/payment_methods */
  paymentMethods(customerId: string, params: Record<string, unknown> = {}): Promise<Page<PaymentMethod>> {
    return this.requestList<PaymentMethod>(`customers/${encodeURIComponent(customerId)}/payment_methods`, params);
  }

  /** Choisir le moyen par défaut. POST /api/v1/customers/{id}/payment_methods/{id}/default */
  setDefaultPaymentMethod(customerId: string, paymentMethodId: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Customer> {
    return this.requestObject<Customer>('POST', `customers/${encodeURIComponent(customerId)}/payment_methods/${encodeURIComponent(paymentMethodId)}/default`, params, options);
  }

  /** Retirer un moyen de paiement. DELETE /api/v1/customers/{id}/payment_methods/{id} */
  removePaymentMethod(customerId: string, paymentMethodId: string, params: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
    return this.requestObject<Record<string, unknown>>('DELETE', `customers/${encodeURIComponent(customerId)}/payment_methods/${encodeURIComponent(paymentMethodId)}`, params);
  }
}

export class SubscriptionsResource extends Resource {
  /** Créer un abonnement. POST /api/v1/subscriptions */
  create(params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Subscription> {
    return this.requestObject<Subscription>('POST', `subscriptions`, params, options);
  }

  /** Lister les abonnements. GET /api/v1/subscriptions */
  list(params: Record<string, unknown> = {}): Promise<Page<Subscription>> {
    return this.requestList<Subscription>(`subscriptions`, params);
  }

  /** Lire un abonnement. GET /api/v1/subscriptions/{id} */
  retrieve(id: string, params: Record<string, unknown> = {}): Promise<Subscription> {
    return this.requestObject<Subscription>('GET', `subscriptions/${encodeURIComponent(id)}`, params);
  }

  /** Modifier un abonnement. PATCH /api/v1/subscriptions/{id} */
  update(id: string, params: Record<string, unknown> = {}): Promise<Subscription> {
    return this.requestObject<Subscription>('PATCH', `subscriptions/${encodeURIComponent(id)}`, params);
  }

  /** Annuler un abonnement. POST /api/v1/subscriptions/{id}/cancel */
  cancel(id: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Subscription> {
    return this.requestObject<Subscription>('POST', `subscriptions/${encodeURIComponent(id)}/cancel`, params, options);
  }

  /** Retirer une annulation prévue. POST /api/v1/subscriptions/{id}/reactivate */
  reactivate(id: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Subscription> {
    return this.requestObject<Subscription>('POST', `subscriptions/${encodeURIComponent(id)}/reactivate`, params, options);
  }

  /** Passer à l'échéance (sandbox). POST /api/v1/subscriptions/{id}/advance */
  advance(id: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Subscription> {
    return this.requestObject<Subscription>('POST', `subscriptions/${encodeURIComponent(id)}/advance`, params, options);
  }

  /** Mettre en pause. POST /api/v1/subscriptions/{id}/pause */
  pause(id: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Subscription> {
    return this.requestObject<Subscription>('POST', `subscriptions/${encodeURIComponent(id)}/pause`, params, options);
  }

  /** Reprendre. POST /api/v1/subscriptions/{id}/resume */
  resume(id: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Subscription> {
    return this.requestObject<Subscription>('POST', `subscriptions/${encodeURIComponent(id)}/resume`, params, options);
  }

  /** Factures d'un abonnement. GET /api/v1/subscriptions/{id}/invoices */
  invoices(id: string, params: Record<string, unknown> = {}): Promise<Page<Invoice>> {
    return this.requestList<Invoice>(`subscriptions/${encodeURIComponent(id)}/invoices`, params);
  }
}

export class InvoicesResource extends Resource {
  /** Lister les factures. GET /api/v1/invoices */
  list(params: Record<string, unknown> = {}): Promise<Page<Invoice>> {
    return this.requestList<Invoice>(`invoices`, params);
  }

  /** Lire une facture. GET /api/v1/invoices/{id} */
  retrieve(id: string, params: Record<string, unknown> = {}): Promise<Invoice> {
    return this.requestObject<Invoice>('GET', `invoices/${encodeURIComponent(id)}`, params);
  }

  /** Encaisser une facture. POST /api/v1/invoices/{id}/pay */
  pay(id: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Invoice> {
    return this.requestObject<Invoice>('POST', `invoices/${encodeURIComponent(id)}/pay`, params, options);
  }

  /** Envoyer la facture au client. POST /api/v1/invoices/{id}/send */
  send(id: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Invoice> {
    return this.requestObject<Invoice>('POST', `invoices/${encodeURIComponent(id)}/send`, params, options);
  }
}

export class BillingPortalResource extends Resource {
  /** Ouvrir l'espace client. POST /api/v1/billing_portal/sessions */
  createSession(params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Record<string, unknown>> {
    return this.requestObject<Record<string, unknown>>('POST', `billing_portal/sessions`, params, options);
  }
}

export class EventsResource extends Resource {
  /** Lister les événements. GET /api/v1/events */
  list(params: Record<string, unknown> = {}): Promise<Page<Event>> {
    return this.requestList<Event>(`events`, params);
  }

  /** Lire un événement. GET /api/v1/events/{id} */
  retrieve(id: string, params: Record<string, unknown> = {}): Promise<Event> {
    return this.requestObject<Event>('GET', `events/${encodeURIComponent(id)}`, params);
  }

  /** Lister les envois d'un événement. GET /api/v1/events/{id}/deliveries */
  deliveries(id: string, params: Record<string, unknown> = {}): Promise<Page<WebhookDelivery>> {
    return this.requestList<WebhookDelivery>(`events/${encodeURIComponent(id)}/deliveries`, params);
  }

  /** Renvoyer un événement. POST /api/v1/events/{id}/resend */
  resend(id: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Event> {
    return this.requestObject<Event>('POST', `events/${encodeURIComponent(id)}/resend`, params, options);
  }
}

export class WebhookEndpointsResource extends Resource {
  /** Créer un endpoint. POST /api/v1/webhook_endpoints */
  create(params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<WebhookEndpoint> {
    return this.requestObject<WebhookEndpoint>('POST', `webhook_endpoints`, params, options);
  }

  /** Lister les endpoints. GET /api/v1/webhook_endpoints */
  list(params: Record<string, unknown> = {}): Promise<Page<WebhookEndpoint>> {
    return this.requestList<WebhookEndpoint>(`webhook_endpoints`, params);
  }

  /** Lire un endpoint. GET /api/v1/webhook_endpoints/{id} */
  retrieve(id: string, params: Record<string, unknown> = {}): Promise<WebhookEndpoint> {
    return this.requestObject<WebhookEndpoint>('GET', `webhook_endpoints/${encodeURIComponent(id)}`, params);
  }

  /** Modifier un endpoint. PATCH /api/v1/webhook_endpoints/{id} */
  update(id: string, params: Record<string, unknown> = {}): Promise<WebhookEndpoint> {
    return this.requestObject<WebhookEndpoint>('PATCH', `webhook_endpoints/${encodeURIComponent(id)}`, params);
  }

  /** Supprimer un endpoint. DELETE /api/v1/webhook_endpoints/{id} */
  delete(id: string, params: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
    return this.requestObject<Record<string, unknown>>('DELETE', `webhook_endpoints/${encodeURIComponent(id)}`, params);
  }

  /** Changer le secret. POST /api/v1/webhook_endpoints/{id}/rotate_secret */
  rotateSecret(id: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<WebhookEndpoint> {
    return this.requestObject<WebhookEndpoint>('POST', `webhook_endpoints/${encodeURIComponent(id)}/rotate_secret`, params, options);
  }

  /** Envoyer un test. POST /api/v1/webhook_endpoints/{id}/test */
  test(id: string, params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Event> {
    return this.requestObject<Event>('POST', `webhook_endpoints/${encodeURIComponent(id)}/test`, params, options);
  }
}

export class RequestLogsResource extends Resource {
  /** Lister les requêtes. GET /api/v1/request_logs */
  list(params: Record<string, unknown> = {}): Promise<Page<RequestLog>> {
    return this.requestList<RequestLog>(`request_logs`, params);
  }
}

export class TestHelpersResource extends Resource {
  /** Déclencher un événement de test. POST /api/v1/test_helpers/events */
  triggerEvent(params: Record<string, unknown> = {}, options: RequestOptions = {}): Promise<Event> {
    return this.requestObject<Event>('POST', `test_helpers/events`, params, options);
  }
}
