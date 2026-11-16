// Objects the API reference describes by example only. Written by hand.

import type { Wallet } from './types.js';

export interface Account {
  merchant: { uuid: string; name: string; status: string; kyc_status: string; default_currency: string; [field: string]: unknown };
  api_key: { environment: 'sandbox' | 'live'; key_prefix: string; [field: string]: unknown };
  wallets: Wallet[];
  [field: string]: unknown;
}

export interface FeeQuote {
  object: 'fee_quote';
  amount: number;
  currency: string;
  payment_method: 'mobile_money' | 'card';
  country: string | null;
  fee_paid_by: 'merchant' | 'customer';
  amount_customer_pays: number;
  charged_currency: string;
  fee_amount: number;
  net_amount: number;
  livemode: boolean;
  [field: string]: unknown;
}

export interface ProviderStatus {
  overall: string;
  overall_label: string;
  generated_at: string;
  stale: boolean;
  countries: Array<{
    code: string;
    label: string;
    status: string;
    operators: Array<{ code: string; label: string; status: string; [field: string]: unknown }>;
    [field: string]: unknown;
  }>;
  card: { label: string; status: string; [field: string]: unknown };
  [field: string]: unknown;
}
