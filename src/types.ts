// Généré par scripts/generate.py depuis la référence de l'API. Ne pas modifier à la main.

import type { CountryCode, MobileMoneyProvider } from './catalog.js';

export interface NextAction {
  /** `card_payment` : la carte doit encore être saisie et confirmée par votre client, ce que fait le [paiement intégré](/payments/embedded). `redirect` : envoyer le client sur `redirect_url`. */
  type: "card_payment" | "redirect";
  /** `card_payment` : secret de confirmation de la carte, lié au réseau carte. Préférez le [paiement intégré](/payments/embedded), qui s'en charge pour vous. */
  client_secret: string;
  /** `redirect` : page hébergée où le client termine. */
  redirect_url: string;
  [field: string]: unknown;
}

export interface Payment {
  /** Identifiant du paiement (`pay_…`) */
  id: string;
  object: "payment";
  /** `true` pour de l'argent réel (clé live), `false` en sandbox */
  livemode: boolean;
  /** Date de création, ISO 8601 */
  created: string | null;
  /** Session de checkout d'origine (`cs_…`), `null` pour un paiement direct. Avec `expand[]=checkout_session`, la session complète */
  checkout_session: string | null;
  /** Montant payé par le payeur, en unités mineures */
  amount: number;
  /** Frais retenus */
  fee_amount: number;
  /** Montant versé sur votre solde */
  net_amount: number;
  /** Qui a payé les frais. `merchant` : ils sont déduits de `net_amount`. `customer` : ils sont ajoutés à `amount`, et `net_amount` est le prix demandé. */
  fee_paid_by: "merchant" | "customer";
  /** Ce qui a déjà été rendu au client par des remboursements, en unités mineures. Le paiement passe à `refunded` quand il atteint `amount`. */
  amount_refunded: number;
  /** La contestation du paiement par le titulaire de la carte auprès de sa banque, `null` s'il n'y en a pas. Voir [Contestations](/payments/disputes). */
  dispute: { status: "open" | "won" | "lost"; reason: string | null; amount: number; currency: string; evidence_due_by: string | null; created: string | null; closed: string | null } | null;
  /** Devise réellement encaissée. En mobile money, celle de l'opérateur, après conversion si besoin. */
  currency: string;
  /** Canal de paiement */
  payment_method: "mobile_money" | "card";
  /** Pays de l'opérateur, `null` pour une carte. */
  mobile_money_country: string | null;
  /** Opérateur, `null` pour une carte. */
  mobile_money_provider: string | null;
  /** Le payeur, tel que saisi sur la page de paiement ou transmis à la création. Pour le mobile money, `phone` est le numéro réellement débité. */
  payer: { name: string | null; email: string | null; phone: string | null };
  /** Voir [Paiements](/payments/payment-object#statuts). */
  status: "pending" | "processing" | "succeeded" | "failed" | "canceled" | "expired" | "refunded" | "disputed";
  /** Code stable de l'échec quand `status` vaut `failed`, sinon `null`. Voir [la liste](/api/payments/create#failure_code). */
  failure_code: string | null;
  /** Raison de l'échec en français, à afficher telle quelle. */
  failure_reason: string | null;
  /** Vos données libres. Voir [Metadata](/developers/metadata). */
  metadata: Record<string, unknown> | null;
  next_action: NextAction;
  [field: string]: unknown;
}

export interface CheckoutSession {
  /** Identifiant de la session (`cs_…`) */
  id: string;
  object: "checkout_session";
  /** `true` pour de l'argent réel (clé live), `false` en sandbox */
  livemode: boolean;
  /** Date de création, ISO 8601 */
  created: string | null;
  /** Montant demandé, en unités mineures. */
  amount: number;
  /** Devise du montant */
  currency: string;
  /** Affichée au client */
  description: string | null;
  /** Nom du payeur */
  payer_name: string | null;
  /** E-mail du payeur */
  payer_email: string | null;
  /** Téléphone du payeur */
  payer_phone: string | null;
  /** Adresse saisie, si un lien de paiement la demande : `line1`, `city`, `country`. */
  payer_address: Record<string, unknown> | null;
  /** Lien de paiement d'origine (`plink_…`), `null` sinon */
  payment_link: string | null;
  /** Réponses aux champs personnalisés d'un lien de paiement, par `id` de champ. Pour un fichier, son nom. */
  custom_fields: Record<string, unknown>;
  /** Retour après paiement réussi */
  success_url: string | null;
  /** Retour si le client abandonne */
  cancel_url: string | null;
  /** Moyens proposés sur la page de paiement. `null` : tous les moyens ouverts. */
  payment_method_types: Array<"mobile_money" | "card"> | null;
  /** Pays mobile money proposés. `null` : tous les pays ouverts. */
  allowed_countries: string[] | null;
  /** Voir [Sessions de paiement](/payments/checkout-sessions#cycle-de-vie). */
  status: "created" | "pending_payment" | "completed" | "expired" | "cancelled";
  /** `hosted` : page de paiement Mercy Pay. `embedded` : formulaire affiché dans votre page. */
  ui_mode: "hosted" | "embedded";
  /** En mode `embedded` seulement : à transmettre au navigateur pour afficher le formulaire de paiement de cette session. Il n'ouvre que ce formulaire, rien d'autre. Ne le confondez pas avec votre clé API, qui reste sur votre serveur. `null` en mode `hosted`. */
  client_secret: string | null;
  /** Vos données libres. Voir [Metadata](/developers/metadata). */
  metadata: Record<string, unknown> | null;
  /** Page de paiement hébergée où rediriger votre client. Elle est sur le domaine de la boutique quand l'option Domaine personnalisé est active. */
  checkout_url: string;
  /** Fin de validité, 30 minutes après la création. */
  expires_at: string | null;
  /** Dernière tentative de paiement du client, `null` tant qu'il n'a rien lancé. */
  payment: Payment | null;
  [field: string]: unknown;
}

export interface Wallet {
  /** Identifiant du solde (`wal_…`) */
  id: string;
  object: "wallet";
  /** `true` pour de l'argent réel (clé live), `false` en sandbox */
  livemode: boolean;
  /** Date de création, ISO 8601 */
  created: string | null;
  /** Canal */
  channel: "mobile_money" | "card";
  /** Pays, `null` pour la carte. */
  country: string | null;
  /** Opérateur, `null` pour la carte. */
  provider: string | null;
  /** Devise du solde */
  currency: string;
  /** Disponible pour un retrait, en unités mineures. */
  available_balance: number;
  /** Comptabilisé mais pas encore disponible (carte : jusqu'à ce que les fonds nous soient versés, en général sous 5 jours), en unités mineures. */
  pending_balance: number;
  [field: string]: unknown;
}

