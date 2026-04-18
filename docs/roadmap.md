# Bold WhatsApp Bot — Roadmap

Este roadmap serve para acompanhar o andamento real da implementação do bot, deixando claro o que já existe, o que está em andamento e o que ainda falta.

Legenda:
- [x] concluído
- [ ] pendente
- [~] parcialmente implementado / inicial

---

## 1. Fundação do projeto

- [x] criar diretório base do projeto
- [x] criar estrutura inicial de pastas
- [x] criar documentação inicial do projeto
- [x] criar `.env.example`
- [x] copiar `.env.example` para `.env`
- [x] criar `package.json`
- [x] criar `tsconfig.json`
- [x] instalar dependências iniciais
- [x] criar configuração do PM2 (`ecosystem.config.cjs`)
- [x] verificar disponibilidade do PM2 no servidor

---

## 2. Integração com WhatsApp Cloud API

- [x] mapear variáveis de ambiente principais da Cloud API
- [x] implementar `GET /webhook` para verificação da Meta
- [x] implementar `POST /webhook` para recebimento de eventos
- [x] preservar raw body no webhook
- [x] validar assinatura `x-hub-signature-256`
- [ ] implementar envio de mensagens via Cloud API
- [ ] tratar respostas de erro da API da Meta
- [ ] implementar retry/controlar falhas de envio

---

## 3. Backend base

- [x] criar endpoint `/health`
- [x] criar carregamento de ambiente com `dotenv`
- [x] criar utilitários de leitura/escrita JSON
- [x] criar serviço inicial de demandas
- [~] classificação simples baseada em texto
- [ ] separar parser de mensagens, status e outros eventos
- [ ] implementar idempotência para evitar processamento duplicado
- [ ] melhorar logging e rastreabilidade

---

## 4. Persistência de dados

- [x] criar `data/demands.json`
- [~] registrar mensagens recebidas como demandas iniciais
- [ ] criar `data/conversations.json`
- [ ] criar repositório de conversas
- [ ] criar repositório de demandas mais estruturado
- [ ] atualizar demandas existentes em vez de só adicionar novas
- [ ] consolidar histórico por contato

---

## 5. Produto conversacional

- [ ] implementar estado por conversa
- [ ] implementar menu inicial
- [ ] implementar fluxo de orçamento
- [ ] implementar fluxo de agendamento/disponibilidade
- [ ] implementar fluxo de dúvida
- [ ] implementar fluxo de falar com a equipe
- [ ] aceitar texto livre além de opção numérica
- [ ] implementar coleta de nome
- [ ] implementar coleta de empresa/projeto
- [ ] implementar coleta de cidade
- [ ] implementar coleta de data/período
- [ ] implementar coleta de resumo/contexto
- [ ] implementar mensagem final de handoff humano
- [ ] implementar reset/retomada de conversa

---

## 6. Registro operacional de demandas/tasks

- [~] criar registro bruto inicial em JSON
- [ ] transformar conversa em demanda estruturada completa
- [ ] criar/update de tasks por cliente
- [ ] atualizar status da demanda
- [ ] atribuir responsável interno
- [ ] suportar observações adicionais
- [ ] detectar urgência
- [ ] separar nova demanda de continuação da mesma demanda

---

## 7. Notificação interna

- [ ] definir canal interno principal
- [ ] implementar alerta de nova demanda
- [ ] implementar alerta de demanda urgente
- [ ] implementar resumo interno da triagem
- [ ] implementar formato padrão para handoff da equipe

---

## 8. Documentação

- [x] criar `docs/product.md`
- [x] criar `docs/whatsapp-cloud-api.md`
- [x] criar `docs/implementation-plan.md`
- [x] criar `docs/roadmap.md`
- [x] criar `docs/privacy-policy.md`
- [ ] criar `docs/conversation-flows.md`
- [ ] criar `docs/data-model.md`
- [ ] criar `docs/deployment.md`
- [ ] criar `docs/internal-operations.md`

---

## 9. Segurança e conformidade

- [x] validar verificação do webhook
- [x] validar assinatura da Meta
- [ ] minimizar retenção de dados sensíveis
- [ ] sanitizar logs
- [ ] documentar base legal/processamento interno
- [ ] revisar política de retenção de dados
- [ ] revisar necessidade de consentimento/mensagem inicial de transparência

---

## 10. Deploy e operação

- [x] preparar build TypeScript
- [x] preparar execução com PM2
- [ ] subir processo em produção
- [ ] testar endpoint público real
- [ ] conectar app da Meta ao endpoint de produção
- [ ] validar fluxo ponta a ponta com número de teste
- [ ] configurar restart no boot do servidor
- [ ] monitorar logs em produção

---

## 11. Melhorias futuras

- [ ] integrar Google Sheets
- [ ] integrar Airtable ou CRM
- [ ] usar IA para extração estruturada de campos
- [ ] transcrever áudio
- [ ] interpretar imagem/documento quando fizer sentido
- [ ] sugerir responsável automaticamente
- [ ] painel de acompanhamento das demandas
- [ ] métricas de atendimento e conversão

---

## 12. Estado atual resumido

### Já implementado
- base do projeto
- variáveis iniciais de ambiente
- webhook de entrada
- validação de assinatura
- persistência inicial em JSON
- build e execução com PM2 documentados
- documentação principal do projeto

### Em estágio inicial
- classificação simples das mensagens
- registro inicial de demanda

### Ainda falta para o V1 funcional
- respostas reais no WhatsApp
- estado de conversa
- fluxos guiados
- handoff humano completo
- atualização estruturada de demandas
- notificação interna
