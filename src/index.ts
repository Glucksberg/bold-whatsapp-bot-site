import express from 'express';
import { env } from './config/env.js';
import { receiveWebhook, verifyWebhook } from './handlers/webhook-handler.js';

const app = express();

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'bold-whatsapp-bot' });
});

app.get('/webhook', verifyWebhook);
app.post(
  '/webhook',
  express.json({
    limit: '2mb',
    verify: (req, _res, buf) => {
      (req as express.Request & { rawBody?: Buffer }).rawBody = Buffer.from(buf);
    }
  }),
  receiveWebhook
);

app.listen(env.port, () => {
  console.log(`Bold WhatsApp Bot listening on port ${env.port}`);
});