export interface Payout {
  /** Identifiant du retrait (`po_…`) */
  id: string;
  object: "payout";
  /** `true` pour de l'argent réel (clé live), `false` en sandbox */
  livemode: boolean;
  /** Date de création, ISO 8601 */
  created: string | null;
  /** Montant demandé, débité en totalité de votre solde. */
  amount: number;
  /** Commission Mercy Pay retenue, 2 % de `amount`. */
  fee_amount: number;
  /** Montant réellement envoyé (`amount` moins `fee_amount`). */
  net_amount: number;
  /** Devise du solde source */
  currency: string;
  destination: { type: "mobile_money"; country: string; provider: string; phone: string };
  /** Voir [Retraits](/payouts/overview#statuts). */
  status: "requested" | "approved" | "processing" | "paid" | "failed" | "rejected" | "canceled";
  /** Précise un retrait en cours. `delayed` : l'opérateur est indisponible et le retrait attend son retour, vous pouvez l'annuler. `pending_processing` : le retrait n'est pas encore parti, il partira automatiquement. `null` sinon. */
  status_detail: "delayed" | "pending_processing" | null;
  /** D'où vient le retrait. Vide pour ceux créés avant le 7 novembre 2026. */
  origin: "dashboard" | "api" | "automatic" | null;
  /** Motif d'échec stable, par exemple `recipient_not_found`. Voir [Erreurs](/developers/errors) */
  failure_code: string | null;
  /** Raison de l'échec ou du refus */
  failure_reason: string | null;
  /** Vos données libres. Voir [Metadata](/developers/metadata). */
  metadata: Record<string, unknown> | null;
  [field: string]: unknown;
}

export interface PriceOption {
  /** Identifiant, à renvoyer pour modifier ce tarif */
  id: number;
  /** Nom du tarif */
  label: string;
  /** Prix en unités mineures */
  amount: number;
  [field: string]: unknown;
}

export interface CartItem {
  /** Identifiant, à renvoyer pour modifier cet article */
  id: number;
  /** Nom de l'article */
  name: string;
  /** Description */
  description: string | null;
  /** Prix unitaire en unités mineures */
  unit_amount: number;
  /** Quantité minimale */
  min_quantity: number | null;
  /** Quantité maximale */
  max_quantity: number | null;
  variants: Array<{ id: number; label: string; unit_amount: number | null }>;
  [field: string]: unknown;
}

export interface CustomField {
  /** Clé unique : lettres, chiffres, `_` et `-`. 64 caractères maximum. */
  id: string;
  /** Type de champ */
  type: "text" | "select" | "multi_select" | "checkbox" | "file";
  /** Libellé affiché */
  label: string;
  /** Aide sous le champ */
  help_text: string | null;
  /** Champ obligatoire */
  required: boolean;
  /** `select` et `multi_select` : les choix, 50 maximum. */
  options: string[];
  /** `file` : taille maximale en Ko, 10240 au plus. Images et PDF uniquement. */
  max_file_size_kb: number | null;
  [field: string]: unknown;
}

export interface PaymentLink {
  /** Identifiant du lien (`plink_…`) */
  id: string;
  object: "payment_link";
  /** `true` pour de l'argent réel (clé live), `false` en sandbox */
  livemode: boolean;
  /** Date de création, ISO 8601 */
  created: string | null;
  /** `one_time` (un paiement) ou `recurring` (inscription à un plan). */
  type: "one_time" | "recurring";
  /** `fixed`, `flexible` (montant libre), `options` (plusieurs tarifs) ou `cart` (panier). Toujours `fixed` pour un lien `recurring`. */
  pricing_mode: "fixed" | "flexible" | "options" | "cart";
  /** Titre affiché au client */
  title: string;
  /** Description */
  description: string | null;
  /** Prix fixe, en unités mineures */
  amount: number | null;
  /** Montant libre : minimum accepté */
  minimum_amount: number | null;
  /** Devise du lien */
  currency: string;
  /** Plan d'un lien récurrent (`plan_…`), `null` sinon */
  plan: string | null;
  price_options: PriceOption[];
  items: CartItem[];
  custom_fields: CustomField[];
  /** Demande le téléphone du payeur */
  collect_phone: boolean;
  /** Demande l'adresse du payeur */
  collect_address: boolean;
  /** Affiché après un paiement réussi */
  after_payment_message: string | null;
  /** `false` : le lien n'accepte plus de paiement */
  is_active: boolean;
  /** Plafond de `uses_count`. Une session en cours réserve une place jusqu'à son expiration. */
  max_uses: number | null;
  /** Paiements réussis, ou inscriptions pour un lien `recurring` */
  uses_count: number;
  /** Ouvertures de la page du lien */
  views_count: number;
  /** Fin de validité */
  expires_at: string | null;
  /** Date d'archivage */
  archived_at: string | null;
  /** Retour après paiement réussi */
  success_url: string | null;
  /** Retour si le client abandonne */
  cancel_url: string | null;
  /** Vos données libres. Voir [Metadata](/developers/metadata). */
  metadata: Record<string, unknown> | null;
  /** Page publique du lien, à partager. Elle est sur le domaine de la boutique quand l'option Domaine personnalisé est active. */
  url: string;
  [field: string]: unknown;
}

export interface Plan {
  /** Identifiant du plan (`plan_…`) */
  id: string;
  object: "plan";
  /** `true` pour de l'argent réel (clé live), `false` en sandbox */
  livemode: boolean;
  /** Date de création, ISO 8601 */
  created: string | null;
  /** Nom affiché au client */
  name: string;
  /** Description */
  description: string | null;
  /** Prix d'un cycle, en unités mineures */
  amount: number;
  /** Devise */
  currency: string;
  /** Rythme */
  interval: "daily" | "weekly" | "monthly" | "yearly";
  /** Nombre d'`interval` par cycle : `monthly` et `3`, tous les 3 mois. */
  interval_count: number;
  /** Jours d'essai, `0` sans essai */
  trial_period_days: number;
  /** `archived` : plus de nouvel abonné */
  status: "active" | "archived";
  /** Vos abonnés peuvent passer à ce plan depuis leur espace client. */
  portal_switchable: boolean;
  /** Abonnements en essai, actifs, en retard, impayés ou en pause. Renvoyé par la liste seulement. */
  active_subscriptions_count: number;
  /** Vos données libres. Voir [Metadata](/developers/metadata). */
  metadata: Record<string, unknown> | null;
  [field: string]: unknown;
}

