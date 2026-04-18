import { Request, Response } from 'express';
import { env } from '../config/env.js';
import { appendIncomingDemand } from '../services/demands-service.js';
import { verifyMetaSignature } from '../utils/meta-signature.js';

type RawBodyRequest = Request & { rawBody?: Buffer };

export function verifyWebhook(req: Request, res: Response) {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === env.verifyToken) {
    return res.status(200).send(challenge);
  }

  return res.status(403).json({ ok: false, error: 'Invalid verify token' });
}

export async function receiveWebhook(req: RawBodyRequest, res: Response) {
  try {
    const signatureHeader = req.header('x-hub-signature-256') ?? undefined;
    const signatureCheck = verifyMetaSignature({
      appSecret: env.appSecret || undefined,
      rawBody: req.rawBody,
      signatureHeader
    });

    if (!signatureCheck.ok) {
      return res.status(401).json({ ok: false, error: 'Invalid signature', reason: signatureCheck.reason });
    }

    const body = req.body;
    const entries = body?.entry ?? [];

    for (const entry of entries) {
      for (const change of entry.changes ?? []) {
        const value = change.value;
        const messages = value?.messages ?? [];

        for (const message of messages) {
          const from = message.from ?? 'unknown';
          const text = message.text?.body ?? '';

          await appendIncomingDemand({
            phone: from,
            text,
            rawMessage: message
          });
        }
      }
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('receiveWebhook error', error);
    return res.status(500).json({ ok: false });
  }
}
