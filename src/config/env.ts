import dotenv from 'dotenv';

dotenv.config();

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
  verifyToken: required('WHATSAPP_VERIFY_TOKEN', 'change-me-verify-token'),
  accessToken: required('WHATSAPP_ACCESS_TOKEN', 'change-me-access-token'),
  phoneNumberId: required('WHATSAPP_PHONE_NUMBER_ID', 'change-me-phone-number-id'),
  businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID ?? '',
  appId: process.env.WHATSAPP_APP_ID ?? '',
  appSecret: process.env.WHATSAPP_APP_SECRET ?? '',
  apiVersion: process.env.WHATSAPP_API_VERSION ?? 'v23.0',
  businessName: process.env.BUSINESS_NAME ?? 'Bold',
  demandsJsonPath: process.env.DEMANDS_JSON_PATH ?? './data/demands.json'
};