export interface Subscription {
  /** Identifiant de l'abonnement (`sub_…`) */
  id: string;
  object: "subscription";
  /** `true` pour de l'argent réel (clé live), `false` en sandbox */
  livemode: boolean;
  /** Date de création, ISO 8601 */
  created: string | null;
  plan: Plan;
  /** Plan appliqué à la prochaine échéance (`plan_…`), `null` sinon */
  pending_plan: string | null;
  /** Moyen choisi à l'inscription */
  payment_method: "card" | "mobile_money";
  /** Client (`cus_…`). Avec `expand[]=customer`, le client complet */
  customer: string | null;
  /** Nom du client */
  customer_name: string;
  /** E-mail du client : reçus, rappels et accès à l'espace client */
  customer_email: string;
  /** Numéro mobile money */
  customer_phone: string | null;
  /** Pays du numéro */
  customer_country: string | null;
  /** Opérateur du numéro */
  customer_provider: string | null;
  /** Voir [le cycle de vie](/subscriptions/overview#cycle-de-vie). */
  status: "incomplete" | "trialing" | "active" | "past_due" | "unpaid" | "paused" | "canceled";
  /** Début de la période en cours */
  current_period_start: string | null;
  /** Fin de la période en cours */
  current_period_end: string | null;
  /** Fin de l'essai */
  trial_ends_at: string | null;
  /** Prochaine échéance */
  next_billing_at: string | null;
  /** `true` : s'arrête à la fin de la période payée */
  cancel_at_period_end: boolean;
  /** Date d'annulation */
  canceled_at: string | null;
  /** Date de mise en pause */
  paused_at: string | null;
  /** Reprise automatique prévue */
  resumes_at: string | null;
  /** Nombre d'échéances après lequel l'abonnement s'arrête, `null` sans limite. */
  max_cycles: number | null;
  /** Échéances déjà facturées */
  cycles_billed: number;
  /** Vos données libres. Voir [Metadata](/developers/metadata). */
  metadata: Record<string, unknown> | null;
  next_action: NextAction;
  [field: string]: unknown;
}

export interface PaymentMethod {
  /** Identifiant du moyen de paiement (`pm_…`) */
  id: string;
  object: "payment_method";
  /** `true` pour de l'argent réel (clé live), `false` en sandbox */
  livemode: boolean;
  /** Date de création, ISO 8601 */
  created: string | null;
  /** Type */
  type: "card" | "mobile_money";
  /** Libellé lisible, par exemple `Visa •• 4242` */
  label: string;
  /** Carte : marque */
  brand: string | null;
  /** Carte : 4 derniers chiffres */
  last4: string | null;
  /** Carte : mois d'expiration */
  exp_month: number | null;
  /** Carte : année d'expiration */
  exp_year: number | null;
  /** Mobile money : pays */
  country: string | null;
  /** Mobile money : opérateur */
  provider: string | null;
  /** Mobile money : les 2 derniers chiffres. Le numéro complet n'est jamais renvoyé. */
  phone_last_digits: string | null;
  /** `true` dès qu'un paiement a réussi avec ce moyen. Un numéro est confirmé ainsi, sans SMS. */
  verified: boolean;
  [field: string]: unknown;
}

export interface Customer {
  /** Identifiant du client (`cus_…`) */
  id: string;
  object: "customer";
  /** `true` pour de l'argent réel (clé live), `false` en sandbox */
  livemode: boolean;
  /** Date de création, ISO 8601 */
  created: string | null;
  /** E-mail, unique par environnement */
  email: string;
  /** Nom */
  name: string | null;
  /** Vos données libres. Voir [Metadata](/developers/metadata). */
  metadata: Record<string, unknown> | null;
  /** Moyen essayé en premier (`pm_…`), `null` si aucun */
  default_payment_method: string | null;
  /** Moyens enregistrés, du plus ancien au plus récent. Renvoyé par le détail d'un client. */
  payment_methods: PaymentMethod[];
  /** Nombre d'abonnements. Renvoyé par la liste. */
  subscriptions_count: number;
  [field: string]: unknown;
}

export interface Invoice {
  /** Identifiant de la facture (`in_…`) */
  id: string;
  object: "invoice";
  /** `true` pour de l'argent réel (clé live), `false` en sandbox */
  livemode: boolean;
  /** Date de création, ISO 8601 */
  created: string | null;
  /** Numéro lisible, par exemple `F2026-000019` */
  number: string;
  /** Abonnement (`sub_…`). Avec `expand[]=subscription`, l'abonnement complet */
  subscription: string;
  /** `first` (premier paiement qui active l'abonnement), `cycle` (échéance) ou `proration` (différence payée pour un plan plus cher). */
  kind: "first" | "cycle" | "proration";
  /** Montant en unités mineures */
  amount: number;
  /** Devise */
  currency: string;
  /** Début de la période facturée */
  period_start: string;
  /** Fin de la période facturée */
  period_end: string;
  /** Échéance */
  due_at: string;
  /** `failed` : toutes les tentatives ont échoué. `canceled` : abonnement annulé avant paiement. */
  status: "pending" | "paid" | "failed" | "canceled";
  /** Tentatives d'encaissement déjà faites */
  attempt_count: number;
  /** Prochaine tentative automatique, `null` s'il n'y en a pas */
  next_attempt_at: string | null;
  /** Raison du dernier échec, lisible par votre client */
  failure_reason: string | null;
  /** Vos données libres. Voir [Metadata](/developers/metadata). */
  metadata: Record<string, unknown> | null;
  /** Paiement qui a réglé la facture (`pay_…`), `null` sinon. Avec `expand[]=payment`, le paiement complet */
  payment: string | null;
  /** Mobile money : page où le client paie cette facture, tant qu'elle est payable */
  pay_url: string | null;
  /** Date de paiement */
  paid_at: string | null;
  /** Date d'annulation */
  canceled_at: string | null;
  [field: string]: unknown;
}

