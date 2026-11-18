// Généré par scripts/generate.py depuis la référence de l'API. Ne pas modifier à la main.

import type { Page } from './page.js';
import { Resource, type RequestOptions } from './resource.js';
import type { Account, FeeQuote, ProviderStatus } from './extra-types.js';
import type { AdvanceSubscriptionParams, ArchivePaymentLinkParams, ArchivePlanParams, CancelRefundParams, CancelSubscriptionParams, CheckoutSession, CreateBillingPortalSessionParams, CreateCheckoutSessionParams, CreateCustomerParams, CreateEmbedDomainParams, CreateFeeQuoteParams, CreatePaymentLinkParams, CreatePaymentParams, CreatePayoutParams, CreatePlanParams, CreateRefundParams, CreateSubscriptionParams, CreateTestEventParams, CreateWalletTransferParams, CreateWebhookEndpointParams, Customer, DeleteCustomerParams, DeleteEmbedDomainParams, DeletePaymentLinkParams, DeletePlanParams, DeleteWebhookEndpointParams, EmbedDomain, Event, ExpireCheckoutSessionParams, GetAccountParams, GetCheckoutSessionParams, GetCustomerParams, GetEmbedDomainParams, GetEventParams, GetInvoiceParams, GetPaymentLinkParams, GetPaymentParams, GetPayoutParams, GetPlanParams, GetProviderStatusParams, GetRefundParams, GetSubscriptionParams, GetWebhookEndpointParams, Invoice, ListCheckoutSessionsParams, ListCustomerPaymentMethodsParams, ListCustomersParams, ListEmbedDomainsParams, ListEventDeliveriesParams, ListEventsParams, ListInvoicesParams, ListPaymentLinkPaymentsParams, ListPaymentLinksParams, ListPaymentsParams, ListPayoutsParams, ListPlansParams, ListRefundsParams, ListRequestLogsParams, ListSubscriptionInvoicesParams, ListSubscriptionsParams, ListTestMobileMoneyNumbersParams, ListWalletTransfersParams, ListWalletsParams, ListWebhookEndpointsParams, PauseSubscriptionParams, PayInvoiceParams, Payment, PaymentLink, PaymentMethod, Payout, Plan, ReactivateSubscriptionParams, Refund, RemovePaymentMethodParams, RequestLog, ResendEventParams, RestorePlanParams, ResumeSubscriptionParams, RotateWebhookEndpointSecretParams, SendInvoiceParams, SetDefaultPaymentMethodParams, Subscription, TestMobileMoneyNumber, TestWebhookEndpointParams, UpdateCustomerParams, UpdatePaymentLinkParams, UpdatePlanParams, UpdateSubscriptionParams, UpdateWebhookEndpointParams, VerifyEmbedDomainParams, Wallet, WalletTransfer, WebhookDelivery, WebhookEndpoint } from './types.js';

export class AccountResource extends Resource {
  /** Lire le compte. GET /api/v1/account */
  retrieve(params: GetAccountParams = {}): Promise<Account> {
    return this.requestObject<Account>('GET', `account`, params);
  }
}

export class FeesResource extends Resource {
  /** Calculer les frais d'un paiement. POST /api/v1/fees/quote */
  quote(params: CreateFeeQuoteParams, options: RequestOptions = {}): Promise<FeeQuote> {
    return this.requestObject<FeeQuote>('POST', `fees/quote`, params, options);
  }
}

export class ProviderStatusResource extends Resource {
  /** État des opérateurs. GET /api/v1/provider_status */
  retrieve(params: GetProviderStatusParams = {}): Promise<ProviderStatus> {
    return this.requestObject<ProviderStatus>('GET', `provider_status`, params);
  }
}

export class CheckoutSessionsResource extends Resource {
  /** Créer une session. POST /api/v1/checkout_sessions */
  create(params: CreateCheckoutSessionParams, options: RequestOptions = {}): Promise<CheckoutSession> {
    return this.requestObject<CheckoutSession>('POST', `checkout_sessions`, params, options);
  }

  /** Lister les sessions. GET /api/v1/checkout_sessions */
  list(params: ListCheckoutSessionsParams = {}): Promise<Page<CheckoutSession>> {
    return this.requestList<CheckoutSession>(`checkout_sessions`, params);
  }

