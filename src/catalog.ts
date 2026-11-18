// Généré par scripts/generate.py depuis le catalogue Mercy Pay. Ne pas modifier à la main.

/** The open countries and their mobile money operators. */
export const COUNTRIES = [
  {
    "code": "CMR",
    "name": "Cameroun",
    "currency": "XAF",
    "providers": [
      {
        "code": "MTN_MOMO_CMR",
        "name": "MTN Mobile Money"
      },
      {
        "code": "ORANGE_CMR",
        "name": "Orange Money"
      }
    ]
  },
  {
    "code": "COG",
    "name": "Congo",
    "currency": "XAF",
    "providers": [
      {
        "code": "MTN_MOMO_COG",
        "name": "MTN Mobile Money"
      },
      {
        "code": "AIRTEL_COG",
        "name": "Airtel Money"
      }
    ]
  },
  {
    "code": "GAB",
    "name": "Gabon",
    "currency": "XAF",
    "providers": [
      {
        "code": "AIRTEL_GAB",
        "name": "Airtel Money"
      },
      {
        "code": "MOOV_GAB",
        "name": "Moov Money"
      }
    ]
  },
  {
    "code": "BEN",
    "name": "Bénin",
    "currency": "XOF",
    "providers": [
      {
        "code": "MTN_MOMO_BEN",
        "name": "MTN Mobile Money"
      },
      {
        "code": "MOOV_BEN",
        "name": "Moov Money"
      }
    ]
  },
  {
    "code": "CIV",
    "name": "Côte d'Ivoire",
    "currency": "XOF",
    "providers": [
      {
        "code": "MTN_MOMO_CIV",
        "name": "MTN Mobile Money"
      },
      {
        "code": "ORANGE_CIV",
        "name": "Orange Money"
      },
      {
        "code": "MOOV_CIV",
        "name": "Moov Money"
      }
    ]
  },
  {
    "code": "SEN",
    "name": "Sénégal",
    "currency": "XOF",
    "providers": [
      {
        "code": "FREE_SEN",
        "name": "Free Money"
      },
      {
        "code": "ORANGE_SEN",
        "name": "Orange Money"
      }
    ]
  },
  {
    "code": "COD",
    "name": "RD Congo",
    "currency": "CDF",
    "providers": [
      {
        "code": "VODACOM_MPESA_COD",
        "name": "M-Pesa"
      },
      {
        "code": "AIRTEL_COD",
        "name": "Airtel Money"
      },
      {
        "code": "ORANGE_COD",
        "name": "Orange Money"
      }
    ]
  },
  {
    "code": "RWA",
    "name": "Rwanda",
    "currency": "RWF",
    "providers": [
      {
        "code": "AIRTEL_RWA",
        "name": "Airtel Money"
      },
      {
        "code": "MTN_MOMO_RWA",
        "name": "MTN Mobile Money"
      }
    ]
  },
  {
    "code": "SLE",
    "name": "Sierra Leone",
    "currency": "SLE",
    "providers": [
      {
        "code": "ORANGE_SLE",
        "name": "Orange Money"
      }
    ]
  },
  {
    "code": "UGA",
    "name": "Ouganda",
    "currency": "UGX",
    "providers": [
      {
        "code": "AIRTEL_OAPI_UGA",
        "name": "Airtel Money"
      },
      {
        "code": "MTN_MOMO_UGA",
        "name": "MTN Mobile Money"
      }
    ]
  },
  {
    "code": "ZMB",
    "name": "Zambie",
    "currency": "ZMW",
    "providers": [
      {
        "code": "MTN_MOMO_ZMB",
        "name": "MTN Mobile Money"
      },
      {
        "code": "AIRTEL_OAPI_ZMB",
        "name": "Airtel Money"
      },
      {
        "code": "ZAMTEL_ZMB",
        "name": "Zamtel Money"
      }
    ]
  },
  {
    "code": "KEN",
    "name": "Kenya",
    "currency": "KES",
    "providers": [
      {
        "code": "MPESA_KEN",
        "name": "M-Pesa"
      }
    ]
  },
  {
    "code": "MOZ",
    "name": "Mozambique",
    "currency": "MZN",
    "providers": [
      {
        "code": "VODACOM_MOZ",
        "name": "M-Pesa"
      }
    ]
  }
] as const;

/** A mobile money operator code. Any other string stays accepted: the list grows. */
export type MobileMoneyProvider = "MTN_MOMO_CMR" | "ORANGE_CMR" | "MTN_MOMO_COG" | "AIRTEL_COG" | "AIRTEL_GAB" | "MOOV_GAB" | "MTN_MOMO_BEN" | "MOOV_BEN" | "MTN_MOMO_CIV" | "ORANGE_CIV" | "MOOV_CIV" | "FREE_SEN" | "ORANGE_SEN" | "VODACOM_MPESA_COD" | "AIRTEL_COD" | "ORANGE_COD" | "AIRTEL_RWA" | "MTN_MOMO_RWA" | "ORANGE_SLE" | "AIRTEL_OAPI_UGA" | "MTN_MOMO_UGA" | "MTN_MOMO_ZMB" | "AIRTEL_OAPI_ZMB" | "ZAMTEL_ZMB" | "MPESA_KEN" | "VODACOM_MOZ" | (string & {});

/** A country code (ISO 3166-1 alpha-3). Any other string stays accepted: the list grows. */
export type CountryCode = "CMR" | "COG" | "GAB" | "BEN" | "CIV" | "SEN" | "COD" | "RWA" | "SLE" | "UGA" | "ZMB" | "KEN" | "MOZ" | (string & {});

/** Every webhook event type. */
export const EVENT_TYPES = ["payment.succeeded", "payment.failed", "payment.refunded", "payment.disputed", "payment.dispute_closed", "refund.succeeded", "refund.failed", "refund.canceled", "payout.paid", "payout.failed", "payout.canceled", "subscription.created", "subscription.updated", "subscription.past_due", "subscription.unpaid", "subscription.paused", "subscription.resumed", "subscription.canceled", "invoice.created", "invoice.upcoming", "invoice.paid", "invoice.canceled", "invoice.payment_failed", "checkout_session.completed", "provider_status.changed", "account.updated"] as const;

export type EventType = (typeof EVENT_TYPES)[number];