export interface Event {
  /** Identifiant (`evt_…`), le même que dans le webhook */
  id: string;
  object: "event";
  livemode: boolean;
  created: string;
  /** Type de l'événement. Voir la liste commentée dans Événements. */
  type: "payment.succeeded" | "payment.failed" | "payment.refunded" | "payment.disputed" | "payment.dispute_closed" | "refund.succeeded" | "refund.failed" | "refund.canceled" | "payout.paid" | "payout.failed" | "payout.canceled" | "subscription.created" | "subscription.updated" | "subscription.past_due" | "subscription.unpaid" | "subscription.paused" | "subscription.resumed" | "subscription.canceled" | "invoice.created" | "invoice.upcoming" | "invoice.paid" | "invoice.canceled" | "invoice.payment_failed" | "checkout_session.completed" | "provider_status.changed" | "account.updated";
  /** L'objet concerné, tel qu'envoyé dans le webhook */
  data: Record<string, unknown>;
  [field: string]: unknown;
}

export interface WebhookEndpoint {
  /** Identifiant (`we_…`) */
  id: string;
  object: "webhook_endpoint";
  livemode: boolean;
  created: string;
  url: string;
  /** Types d'événements envoyés à cet endpoint */
  events: Array<"payment.succeeded" | "payment.failed" | "payment.refunded" | "payment.disputed" | "payment.dispute_closed" | "refund.succeeded" | "refund.failed" | "refund.canceled" | "payout.paid" | "payout.failed" | "payout.canceled" | "subscription.created" | "subscription.updated" | "subscription.past_due" | "subscription.unpaid" | "subscription.paused" | "subscription.resumed" | "subscription.canceled" | "invoice.created" | "invoice.upcoming" | "invoice.paid" | "invoice.canceled" | "invoice.payment_failed" | "checkout_session.completed" | "provider_status.changed" | "account.updated">;
  /** `null` : reçoit les événements sandbox et live */
  environment: "sandbox" | "live" | null;
  status: "enabled" | "disabled";
  /** Secret de signature, renvoyé une seule fois, à la création */
  secret: string;
  /** Pourquoi l'endpoint est désactivé : `failing` après 3 jours sans aucun événement accepté, `manual` à votre demande. `null` s'il est actif */
  disabled_reason: "failing" | "manual" | null;
  [field: string]: unknown;
}

export interface Refund {
  /** Identifiant du remboursement (`re_…`) */
  id: string;
  object: "refund";
  livemode: boolean;
  created: string;
  /** Le paiement remboursé (`pay_…`) */
  payment: string;
  /** Montant rendu au client, en unités mineures de la devise du paiement : tout ce qu'il a payé. */
  amount: number;
  /** Frais de remboursement débités de votre solde, en plus du montant. */
  fee_amount: number;
  currency: string;
  /** `pending` : envoyé, réponse attendue. `processing` : en route vers le client. `succeeded` : arrivé. `failed` : non envoyé, montant et frais revenus sur votre solde. `canceled` : annulé pendant qu'il attendait l'opérateur. */
  status: "pending" | "processing" | "succeeded" | "failed" | "canceled";
  /** `delayed` : l'opérateur est indisponible et le remboursement attend son retour, vous pouvez l'annuler. */
  status_detail: "delayed" | null;
  origin: "dashboard" | "api" | "admin";
  /** Motif donné à la demande. */
  reason: string | null;
  failure_code: string | null;
  failure_reason: string | null;
  succeeded_at: string | null;
  [field: string]: unknown;
}

export interface WebhookDelivery {
  /** Identifiant de l'envoi (`whd_…`) */
  id: string;
  object: "webhook_delivery";
  livemode: boolean;
  created: string;
  /** L'événement envoyé (`evt_…`) */
  event: string;
  /** L'endpoint visé (`we_…`) */
  webhook_endpoint: string | null;
  url: string | null;
  status: "pending" | "delivered" | "failed";
  attempt_count: number;
  /** Dernier code HTTP reçu */
  response_code: number | null;
  next_retry_at: string | null;
  delivered_at: string | null;
  attempts: Array<{ number: number; attempted_at: string; status_code: number | null; duration_ms: number | null; error: string | null }>;
  [field: string]: unknown;
}

export interface WalletTransfer {
  /** Identifiant du virement (`wtr_…`) */
  id: string;
  object: "wallet_transfer";
  livemode: boolean;
  created: string;
  /** Le solde débité (`wal_…`) */
  from_wallet: string;
  /** Le solde crédité (`wal_…`) */
  to_wallet: string;
  amount: number;
  currency: string;
  [field: string]: unknown;
}

export interface RequestLog {
  /** Identifiant de la requête (`req_…`), le même que l'en-tête `Request-Id` reçu */
  id: string;
  object: "request_log";
  /** `true` pour une clé live, `false` en sandbox */
  livemode: boolean;
  /** Date de la requête, ISO 8601 */
  created: string | null;
  /** Méthode HTTP */
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  /** Chemin appelé, par exemple `/v1/payments` */
  path: string;
  /** Statut HTTP renvoyé */
  status: number;
  /** Le `error.code` renvoyé, `null` si la requête a réussi */
  error_code: string | null;
  /** La `Idempotency-Key` envoyée, s'il y en avait une */
  idempotency_key: string | null;
  /** Durée de traitement, en millisecondes */
  duration_ms: number;
  [field: string]: unknown;
}

export interface EmbedDomain {
  /** Identifiant du site (`edom_…`) */
  id: string;
  object: "embed_domain";
  /** `true` pour une clé live, `false` en sandbox. Un site autorisé vaut pour les deux environnements. */
  livemode: boolean;
  /** Date d'ajout, ISO 8601 */
  created: string | null;
  /** Le domaine, par exemple `boutique.com`. Il autorise aussi ses sous-domaines. */
  hostname: string;
  /** `pending` tant que l'enregistrement TXT n'est pas trouvé, `verified` ensuite, `failed` s'il a disparu depuis plus de 7 jours. */
  status: "pending" | "verified" | "failed";
  /** L'enregistrement DNS à créer chez votre hébergeur de domaine. */
  verification: { type: "TXT"; name: string; value: string };
  /** Première vérification réussie */
  verified_at: string | null;
  /** Dernière lecture de l'enregistrement. Elle a lieu toutes les heures. */
  last_checked_at: string | null;
  [field: string]: unknown;
}

export interface TestMobileMoneyNumber {
  /** Pays (ISO 3166-1 alpha-3) */
  country: string;
  /** Code de l'opérateur, par exemple `MTN_MOMO_CMR` */
  provider: string;
  /** Numéro au format international, sans `+` */
  phone: string;
  /** Un paiement ou un retrait vers ce numéro */
  applies_to: "payment" | "payout";
  /** Le résultat obtenu à chaque fois */
  outcome: "succeeded" | "failed" | "pending";
  /** Le `failure_code` du paiement échoué, quand le numéro en produit un précis */
  failure_code: string | null;
  [field: string]: unknown;
}