  /** Lire une session. GET /api/v1/checkout_sessions/{id} */
  retrieve(id: string, params: GetCheckoutSessionParams = {}): Promise<CheckoutSession> {
    return this.requestObject<CheckoutSession>('GET', `checkout_sessions/${encodeURIComponent(id)}`, params);
  }

  /** Expirer une session. POST /api/v1/checkout_sessions/{id}/expire */
  expire(id: string, params: ExpireCheckoutSessionParams = {}, options: RequestOptions = {}): Promise<CheckoutSession> {
    return this.requestObject<CheckoutSession>('POST', `checkout_sessions/${encodeURIComponent(id)}/expire`, params, options);
  }
}

export class PaymentsResource extends Resource {
  /** Encaisser un paiement. POST /api/v1/payments */
  create(params: CreatePaymentParams, options: RequestOptions = {}): Promise<Payment> {
    return this.requestObject<Payment>('POST', `payments`, params, options);
  }

  /** Lister les paiements. GET /api/v1/payments */
  list(params: ListPaymentsParams = {}): Promise<Page<Payment>> {
    return this.requestList<Payment>(`payments`, params);
  }

  /** Lire un paiement. GET /api/v1/payments/{id} */
  retrieve(id: string, params: GetPaymentParams = {}): Promise<Payment> {
    return this.requestObject<Payment>('GET', `payments/${encodeURIComponent(id)}`, params);
  }

  /** Rembourser un paiement. POST /api/v1/payments/{id}/refunds */
  refund(id: string, params: CreateRefundParams = {}, options: RequestOptions = {}): Promise<Refund> {
    return this.requestObject<Refund>('POST', `payments/${encodeURIComponent(id)}/refunds`, params, options);
  }
}

export class RefundsResource extends Resource {
  /** Lister les remboursements. GET /api/v1/refunds */
  list(params: ListRefundsParams = {}): Promise<Page<Refund>> {
    return this.requestList<Refund>(`refunds`, params);
  }

  /** Lire un remboursement. GET /api/v1/refunds/{id} */
  retrieve(id: string, params: GetRefundParams = {}): Promise<Refund> {
    return this.requestObject<Refund>('GET', `refunds/${encodeURIComponent(id)}`, params);
  }

  /** Annuler un remboursement retardé. POST /api/v1/refunds/{id}/cancel */
  cancel(id: string, params: CancelRefundParams = {}, options: RequestOptions = {}): Promise<Refund> {
    return this.requestObject<Refund>('POST', `refunds/${encodeURIComponent(id)}/cancel`, params, options);
  }
}

export class WalletsResource extends Resource {
  /** Lire les soldes. GET /api/v1/wallets */
  list(params: ListWalletsParams = {}): Promise<Page<Wallet>> {
    return this.requestList<Wallet>(`wallets`, params);
  }
}

export class WalletTransfersResource extends Resource {
  /** Lister les virements entre soldes. GET /api/v1/wallet_transfers */
  list(params: ListWalletTransfersParams = {}): Promise<Page<WalletTransfer>> {
    return this.requestList<WalletTransfer>(`wallet_transfers`, params);
  }

  /** Virer entre deux soldes. POST /api/v1/wallet_transfers */
  create(params: CreateWalletTransferParams, options: RequestOptions = {}): Promise<WalletTransfer> {
    return this.requestObject<WalletTransfer>('POST', `wallet_transfers`, params, options);
  }
}

export class PayoutsResource extends Resource {
  /** Demander un retrait. POST /api/v1/payouts */
  create(params: CreatePayoutParams, options: RequestOptions = {}): Promise<Payout> {
    return this.requestObject<Payout>('POST', `payouts`, params, options);
  }

  /** Lister les retraits. GET /api/v1/payouts */
  list(params: ListPayoutsParams = {}): Promise<Page<Payout>> {
    return this.requestList<Payout>(`payouts`, params);
  }

  /** Lire un retrait. GET /api/v1/payouts/{id} */
  retrieve(id: string, params: GetPayoutParams = {}): Promise<Payout> {
    return this.requestObject<Payout>('GET', `payouts/${encodeURIComponent(id)}`, params);
  }
}

