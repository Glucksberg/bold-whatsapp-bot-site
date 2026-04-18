# WhatsApp Cloud API — Variáveis principais

Variáveis normalmente necessárias segundo a documentação da WhatsApp Cloud API / Meta:

- `WHATSAPP_VERIFY_TOKEN` → token usado no desafio do webhook
- `WHATSAPP_ACCESS_TOKEN` → token para chamadas Graph API
- `WHATSAPP_PHONE_NUMBER_ID` → ID do número conectado
- `WHATSAPP_BUSINESS_ACCOUNT_ID` → ID da conta WhatsApp Business
- `WHATSAPP_APP_ID` → ID do app Meta
- `WHATSAPP_APP_SECRET` → segredo do app Meta
- `WHATSAPP_API_VERSION` → versão da Graph API, ex: `v23.0`

## Endpoint típico de envio
`https://graph.facebook.com/{version}/{phone-number-id}/messages`

## Webhook
A Meta chama um endpoint seu com:
- verificação GET com `hub.mode`, `hub.verify_token`, `hub.challenge`
- eventos POST com mensagens e status

## Assinatura
Recomendado validar `x-hub-signature-256` usando `APP_SECRET`.