// Ce que chaque opération accepte.

export interface GetAccountParams {
}

export interface CreateFeeQuoteParams {
  /** Le prix, en unités mineures */
  amount: number;
  /** Devise du prix */
  currency: string;
  payment_method: "mobile_money" | "card";
  /** Pays mobile money du client. Le montant est alors converti dans sa devise si besoin. Interdit pour une carte. */
  country?: CountryCode;
}

export interface GetProviderStatusParams {
}

export interface CreateCheckoutSessionParams {
  /** Montant en unités mineures, au moins `1`. Voir [Montants et devises](/payments/amounts-and-currencies). */
  amount: number;
  /** Code devise ISO 4217 de 3 lettres, par exemple `XAF`. */
  currency: string;
  /** Affichée au client. 500 caractères maximum. */
  description?: string;
  /** Nom du payeur, prérempli */
  payer_name?: string;
  /** E-mail du payeur, prérempli */
  payer_email?: string;
  /** Téléphone du payeur, prérempli */
  payer_phone?: string;
  /** Retour après paiement réussi `{CHECKOUT_SESSION_ID}` y est remplacé par l'identifiant de la session (`cs_…`) au retour du client. */
  success_url?: string;
  /** Retour si le client abandonne `{CHECKOUT_SESSION_ID}` y est remplacé par l'identifiant de la session (`cs_…`) au retour du client. */
  cancel_url?: string;
  /** Ne proposer que ces moyens. Par exemple `["mobile_money"]` si vous encaissez déjà la carte ailleurs. Absent : tous les moyens ouverts. */
  payment_method_types?: Array<"mobile_money" | "card">;
  /** Ne proposer que ces pays mobile money (codes à 3 lettres, pays ouverts uniquement). Absent : tous les pays ouverts. */
  allowed_countries?: CountryCode[];
  /** `hosted` (par défaut) : vous envoyez le client sur `checkout_url`. `embedded` : le formulaire de paiement s'affiche dans votre propre page, avec le `client_secret` renvoyé. Voir [Paiement intégré](/payments/embedded). */
  ui_mode?: "hosted" | "embedded";
  /** Vos données libres, renvoyées dans les réponses et les webhooks. */
  metadata?: Record<string, unknown>;
}

export interface ListCheckoutSessionsParams {
  /** Filtre par statut */
  status?: "created" | "pending_payment" | "completed" | "expired" | "cancelled";
  /** Créés à partir de cette date `AAAA-MM-JJ`, incluse */
  from?: string;
  /** Créés jusqu'à cette date `AAAA-MM-JJ`, incluse */
  to?: string;
  /** Nombre d'objets. Voir [Pagination](/developers/pagination) */
  limit?: number;
  /** Le `next_cursor` de la page précédente */
  starting_after?: string;
  /** Un id, pour la page qui le précède */
  ending_before?: string;
  created?: { gte?: string; lte?: string };
}

export interface GetCheckoutSessionParams {
}

export interface CreatePaymentParams {
  /** Montant en unités mineures, au moins `1`. Voir [Montants et devises](/payments/amounts-and-currencies). */
  amount: number;
  /** Code devise ISO 4217 de 3 lettres, par exemple `XAF`. En mobile money, convertie vers la devise de l'opérateur si besoin. */
  currency: string;
  /** Canal, `mobile_money` par défaut */
  payment_method?: "mobile_money" | "card";
  /** Obligatoire en mobile money. Pays ISO 3166-1 alpha-3, par exemple `CMR`. */
  country?: CountryCode;
  /** Obligatoire en mobile money. Code opérateur, par exemple `MTN_MOMO_CMR`. Voir [Pays et opérateurs](/payments/overview#pays-et-operateurs). */
  provider?: MobileMoneyProvider;
  /** Obligatoire en mobile money. Numéro avec indicatif, par exemple `237680000000`. Les espaces et le `+` sont retirés, un numéro local est complété avec l'indicatif du pays. */
  phone?: string;
  /** Nom du payeur */
  payer_name?: string;
  /** E-mail du payeur */
  payer_email?: string;
  /** 500 caractères maximum. Les 22 premiers, sans accents, forment le message que l'opérateur montre au client. */
  description?: string;
  /** Vos données libres (jusqu'à 50 clés, valeurs de 500 caractères au plus), renvoyées dans les réponses et les webhooks. Par exemple votre numéro de commande. */
  metadata?: Record<string, unknown>;
}

export interface ListPaymentsParams {
  /** Filtre par statut */
  status?: "pending" | "processing" | "succeeded" | "failed" | "canceled" | "expired" | "refunded" | "disputed";
  /** Créés à partir de cette date `AAAA-MM-JJ`, incluse */
  from?: string;
  /** Créés jusqu'à cette date `AAAA-MM-JJ`, incluse */
  to?: string;
  /** Nombre d'objets. Voir [Pagination](/developers/pagination) */
  limit?: number;
  /** Le `next_cursor` de la page précédente */
  starting_after?: string;
  /** Un id, pour la page qui le précède */
  ending_before?: string;
  /** Objets liés à recevoir en entier. Voir [Objets liés](/developers/expand) */
  expand?: string[];
  created?: { gte?: string; lte?: string };
}

export interface GetPaymentParams {
  /** Objets liés à recevoir en entier. Voir [Objets liés](/developers/expand) */
  expand?: string[];
}

export interface ListWalletsParams {
  /** Nombre d'objets. Voir [Pagination](/developers/pagination) */
  limit?: number;
  /** Le `next_cursor` de la page précédente */
  starting_after?: string;
  /** Un id, pour la page qui le précède */
  ending_before?: string;
  created?: { gte?: string; lte?: string };
}

export interface ListWalletTransfersParams {
  /** Nombre d'objets. Voir [Pagination](/developers/pagination) */
  limit?: number;
  /** Le `next_cursor` de la page précédente */
  starting_after?: string;
  /** Un id, pour la page qui le précède */
  ending_before?: string;
  created?: { gte?: string; lte?: string };
}

export interface CreateWalletTransferParams {
  /** Le solde à débiter (`wal_…`), voir [Lister les soldes](/api/wallets/list) */
  from_wallet: string;
  /** Le solde à créditer (`wal_…`) */
  to_wallet: string;
  /** En unités mineures */
  amount: number;
}