export class PaymentLinksResource extends Resource {
  /** Créer un lien. POST /api/v1/payment_links */
  create(params: CreatePaymentLinkParams, options: RequestOptions = {}): Promise<PaymentLink> {
    return this.requestObject<PaymentLink>('POST', `payment_links`, params, options);
  }

  /** Lister les liens. GET /api/v1/payment_links */
  list(params: ListPaymentLinksParams = {}): Promise<Page<PaymentLink>> {
    return this.requestList<PaymentLink>(`payment_links`, params);
  }

  /** Lire un lien. GET /api/v1/payment_links/{id} */
  retrieve(id: string, params: GetPaymentLinkParams = {}): Promise<PaymentLink> {
    return this.requestObject<PaymentLink>('GET', `payment_links/${encodeURIComponent(id)}`, params);
  }

  /** Modifier un lien. PATCH /api/v1/payment_links/{id} */
  update(id: string, params: UpdatePaymentLinkParams = {}): Promise<PaymentLink> {
    return this.requestObject<PaymentLink>('PATCH', `payment_links/${encodeURIComponent(id)}`, params);
  }

  /** Supprimer un lien. DELETE /api/v1/payment_links/{id} */
  delete(id: string, params: DeletePaymentLinkParams = {}): Promise<Record<string, unknown>> {
    return this.requestObject<Record<string, unknown>>('DELETE', `payment_links/${encodeURIComponent(id)}`, params);
  }

  /** Archiver un lien. POST /api/v1/payment_links/{id}/archive */
  archive(id: string, params: ArchivePaymentLinkParams = {}, options: RequestOptions = {}): Promise<PaymentLink> {
    return this.requestObject<PaymentLink>('POST', `payment_links/${encodeURIComponent(id)}/archive`, params, options);
  }

  /** Paiements d'un lien. GET /api/v1/payment_links/{id}/payments */
  payments(id: string, params: ListPaymentLinkPaymentsParams = {}): Promise<Page<Payment>> {
    return this.requestList<Payment>(`payment_links/${encodeURIComponent(id)}/payments`, params);
  }
}

export class PlansResource extends Resource {
  /** Créer un plan. POST /api/v1/plans */
  create(params: CreatePlanParams, options: RequestOptions = {}): Promise<Plan> {
    return this.requestObject<Plan>('POST', `plans`, params, options);
  }

  /** Lister les plans. GET /api/v1/plans */
  list(params: ListPlansParams = {}): Promise<Page<Plan>> {
    return this.requestList<Plan>(`plans`, params);
  }

  /** Lire un plan. GET /api/v1/plans/{id} */
  retrieve(id: string, params: GetPlanParams = {}): Promise<Plan> {
    return this.requestObject<Plan>('GET', `plans/${encodeURIComponent(id)}`, params);
  }

  /** Modifier un plan. PATCH /api/v1/plans/{id} */
  update(id: string, params: UpdatePlanParams = {}): Promise<Plan> {
    return this.requestObject<Plan>('PATCH', `plans/${encodeURIComponent(id)}`, params);
  }

  /** Supprimer un plan. DELETE /api/v1/plans/{id} */
  delete(id: string, params: DeletePlanParams = {}): Promise<Record<string, unknown>> {
    return this.requestObject<Record<string, unknown>>('DELETE', `plans/${encodeURIComponent(id)}`, params);
  }

  /** Archiver un plan. POST /api/v1/plans/{id}/archive */
  archive(id: string, params: ArchivePlanParams = {}, options: RequestOptions = {}): Promise<Plan> {
    return this.requestObject<Plan>('POST', `plans/${encodeURIComponent(id)}/archive`, params, options);
  }

  /** Réactiver un plan. POST /api/v1/plans/{id}/restore */
  restore(id: string, params: RestorePlanParams = {}, options: RequestOptions = {}): Promise<Plan> {
    return this.requestObject<Plan>('POST', `plans/${encodeURIComponent(id)}/restore`, params, options);
  }
}

export class CustomersResource extends Resource {
  /** Créer un client. POST /api/v1/customers */
  create(params: CreateCustomerParams, options: RequestOptions = {}): Promise<Customer> {
    return this.requestObject<Customer>('POST', `customers`, params, options);
  }

  /** Lister les clients. GET /api/v1/customers */
  list(params: ListCustomersParams = {}): Promise<Page<Customer>> {
    return this.requestList<Customer>(`customers`, params);
  }

