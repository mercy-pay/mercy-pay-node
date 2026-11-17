# Journal des changements

## 0.2.0 (17 novembre 2026)

- Nouveau : `mercyPay.embedDomains`, pour les sites autorisés à afficher le paiement intégré.
- Les sessions de paiement acceptent `ui_mode: "embedded"` et renvoient un `client_secret` typé. Voir le [paiement intégré](https://docs.mercy-pay.com/payments/embedded).
- Les webhooks sont décrits dans la référence de l'API.

## 0.1.0 (16 novembre 2026)

- Première version : client typé pour toute l'API v1, pagination, erreurs typées, nouvelles tentatives et vérification des webhooks.