export interface CreatePayoutParams {
  /** Montant débité de votre solde, en unités mineures */
  amount: number;
  /** Devise du solde source. Code devise ISO 4217 de 3 lettres, par exemple `XAF`. */
  currency: string;
  /** Compte de retrait enregistré dans votre tableau de bord. Remplace `destination`. */
  destination_id?: string;
  /** Obligatoire sans `destination_id`. */
  destination?: { type: "mobile_money"; country: string; provider: string; phone: string };
  /** Vos données libres (jusqu'à 50 clés, valeurs de 500 caractères au plus), renvoyées dans les réponses et les webhooks. Par exemple votre numéro de commande. */
  metadata?: Record<string, unknown>;
}

export interface ListPayoutsParams {
  /** Filtre par statut */
  status?: "requested" | "approved" | "processing" | "paid" | "failed" | "rejected" | "canceled";
  /** Filtre par devise */
  currency?: string;
  /** Créés à partir de cette date `AAAA-MM-JJ`, incluse */
  from?: string;
  /** Créés jusqu'à cette date `AAAA-MM-JJ`, incluse */
  to?: string;
  /** Nombre d'objets. Voir [Pagination](/developers/pagination) */
  limit?: number;
  /** Le `next_cursor` de la page précédente */
  starting_after?: string;
  /** Un id, pour la page qui le précède */
  ending_before?: string;
  created?: { gte?: string; lte?: string };
}

export interface GetPayoutParams {
}

export interface CreatePaymentLinkParams {
  /** Titre affiché au client */
  title: string;
  /** Description */
  description?: string;
  /** Sans valeur : `fixed` si `amount` est fourni, sinon `flexible`. */
  pricing_mode?: "fixed" | "flexible" | "options" | "cart";
  /** Obligatoire en `fixed`. Prix en unités mineures. */
  amount?: number;
  /** Montant libre : minimum accepté */
  minimum_amount?: number;
  /** Obligatoire en `options`. Un tarif par élément. */
  price_options?: { id: number; label: string; amount: number }[];
  /** Obligatoire en `cart`. Un article par élément. */
  items?: { id: number; name: string; description: string; unit_amount: number; min_quantity: number; max_quantity: number; variants: { id: number; label: string; unit_amount: number }[] }[];
  /** Champs à remplir par le payeur. Renvoyés sous `custom_fields`. */
  custom_fields_schema?: CustomField[];
  /** Demande le téléphone du payeur */
  collect_phone?: boolean;
  /** Demande l'adresse du payeur */
  collect_address?: boolean;
  /** Affiché après un paiement réussi */
  after_payment_message?: string;
  /** Nombre de paiements au-delà duquel le lien s'arrête */
  max_uses?: number;
  /** Fin de validité, dans le futur */
  expires_at?: string;
  /** Retour après paiement réussi */
  success_url?: string;
  /** Retour si le client abandonne */
  cancel_url?: string;
  /** `true` par défaut. `false` : le lien n'accepte plus de paiement. */
  active?: boolean;
  /** Vos données libres, renvoyées telles quelles. 50 clés maximum, valeurs de 500 caractères maximum. */
  metadata?: Record<string, unknown> | null;
  /** `one_time` par défaut, ou `recurring` pour inscrire à un plan */
  type?: "one_time" | "recurring";
  /** Devise par défaut de votre compte si absente. Code devise ISO 4217 de 3 lettres, par exemple `XAF`. */
  currency?: string;
  /** Obligatoire en `recurring` : identifiant d'un plan actif (`plan_…`) */
  plan?: string;
}

export interface ListPaymentLinksParams {
  /** `true` ou `false` */
  active?: boolean;
  /** Type de lien */
  type?: "one_time" | "recurring";
  /** `true` pour ne lister que les liens archivés */
  archived?: boolean;
  /** Nombre d'objets. Voir [Pagination](/developers/pagination) */
  limit?: number;
  /** Le `next_cursor` de la page précédente */
  starting_after?: string;
  /** Un id, pour la page qui le précède */
  ending_before?: string;
  created?: { gte?: string; lte?: string };
}

export interface GetPaymentLinkParams {
}

export interface UpdatePaymentLinkParams {
  /** Titre affiché au client */
  title?: string;
  /** Description */
  description?: string;
  /** Sans valeur : `fixed` si `amount` est fourni, sinon `flexible`. */
  pricing_mode?: "fixed" | "flexible" | "options" | "cart";
  /** Obligatoire en `fixed`. Prix en unités mineures. */
  amount?: number;
  /** Montant libre : minimum accepté */
  minimum_amount?: number;
  /** Obligatoire en `options`. Un tarif par élément. */
  price_options?: { id: number; label: string; amount: number }[];
  /** Obligatoire en `cart`. Un article par élément. */
  items?: { id: number; name: string; description: string; unit_amount: number; min_quantity: number; max_quantity: number; variants: { id: number; label: string; unit_amount: number }[] }[];
  /** Champs à remplir par le payeur. Renvoyés sous `custom_fields`. */
  custom_fields_schema?: CustomField[];
  /** Demande le téléphone du payeur */
  collect_phone?: boolean;
  /** Demande l'adresse du payeur */
  collect_address?: boolean;
  /** Affiché après un paiement réussi */
  after_payment_message?: string;
  /** Nombre de paiements au-delà duquel le lien s'arrête */
  max_uses?: number;
  /** Fin de validité, dans le futur */
  expires_at?: string;
  /** Retour après paiement réussi */
  success_url?: string;
  /** Retour si le client abandonne */
  cancel_url?: string;
  /** `true` par défaut. `false` : le lien n'accepte plus de paiement. */
  active?: boolean;
  /** Vos données libres, renvoyées telles quelles. 50 clés maximum, valeurs de 500 caractères maximum. */
  metadata?: Record<string, unknown> | null;
}

export interface DeletePaymentLinkParams {
}

export interface ArchivePaymentLinkParams {
}

export interface ListPaymentLinkPaymentsParams {
  /** Statut des paiements, `succeeded` par défaut */
  status?: string;
  /** Nombre d'objets. Voir [Pagination](/developers/pagination) */
  limit?: number;
  /** Le `next_cursor` de la page précédente */
  starting_after?: string;
  /** Un id, pour la page qui le précède */
  ending_before?: string;
  created?: { gte?: string; lte?: string };
}