  /** Lire un client. GET /api/v1/customers/{id} */
  retrieve(id: string, params: GetCustomerParams = {}): Promise<Customer> {
    return this.requestObject<Customer>('GET', `customers/${encodeURIComponent(id)}`, params);
  }

  /** Modifier un client. PATCH /api/v1/customers/{id} */
  update(id: string, params: UpdateCustomerParams = {}): Promise<Customer> {
    return this.requestObject<Customer>('PATCH', `customers/${encodeURIComponent(id)}`, params);
  }

  /** Supprimer un client. DELETE /api/v1/customers/{id} */
  delete(id: string, params: DeleteCustomerParams = {}): Promise<Record<string, unknown>> {
    return this.requestObject<Record<string, unknown>>('DELETE', `customers/${encodeURIComponent(id)}`, params);
  }

  /** Moyens de paiement d'un client. GET /api/v1/customers/{id}/payment_methods */
  paymentMethods(customerId: string, params: ListCustomerPaymentMethodsParams = {}): Promise<Page<PaymentMethod>> {
    return this.requestList<PaymentMethod>(`customers/${encodeURIComponent(customerId)}/payment_methods`, params);
  }

  /** Choisir le moyen par défaut. POST /api/v1/customers/{id}/payment_methods/{id}/default */
  setDefaultPaymentMethod(customerId: string, paymentMethodId: string, params: SetDefaultPaymentMethodParams = {}, options: RequestOptions = {}): Promise<Customer> {
    return this.requestObject<Customer>('POST', `customers/${encodeURIComponent(customerId)}/payment_methods/${encodeURIComponent(paymentMethodId)}/default`, params, options);
  }

  /** Retirer un moyen de paiement. DELETE /api/v1/customers/{id}/payment_methods/{id} */
  removePaymentMethod(customerId: string, paymentMethodId: string, params: RemovePaymentMethodParams = {}): Promise<Record<string, unknown>> {
    return this.requestObject<Record<string, unknown>>('DELETE', `customers/${encodeURIComponent(customerId)}/payment_methods/${encodeURIComponent(paymentMethodId)}`, params);
  }
}

export class SubscriptionsResource extends Resource {
  /** Créer un abonnement. POST /api/v1/subscriptions */
  create(params: CreateSubscriptionParams, options: RequestOptions = {}): Promise<Subscription> {
    return this.requestObject<Subscription>('POST', `subscriptions`, params, options);
  }

  /** Lister les abonnements. GET /api/v1/subscriptions */
  list(params: ListSubscriptionsParams = {}): Promise<Page<Subscription>> {
    return this.requestList<Subscription>(`subscriptions`, params);
  }

  /** Lire un abonnement. GET /api/v1/subscriptions/{id} */
  retrieve(id: string, params: GetSubscriptionParams = {}): Promise<Subscription> {
    return this.requestObject<Subscription>('GET', `subscriptions/${encodeURIComponent(id)}`, params);
  }

  /** Modifier un abonnement. PATCH /api/v1/subscriptions/{id} */
  update(id: string, params: UpdateSubscriptionParams = {}): Promise<Subscription> {
    return this.requestObject<Subscription>('PATCH', `subscriptions/${encodeURIComponent(id)}`, params);
  }

  /** Annuler un abonnement. POST /api/v1/subscriptions/{id}/cancel */
  cancel(id: string, params: CancelSubscriptionParams = {}, options: RequestOptions = {}): Promise<Subscription> {
    return this.requestObject<Subscription>('POST', `subscriptions/${encodeURIComponent(id)}/cancel`, params, options);
  }

  /** Retirer une annulation prévue. POST /api/v1/subscriptions/{id}/reactivate */
  reactivate(id: string, params: ReactivateSubscriptionParams = {}, options: RequestOptions = {}): Promise<Subscription> {
    return this.requestObject<Subscription>('POST', `subscriptions/${encodeURIComponent(id)}/reactivate`, params, options);
  }

  /** Passer à l'échéance (sandbox). POST /api/v1/subscriptions/{id}/advance */
  advance(id: string, params: AdvanceSubscriptionParams = {}, options: RequestOptions = {}): Promise<Subscription> {
    return this.requestObject<Subscription>('POST', `subscriptions/${encodeURIComponent(id)}/advance`, params, options);
  }

