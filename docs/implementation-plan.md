# Bold WhatsApp Bot — Plano Completo de Implementação

## 1. Visão geral

Este projeto implementa um atendente inicial no WhatsApp da Bold com foco em:

- recepcionar novos contatos
- entender o motivo do contato
- fazer triagem inicial
- registrar demandas de forma estruturada
- encaminhar para atendimento humano
- manter uma lista atualizada de tasks/demandas

O objetivo do V1 **não** é substituir a equipe comercial/operacional. O objetivo é reduzir atrito no primeiro contato, organizar a entrada das demandas e garantir que nada se perca.

---

## 2. Objetivo do produto

Criar um bot de triagem para o WhatsApp da Bold que:

1. responda rapidamente ao cliente
2. identifique a intenção principal
3. colete os dados mínimos necessários
4. crie ou atualize uma demanda/task
5. informe que um humano dará continuidade
6. permita acompanhamento interno do status da solicitação

---

## 3. Escopo funcional

### 3.1 O bot faz

- recepção automática da primeira mensagem
- classificação da intenção do cliente
- perguntas curtas e objetivas
- coleta de dados essenciais
- criação de registro estruturado da demanda
- atualização de demanda já existente quando a conversa continua
- confirmação de encaminhamento para humano
- registro do histórico mínimo da interação

### 3.2 O bot não faz

- fechamento de venda
- negociação comercial complexa
- promessas de prazo sem confirmação humana
- confirmação final de agenda
- tomada de decisão operacional crítica
- substituição do atendimento humano

---

## 4. Premissas de negócio

Com base no que foi alinhado com Pedro:

- o bot será um **atendente inicial**
- o fluxo principal é **triagem + registro**
- sempre haverá **handoff humano**
- o bot precisa alimentar uma **lista atualizada de demandas/tasks**
- o sistema deve funcionar com o número oficial da empresa
- a integração deve seguir o caminho oficial via **WhatsApp Business Platform / Meta**

---

## 5. Fluxos principais de atendimento

### 5.1 Menu inicial do bot

Mensagem sugerida:

> Olá! Seja bem-vindo à Bold 🚀  
> Posso fazer seu atendimento inicial por aqui.  
> Me diz rapidinho qual opção mais combina com o que você precisa:
> 1. Orçamento
> 2. Agendamento / data
> 3. Tirar uma dúvida
> 4. Falar com a equipe

O sistema também deve aceitar texto livre, sem depender exclusivamente de resposta numérica.

---

### 5.2 Fluxo: Orçamento

Objetivo: captar contexto mínimo para um orçamento ou briefing inicial.

Campos esperados:
- nome
- empresa/projeto
- tipo de vídeo
- cidade
- prazo/data desejada
- resumo do que precisa

Mensagem final sugerida:

> Perfeito. Já registrei sua solicitação de orçamento e encaminhei para a equipe da Bold. Em breve um responsável continua com você por aqui.

---

### 5.3 Fluxo: Agendamento / disponibilidade

Objetivo: entender se o cliente quer verificar agenda, reservar data ou alinhar disponibilidade.

Campos esperados:
- nome
- empresa/projeto
- data ou período desejado
- cidade
- tipo de demanda/captação
- observações adicionais

Mensagem final sugerida:

> Perfeito. Já registrei sua solicitação de agendamento/disponibilidade e encaminhei para a equipe da Bold. Em breve alguém continua com você por aqui.

---

### 5.4 Fluxo: Dúvida

Objetivo: registrar uma dúvida geral e direcionar para humano.

Campos esperados:
- nome
- empresa/projeto (se aplicável)
- descrição da dúvida

Mensagem final sugerida:

> Perfeito. Já registrei sua dúvida e encaminhei internamente para a equipe da Bold. Em breve alguém te responde por aqui.

---

### 5.5 Fluxo: Falar com a equipe

Objetivo: acelerar o encaminhamento humano.