export interface CreatePlanParams {
  /** Nom affiché au client */
  name: string;
  /** Prix d'un cycle, en unités mineures */
  amount: number;
  /** Code devise ISO 4217 de 3 lettres, par exemple `XAF`. */
  currency: string;
  /** Rythme */
  interval: "daily" | "weekly" | "monthly" | "yearly";
  /** De 1 à 365, 1 par défaut. `monthly` et `3` : tous les 3 mois. */
  interval_count?: number;
  /** Jours d'essai, de 0 à 365 */
  trial_period_days?: number;
  /** Description */
  description?: string;
  /** Proposé aux abonnés dans leur espace client */
  portal_switchable?: boolean;
  /** Vos données libres, renvoyées telles quelles. 50 clés maximum, valeurs de 500 caractères maximum. */
  metadata?: Record<string, unknown> | null;
}

export interface ListPlansParams {
  /** Statut */
  status?: "active" | "archived";
  /** Nombre d'objets. Voir [Pagination](/developers/pagination) */
  limit?: number;
  /** Le `next_cursor` de la page précédente */
  starting_after?: string;
  /** Un id, pour la page qui le précède */
  ending_before?: string;
  created?: { gte?: string; lte?: string };
}

export interface GetPlanParams {
}

export interface UpdatePlanParams {
  /** Nom */
  name?: string;
  /** Description */
  description?: string | null;
  /** Proposé dans l'espace client */
  portal_switchable?: boolean;
  /** Vos données libres, renvoyées telles quelles. 50 clés maximum, valeurs de 500 caractères maximum. */
  metadata?: Record<string, unknown> | null;
}

export interface DeletePlanParams {
}

export interface ArchivePlanParams {
}

export interface RestorePlanParams {
}

export interface ListCustomersParams {
  /** Adresse exacte, sans tenir compte des majuscules */
  email?: string;
  /** Nombre d'objets. Voir [Pagination](/developers/pagination) */
  limit?: number;
  /** Le `next_cursor` de la page précédente */
  starting_after?: string;
  /** Un id, pour la page qui le précède */
  ending_before?: string;
  created?: { gte?: string; lte?: string };
}

export interface CreateCustomerParams {
  /** E-mail, unique par environnement */
  email: string;
  /** Nom */
  name?: string | null;
  /** Vos données libres (jusqu'à 50 clés, valeurs de 500 caractères au plus), renvoyées dans les réponses et les webhooks. Par exemple votre numéro de commande. */
  metadata?: Record<string, unknown>;
}

export interface GetCustomerParams {
}

export interface UpdateCustomerParams {
  /** E-mail, unique par environnement */
  email?: string;
  /** Nom */
  name?: string | null;
  /** Vos données libres (jusqu'à 50 clés, valeurs de 500 caractères au plus), renvoyées dans les réponses et les webhooks. Par exemple votre numéro de commande. */
  metadata?: Record<string, unknown>;
}

export interface DeleteCustomerParams {
}

export interface ListCustomerPaymentMethodsParams {
  /** Nombre d'objets. Voir [Pagination](/developers/pagination) */
  limit?: number;
  /** Le `next_cursor` de la page précédente */
  starting_after?: string;
  /** Un id, pour la page qui le précède */
  ending_before?: string;
  created?: { gte?: string; lte?: string };
}

export interface SetDefaultPaymentMethodParams {
}

export interface RemovePaymentMethodParams {
}

export interface CreateSubscriptionParams {
  /** Nom du client */
  customer_name: string;
  /** Reçoit les reçus, les rappels et l'accès à l'espace client */
  customer_email: string;
  /** Sans ce champ, le client choisit sur la page de paiement */
  payment_method?: "card" | "mobile_money";
  /** Numéro mobile money. Avec `payment_method: "mobile_money"`, la première demande part tout de suite sur ce téléphone. */
  customer_phone?: string;
  /** Avec `customer_phone`. Pays ISO 3166-1 alpha-3, par exemple `CMR`. */
  customer_country?: string;
  /** Avec `customer_phone`. Code opérateur, par exemple `MTN_MOMO_CMR`. Voir [Pays et opérateurs](/payments/overview#pays-et-operateurs). */
  customer_provider?: string;
  /** Nombre d'échéances avant l'arrêt, de 1 à 1000 */
  max_cycles?: number;
  /** Vos données libres, renvoyées telles quelles. 50 clés maximum, valeurs de 500 caractères maximum. */
  metadata?: Record<string, unknown> | null;
  /** Identifiant d'un de vos plans actifs (`plan_…`) */
  plan: string;
}

export interface ListSubscriptionsParams {
  /** Statut */
  status?: "incomplete" | "trialing" | "active" | "past_due" | "unpaid" | "paused" | "canceled";
  /** Adresse exacte du client */
  customer_email?: string;
  /** Identifiant d'un plan (`plan_…`) */
  plan?: string;
  /** Nombre d'objets. Voir [Pagination](/developers/pagination) */
  limit?: number;
  /** Le `next_cursor` de la page précédente */
  starting_after?: string;
  /** Un id, pour la page qui le précède */
  ending_before?: string;
  /** Objets liés à recevoir en entier. Voir [Objets liés](/developers/expand) */
  expand?: string[];
  created?: { gte?: string; lte?: string };
}

export interface GetSubscriptionParams {
  /** Objets liés à recevoir en entier. Voir [Objets liés](/developers/expand) */
  expand?: string[];
}

export interface UpdateSubscriptionParams {
  /** Pas en dessous de `cycles_billed`. `null` retire la limite. */
  max_cycles?: number | null;
  /** Nom du client */
  customer_name?: string;
  /** Nouveau numéro mobile money */
  customer_phone?: string;
  /** Pays ISO 3166-1 alpha-3, par exemple `CMR`. */
  customer_country?: string;
  /** Code opérateur, par exemple `MTN_MOMO_CMR`. Voir [Pays et opérateurs](/payments/overview#pays-et-operateurs). */
  customer_provider?: string;
  /** Remplace les métadonnées */
  metadata?: Record<string, unknown> | null;
  /** Nouveau plan (`plan_…`), même devise. Plus cher au même rythme : la différence au prorata est encaissée tout de suite et le plan change dès le paiement. Sinon : appliqué à la prochaine échéance. Renvoyer le plan actuel retire un changement prévu. */
  plan?: string;
}

export interface CancelSubscriptionParams {
  /** `true` : s'arrête à la fin de la période payée. Absent ou `false` : tout de suite, et les factures en attente sont annulées. */
  at_period_end?: boolean;
}

export interface ReactivateSubscriptionParams {
}

export interface AdvanceSubscriptionParams {
}

