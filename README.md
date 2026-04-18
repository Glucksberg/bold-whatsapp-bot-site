# Bold WhatsApp Bot

Atendente inicial da Bold para WhatsApp.

## Objetivo do V1
- recepcionar leads/clientes
- classificar a intenção
- coletar dados mínimos
- registrar demanda
- encaminhar para humano

## Escopo acordado
- triagem inicial
- registro de demandas/tasks
- handoff humano obrigatório
- sem negociação/autonomia comercial completa

## Estrutura
- `src/config` → leitura e validação de ambiente
- `src/handlers` → webhook/meta handlers
- `src/services` → WhatsApp, IA, registro de demandas
- `src/prompts` → prompts de triagem
- `src/utils` → helpers
- `data` → armazenamento local inicial
- `docs` → documentação funcional/técnica

## Próximos passos
1. configurar app no Meta for Developers
2. preencher `.env`
3. implementar webhook de verificação e recebimento
4. implementar classificador de intenção
5. implementar persistência das demandas
6. integrar notificação interna