Campos esperados:
- nome
- assunto
- contexto breve

Mensagem final sugerida:

> Perfeito. Já registrei seu contato e avisei a equipe da Bold. Em breve alguém continua com você por aqui.

---

## 6. Tipos de demanda

Sugestão inicial de enumeração:

- `orcamento`
- `agendamento`
- `duvida`
- `falar-com-humano`
- `pos-atendimento`
- `parceria`
- `nao-classificado`

No futuro, é possível ampliar para:
- financeiro
- suporte de projeto
- regravação / revisão
- entrega de material
- recrutamento / vagas

---

## 7. Modelo de dados

### 7.1 Estrutura de demanda

Campos mínimos recomendados:

- `id`
- `createdAt`
- `updatedAt`
- `channel`
- `customerName`
- `phone`
- `company`
- `type`
- `summary`
- `city`
- `desiredDate`
- `urgency`
- `owner`
- `status`
- `conversationState`
- `notes`
- `rawMessages`

### 7.2 Status sugeridos

- `novo`
- `triagem-em-andamento`
- `triado`
- `encaminhado`
- `em-atendimento`
- `concluido`
- `sem-resposta`
- `cancelado`

### 7.3 Urgência

- `baixa`
- `media`
- `alta`

---

## 8. Controle de estado da conversa

O bot precisa manter estado por número/contato.

### 8.1 Estados sugeridos

- `idle`
- `awaiting-menu-choice`
- `awaiting-name`
- `awaiting-company`
- `awaiting-city`
- `awaiting-date`
- `awaiting-summary`
- `awaiting-question`
- `handoff-complete`

### 8.2 Requisitos

- cada cliente deve ter um estado ativo
- mensagens novas devem atualizar esse estado
- caso o cliente fique parado e volte depois, o sistema deve conseguir retomar
- deve haver possibilidade futura de timeout/reset de sessão

---

## 9. Comportamento conversacional

### 9.1 Regras de linguagem

O bot deve ser:

- cordial
- objetivo
- claro
- profissional
- humano

Evitar:
- respostas longas demais
- linguagem excessivamente robótica
- promessas sem confirmação
- aparência de autonomia total

### 9.2 Regras de negócio no atendimento

- sempre informar que um humano seguirá o atendimento
- nunca fingir disponibilidade confirmada
- nunca negociar preço
- sempre registrar a demanda antes do encerramento da triagem
- se não entender, pedir esclarecimento curto
- se o cliente mandar várias demandas, registrar de forma organizada

---

## 10. Arquitetura técnica

### 10.1 Camadas sugeridas

- **Webhook / API**
  - recebe eventos da Meta
  - responde verificação
  - valida assinatura

- **Parser de eventos**
  - separa mensagens recebidas
  - ignora status de entrega
  - normaliza tipos de mensagem

- **Gerenciador de conversa**
  - identifica estado da conversa
  - decide próxima pergunta
  - define quando encerrar triagem

- **Serviço de demandas**
  - cria ou atualiza registros
  - consolida campos
  - controla status

- **Serviço de envio de mensagens**
  - envia resposta via WhatsApp Cloud API
  - trata erros e retries básicos

- **Canal interno de notificação**
  - alerta equipe sobre nova demanda
  - pode usar Telegram, planilha, email ou outro meio

---

## 11. Estrutura de pastas recomendada

```text
src/
  config/
  handlers/
  services/
  prompts/
  utils/
  types/
  repositories/
  flows/
  integrations/
  middleware/

data/
  demands.json
  conversations.json

docs/
  product.md
  whatsapp-cloud-api.md
  implementation-plan.md
```

### Novas pastas recomendadas

- `flows/` → regras dos fluxos de menu e triagem
- `repositories/` → persistência de demandas e conversas
- `integrations/` → WhatsApp, Sheets, notificações internas
- `middleware/` → segurança, logging, validação
- `types/` → tipos compartilhados