  /** Mettre en pause. POST /api/v1/subscriptions/{id}/pause */
  pause(id: string, params: PauseSubscriptionParams = {}, options: RequestOptions = {}): Promise<Subscription> {
    return this.requestObject<Subscription>('POST', `subscriptions/${encodeURIComponent(id)}/pause`, params, options);
  }

  /** Reprendre. POST /api/v1/subscriptions/{id}/resume */
  resume(id: string, params: ResumeSubscriptionParams = {}, options: RequestOptions = {}): Promise<Subscription> {
    return this.requestObject<Subscription>('POST', `subscriptions/${encodeURIComponent(id)}/resume`, params, options);
  }

  /** Factures d'un abonnement. GET /api/v1/subscriptions/{id}/invoices */
  invoices(id: string, params: ListSubscriptionInvoicesParams = {}): Promise<Page<Invoice>> {
    return this.requestList<Invoice>(`subscriptions/${encodeURIComponent(id)}/invoices`, params);
  }
}

export class InvoicesResource extends Resource {
  /** Lister les factures. GET /api/v1/invoices */
  list(params: ListInvoicesParams = {}): Promise<Page<Invoice>> {
    return this.requestList<Invoice>(`invoices`, params);
  }

  /** Lire une facture. GET /api/v1/invoices/{id} */
  retrieve(id: string, params: GetInvoiceParams = {}): Promise<Invoice> {
    return this.requestObject<Invoice>('GET', `invoices/${encodeURIComponent(id)}`, params);
  }

  /** Encaisser une facture. POST /api/v1/invoices/{id}/pay */
  pay(id: string, params: PayInvoiceParams = {}, options: RequestOptions = {}): Promise<Invoice> {
    return this.requestObject<Invoice>('POST', `invoices/${encodeURIComponent(id)}/pay`, params, options);
  }

  /** Envoyer la facture au client. POST /api/v1/invoices/{id}/send */
  send(id: string, params: SendInvoiceParams = {}, options: RequestOptions = {}): Promise<Invoice> {
    return this.requestObject<Invoice>('POST', `invoices/${encodeURIComponent(id)}/send`, params, options);
  }
}

export class BillingPortalResource extends Resource {
  /** Ouvrir l'espace client. POST /api/v1/billing_portal/sessions */
  createSession(params: CreateBillingPortalSessionParams, options: RequestOptions = {}): Promise<Record<string, unknown>> {
    return this.requestObject<Record<string, unknown>>('POST', `billing_portal/sessions`, params, options);
  }
}

export class EventsResource extends Resource {
  /** Lister les événements. GET /api/v1/events */
  list(params: ListEventsParams = {}): Promise<Page<Event>> {
    return this.requestList<Event>(`events`, params);
  }

  /** Lire un événement. GET /api/v1/events/{id} */
  retrieve(id: string, params: GetEventParams = {}): Promise<Event> {
    return this.requestObject<Event>('GET', `events/${encodeURIComponent(id)}`, params);
  }

  /** Lister les envois d'un événement. GET /api/v1/events/{id}/deliveries */
  deliveries(id: string, params: ListEventDeliveriesParams = {}): Promise<Page<WebhookDelivery>> {
    return this.requestList<WebhookDelivery>(`events/${encodeURIComponent(id)}/deliveries`, params);
  }

  /** Renvoyer un événement. POST /api/v1/events/{id}/resend */
  resend(id: string, params: ResendEventParams, options: RequestOptions = {}): Promise<Event> {
    return this.requestObject<Event>('POST', `events/${encodeURIComponent(id)}/resend`, params, options);
  }
}

export class WebhookEndpointsResource extends Resource {
  /** Créer un endpoint. POST /api/v1/webhook_endpoints */
  create(params: CreateWebhookEndpointParams, options: RequestOptions = {}): Promise<WebhookEndpoint> {
    return this.requestObject<WebhookEndpoint>('POST', `webhook_endpoints`, params, options);
  }

  /** Lister les endpoints. GET /api/v1/webhook_endpoints */
  list(params: ListWebhookEndpointsParams = {}): Promise<Page<WebhookEndpoint>> {
    return this.requestList<WebhookEndpoint>(`webhook_endpoints`, params);
  }

