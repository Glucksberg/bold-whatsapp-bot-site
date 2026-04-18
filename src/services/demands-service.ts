import path from 'node:path';
import { env } from '../config/env.js';
import { readJsonFile, writeJsonFile } from '../utils/file.js';

export type DemandType =
  | 'orcamento'
  | 'agendamento'
  | 'duvida'
  | 'falar-com-humano'
  | 'pos-atendimento'
  | 'parceria'
  | 'nao-classificado';

export type DemandStatus = 'novo' | 'triado' | 'encaminhado';

export type DemandRecord = {
  id: string;
  createdAt: string;
  customerName?: string;
  phone: string;
  company?: string;
  type: DemandType;
  summary: string;
  city?: string;
  desiredDate?: string;
  urgency?: 'baixa' | 'media' | 'alta';
  owner?: string;
  status: DemandStatus;
  source: 'whatsapp';
  rawMessage: unknown;
};

function classifyText(text: string): DemandType {
  const normalized = text.toLowerCase();
  if (normalized.includes('orçamento') || normalized.includes('orcamento')) return 'orcamento';
  if (normalized.includes('agenda') || normalized.includes('data') || normalized.includes('disponibilidade')) return 'agendamento';
  if (normalized.includes('humano') || normalized.includes('equipe') || normalized.includes('atendente')) return 'falar-com-humano';
  if (normalized.includes('suporte') || normalized.includes('problema') || normalized.includes('retorno')) return 'pos-atendimento';
  if (normalized.includes('parceria') || normalized.includes('comercial')) return 'parceria';
  if (normalized.trim()) return 'duvida';
  return 'nao-classificado';
}

export async function appendIncomingDemand(params: {
  phone: string;
  text: string;
  rawMessage: unknown;
}) {
  const filePath = path.resolve(process.cwd(), env.demandsJsonPath);
  const rows = await readJsonFile<DemandRecord[]>(filePath, []);

  const record: DemandRecord = {
    id: `BOLD-${Date.now()}`,
    createdAt: new Date().toISOString(),
    phone: params.phone,
    type: classifyText(params.text),
    summary: params.text || 'Mensagem sem texto',
    status: 'novo',
    source: 'whatsapp',
    rawMessage: params.rawMessage
  };

  rows.push(record);
  await writeJsonFile(filePath, rows);
  return record;
}