---

## 12. Integrações

### 12.1 WhatsApp Cloud API

Variáveis relevantes:
- `WHATSAPP_VERIFY_TOKEN`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_BUSINESS_ACCOUNT_ID`
- `WHATSAPP_APP_ID`
- `WHATSAPP_APP_SECRET`
- `WHATSAPP_API_VERSION`

### 12.2 Armazenamento inicial

Fase 1:
- JSON local (`data/demands.json`)
- JSON local para estado de conversa (`data/conversations.json`)

Fase 2:
- Google Sheets ou Airtable para acompanhamento operacional

Fase 3:
- banco relacional ou backend próprio

### 12.3 Notificação interna

Possibilidades:
- grupo interno no Telegram
- canal interno em outro mensageiro
- email
- painel próprio

---

## 13. Segurança

### 13.1 Implementado

- verificação do token do webhook
- validação da assinatura `x-hub-signature-256`

### 13.2 Recomendado para próxima fase

- logging com sanitização de dados sensíveis
- rate limiting básico
- tratamento robusto de erros
- validação de payload
- idempotência de eventos
- segregação entre mensagens e status de entrega
- proteção contra processamento duplicado

---

## 14. Roadmap de implementação

### Fase 0 — base técnica
Status: **já iniciada**

- [x] estrutura de projeto
- [x] `.env.example`
- [x] webhook GET/POST
- [x] validação de assinatura da Meta
- [x] persistência inicial em JSON
- [x] classificação simples

### Fase 1 — triagem conversacional

- [ ] estado por conversa
- [ ] menu inicial
- [ ] perguntas guiadas por tipo de demanda
- [ ] armazenamento estruturado por fluxo
- [ ] mensagem final de handoff
- [ ] atualização de demandas existentes

### Fase 2 — operação interna

- [ ] notificação da equipe
- [ ] roteamento por responsável
- [ ] atualização de status
- [ ] filtro entre demanda nova e atualização de demanda antiga

### Fase 3 — robustez

- [ ] separar mensagens de cliente e status da Meta
- [ ] idempotência
- [ ] logs melhores
- [ ] retries e tratamento de falha na API de envio
- [ ] persistência mais confiável

### Fase 4 — inteligência adicional

- [ ] resumo automático melhor
- [ ] extração de campos com IA
- [ ] transcrição de áudio
- [ ] suporte a imagem/contexto
- [ ] categorização mais precisa

---

## 15. Ordem recomendada de execução

1. implementar estado de conversa
2. implementar menu inicial
3. implementar fluxos guiados
4. implementar envio de mensagem via Cloud API
5. implementar handoff final
6. implementar `conversations.json`
7. implementar notificação interna
8. melhorar classificação/extração de campos
9. integrar com Sheets
10. preparar deploy estável em PM2

---

## 16. Critérios de pronto para o V1

O V1 será considerado pronto quando:

- o webhook receber mensagens reais do WhatsApp
- o bot responder automaticamente ao cliente
- o bot conduzir o cliente por um fluxo simples
- o sistema registrar uma demanda estruturada
- o sistema marcar a demanda para atendimento humano
- a equipe conseguir visualizar ou receber aviso da nova demanda

---

## 17. Próximos arquivos a criar

Sugestão objetiva de próximos artefatos:

- `docs/conversation-flows.md`
- `docs/data-model.md`
- `src/flows/triage-flow.ts`
- `src/repositories/conversation-repository.ts`
- `src/repositories/demand-repository.ts`
- `src/services/whatsapp-service.ts`
- `data/conversations.json`

---

## 18. Resumo executivo

O projeto já possui a base para receber eventos com segurança.

O próximo grande passo não é mais infraestrutura, e sim **produto conversacional**:
- responder
- conduzir
- registrar
- encaminhar

Em outras palavras:

**A base do encanamento já existe. Agora falta construir o atendente de verdade.**