export interface PauseSubscriptionParams {
  /** Reprise automatique, dans le futur. Sans date, la pause dure jusqu'à `resume`. */
  resumes_at?: string;
}

export interface ResumeSubscriptionParams {
}

export interface ListSubscriptionInvoicesParams {
  /** Statut */
  status?: "pending" | "paid" | "failed" | "canceled";
  /** Nombre d'objets. Voir [Pagination](/developers/pagination) */
  limit?: number;
  /** Le `next_cursor` de la page précédente */
  starting_after?: string;
  /** Un id, pour la page qui le précède */
  ending_before?: string;
  /** Objets liés à recevoir en entier. Voir [Objets liés](/developers/expand) */
  expand?: string[];
  created?: { gte?: string; lte?: string };
}

export interface ListInvoicesParams {
  /** Statut */
  status?: "pending" | "paid" | "failed" | "canceled";
  /** Identifiant d'un abonnement (`sub_…`) */
  subscription?: string;
  /** Nombre d'objets. Voir [Pagination](/developers/pagination) */
  limit?: number;
  /** Le `next_cursor` de la page précédente */
  starting_after?: string;
  /** Un id, pour la page qui le précède */
  ending_before?: string;
  /** Objets liés à recevoir en entier. Voir [Objets liés](/developers/expand) */
  expand?: string[];
  created?: { gte?: string; lte?: string };
}

export interface GetInvoiceParams {
  /** Objets liés à recevoir en entier. Voir [Objets liés](/developers/expand) */
  expand?: string[];
}

export interface PayInvoiceParams {
}

export interface SendInvoiceParams {
}

export interface CreateBillingPortalSessionParams {
  /** Adresse d'un client qui a au moins un abonnement dans cet environnement */
  customer_email: string;
  /** Votre page, affichée en lien « Retour vers » suivi du nom de votre boutique */
  return_url?: string;
}

export interface ExpireCheckoutSessionParams {
}

export interface ListEventsParams {
  /** Un seul type, par exemple `payment.succeeded` */
  type?: string;
  /** Nombre d'objets */
  limit?: number;
  /** Le `next_cursor` de la page précédente */
  starting_after?: string;
  /** Un id, pour revenir à la page d'avant */
  ending_before?: string;
}

export interface GetEventParams {
}

export interface ListEventDeliveriesParams {
  /** Nombre d'objets. Voir [Pagination](/developers/pagination) */
  limit?: number;
  /** Le `next_cursor` de la page précédente */
  starting_after?: string;
  /** Un id, pour la page qui le précède */
  ending_before?: string;
}

export interface ListEmbedDomainsParams {
  /** Nombre d'objets */
  limit?: number;
  /** Le `next_cursor` de la page précédente */
  starting_after?: string;
  /** Un id, pour revenir à la page d'avant */
  ending_before?: string;
}

export interface CreateEmbedDomainParams {
  /** Le domaine de votre site, par exemple `boutique.com`. Un `https://` ou un chemin éventuels sont retirés. */
  hostname: string;
}

export interface GetEmbedDomainParams {
}

export interface DeleteEmbedDomainParams {
}

export interface VerifyEmbedDomainParams {
}

export interface ListWebhookEndpointsParams {
  /** Nombre d'objets */
  limit?: number;
  /** Le `next_cursor` de la page précédente */
  starting_after?: string;
  /** Un id, pour revenir à la page d'avant */
  ending_before?: string;
}

export interface CreateWebhookEndpointParams {
  /** URL publique en HTTPS de votre serveur */
  url: string;
  /** Les types d'événements à recevoir */
  events: string[];
  /** L'environnement de votre clé, ou `null` pour les deux. `null` demande une clé live : une clé sandbox ne gère que des endpoints sandbox, et c'est leur environnement par défaut. */
  environment?: "sandbox" | "live" | null;
}

export interface GetWebhookEndpointParams {
}

export interface UpdateWebhookEndpointParams {
  /** URL publique en HTTPS de votre serveur */
  url?: string;
  /** Les types d'événements à recevoir */
  events?: string[];
  /** L'environnement de votre clé, ou `null` pour les deux. `null` demande une clé live : une clé sandbox ne gère que des endpoints sandbox, et c'est leur environnement par défaut. */
  environment?: "sandbox" | "live" | null;
  status?: "enabled" | "disabled";
}

export interface DeleteWebhookEndpointParams {
}

export interface RotateWebhookEndpointSecretParams {
}

export interface TestWebhookEndpointParams {
}

export interface ResendEventParams {
  /** Identifiant de l'endpoint (`we_…`) */
  webhook_endpoint: string;
}

export interface ListRequestLogsParams {
  /** `success` (statut < 400) ou `error` (statut ≥ 400) */
  status?: "success" | "error";
  /** Une seule méthode HTTP */
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  /** Partie du chemin, par exemple `payments` */
  path?: string;
  /** Nombre d'objets */
  limit?: number;
  /** Le `next_cursor` de la page précédente */
  starting_after?: string;
  /** Un id, pour revenir à la page d'avant */
  ending_before?: string;
}

export interface CreateTestEventParams {
  /** Le type d'événement à déclencher. */
  type: "payment.succeeded" | "payment.failed" | "payment.refunded" | "payment.disputed" | "payment.dispute_closed" | "refund.succeeded" | "refund.failed" | "refund.canceled" | "payout.paid" | "payout.failed" | "payout.canceled" | "subscription.created" | "subscription.updated" | "subscription.past_due" | "subscription.unpaid" | "subscription.paused" | "subscription.resumed" | "subscription.canceled" | "invoice.created" | "invoice.upcoming" | "invoice.paid" | "invoice.canceled" | "invoice.payment_failed" | "checkout_session.completed" | "provider_status.changed" | "account.updated";
}

export interface CreateRefundParams {
  /** Montant à rendre, en unités mineures de la devise du paiement. Absent : tout ce qui reste à rendre. */
  amount?: number;
  /** Motif, gardé avec le remboursement. */
  reason?: string;
}

export interface ListRefundsParams {
  /** Seulement ceux d'un paiement (`pay_…`) */
  payment?: string;
  status?: "pending" | "processing" | "succeeded" | "failed" | "canceled";
}

export interface GetRefundParams {
}

export interface CancelRefundParams {
}

export interface ListTestMobileMoneyNumbersParams {
  /** Un seul pays, par exemple `CMR` */
  country?: CountryCode;
  /** Un seul opérateur, par exemple `MTN_MOMO_CMR` */
  provider?: MobileMoneyProvider;
}
