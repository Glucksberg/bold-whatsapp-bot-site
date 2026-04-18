import crypto from 'node:crypto';

export function verifyMetaSignature(params: {
  appSecret?: string;
  rawBody?: Buffer;
  signatureHeader?: string;
}) {
  const { appSecret, rawBody, signatureHeader } = params;

  if (!appSecret) {
    return { ok: false, reason: 'missing-app-secret' };
  }

  if (!rawBody) {
    return { ok: false, reason: 'missing-raw-body' };
  }

  if (!signatureHeader) {
    return { ok: false, reason: 'missing-signature-header' };
  }

  const [algo, expected] = signatureHeader.split('=');
  if (algo !== 'sha256' || !expected) {
    return { ok: false, reason: 'invalid-signature-format' };
  }

  const digest = crypto
    .createHmac('sha256', appSecret)
    .update(rawBody)
    .digest('hex');

  const expectedBuffer = Buffer.from(expected, 'hex');
  const digestBuffer = Buffer.from(digest, 'hex');

  if (expectedBuffer.length !== digestBuffer.length) {
    return { ok: false, reason: 'signature-length-mismatch' };
  }

  const ok = crypto.timingSafeEqual(expectedBuffer, digestBuffer);
  return ok ? { ok: true } : { ok: false, reason: 'signature-mismatch' };
}