  /** Lire un endpoint. GET /api/v1/webhook_endpoints/{id} */
  retrieve(id: string, params: GetWebhookEndpointParams = {}): Promise<WebhookEndpoint> {
    return this.requestObject<WebhookEndpoint>('GET', `webhook_endpoints/${encodeURIComponent(id)}`, params);
  }

  /** Modifier un endpoint. PATCH /api/v1/webhook_endpoints/{id} */
  update(id: string, params: UpdateWebhookEndpointParams = {}): Promise<WebhookEndpoint> {
    return this.requestObject<WebhookEndpoint>('PATCH', `webhook_endpoints/${encodeURIComponent(id)}`, params);
  }

  /** Supprimer un endpoint. DELETE /api/v1/webhook_endpoints/{id} */
  delete(id: string, params: DeleteWebhookEndpointParams = {}): Promise<Record<string, unknown>> {
    return this.requestObject<Record<string, unknown>>('DELETE', `webhook_endpoints/${encodeURIComponent(id)}`, params);
  }

  /** Changer le secret. POST /api/v1/webhook_endpoints/{id}/rotate_secret */
  rotateSecret(id: string, params: RotateWebhookEndpointSecretParams = {}, options: RequestOptions = {}): Promise<WebhookEndpoint> {
    return this.requestObject<WebhookEndpoint>('POST', `webhook_endpoints/${encodeURIComponent(id)}/rotate_secret`, params, options);
  }

  /** Envoyer un test. POST /api/v1/webhook_endpoints/{id}/test */
  test(id: string, params: TestWebhookEndpointParams = {}, options: RequestOptions = {}): Promise<Event> {
    return this.requestObject<Event>('POST', `webhook_endpoints/${encodeURIComponent(id)}/test`, params, options);
  }
}

export class RequestLogsResource extends Resource {
  /** Lister les requêtes. GET /api/v1/request_logs */
  list(params: ListRequestLogsParams = {}): Promise<Page<RequestLog>> {
    return this.requestList<RequestLog>(`request_logs`, params);
  }
}

export class TestHelpersResource extends Resource {
  /** Déclencher un événement de test. POST /api/v1/test_helpers/events */
  triggerEvent(params: CreateTestEventParams, options: RequestOptions = {}): Promise<Event> {
    return this.requestObject<Event>('POST', `test_helpers/events`, params, options);
  }

  /** Lister les numéros de test mobile money. GET /api/v1/test_helpers/mobile_money_numbers */
  mobileMoneyNumbers(params: ListTestMobileMoneyNumbersParams = {}): Promise<Page<TestMobileMoneyNumber>> {
    return this.requestList<TestMobileMoneyNumber>(`test_helpers/mobile_money_numbers`, params);
  }
}

export class EmbedDomainsResource extends Resource {
  /** Ajouter un site. POST /api/v1/embed_domains */
  create(params: CreateEmbedDomainParams, options: RequestOptions = {}): Promise<EmbedDomain> {
    return this.requestObject<EmbedDomain>('POST', `embed_domains`, params, options);
  }

  /** Lister les sites autorisés. GET /api/v1/embed_domains */
  list(params: ListEmbedDomainsParams = {}): Promise<Page<EmbedDomain>> {
    return this.requestList<EmbedDomain>(`embed_domains`, params);
  }

  /** Lire un site autorisé. GET /api/v1/embed_domains/{id} */
  retrieve(id: string, params: GetEmbedDomainParams = {}): Promise<EmbedDomain> {
    return this.requestObject<EmbedDomain>('GET', `embed_domains/${encodeURIComponent(id)}`, params);
  }

  /** Retirer un site. DELETE /api/v1/embed_domains/{id} */
  delete(id: string, params: DeleteEmbedDomainParams = {}): Promise<Record<string, unknown>> {
    return this.requestObject<Record<string, unknown>>('DELETE', `embed_domains/${encodeURIComponent(id)}`, params);
  }

  /** Vérifier un site maintenant. POST /api/v1/embed_domains/{id}/verify */
  verify(id: string, params: VerifyEmbedDomainParams = {}, options: RequestOptions = {}): Promise<EmbedDomain> {
    return this.requestObject<EmbedDomain>('POST', `embed_domains/${encodeURIComponent(id)}/verify`, params, options);
  }
}
