# Plano do recorte — criar o site institucional da Brimajor com animações e modelos 3D, mapa de cursos e treinamentos de IA lido de um banco Neon, contato e inscrição pelo WhatsApp, deploy na Render

- **Modo:** `deliver_slice` · **natureza:** `greenfield` · **trilha:** `standard` · **gate final:** `Gate 5C`
- **Sinais:** has_ai, has_db, has_deploy, has_ui · **segurança:** baseline · **piso de complexidade:** medium
- **Perfil:** `essential` — decisões humanas em: Gate 2, Gate 5A
- **Confiança do roteamento:** baixa

## Especialistas sugeridos

- `ENG-08` Database & Persistence — pontuação 32.43 (banco)
- `ENG-11` AI & LLM Applications — pontuação 31.49 (ia)
- `REL-05` Deployment & Distribution — pontuação 29.71 (deploy)
- `ENG-01` Web Frontend — pontuação 25.0 (site)
- `DATA-02` Data Science — pontuação 17.5 (ia)

## Guardiões de qualidade

- **Segurança** (baseline) · agente `squad-security-reviewer` · padrão `standards/security.md` · motivo: has_db, has_deploy, has_ai
- **Arquitetura e resiliência** (deep) · agente `squad-architecture-reviewer` · padrão `standards/engineering-practices.md` · motivo: has_db
- **Release e operação** (deep) · agente `squad-release-reviewer` · padrão `standards/engineering-practices.md` · motivo: has_deploy
- **UX e acessibilidade** (deep) · agente `squad-ux-reviewer` · padrão `standards/ux-accessibility.md` · motivo: has_ui
- **Clean code e arquitetura** (baseline) · agente `squad-code-reviewer` · padrão `standards/clean-code.md` · motivo: código alterado
- **Testes** (baseline) · agente `squad-test-reviewer` · padrão `standards/testing.md` · motivo: código alterado

## Gate 0 — Enquadramento

Saída: `framing` · aprovação: 📎 evidência registrada

| Tarefa | O que | Trinca · agente | Especialistas | Depende de |
|---|---|---|---|---|
| `G0-ENQUADRAR` | Enquadrar: objetivo observável, escopo, fora de escopo, restrições e critério de encerramento | orchestrator · `sdlc-s` | PM-02 | — |

## Gate 1 — Definição

Saída: `requirements` · aprovação: 📎 evidência registrada

| Tarefa | O que | Trinca · agente | Especialistas | Depende de |
|---|---|---|---|---|
| `G1-REQUISITOS` | Levantar requisitos e regras rastreáveis (RF/RN/RT) com fonte | specifier · `squad-specifier` | BA-02 | G0-ENQUADRAR |
| `G1-SOLUCAO` | Propor solução candidata e alternativas, com trade-offs | specifier · `squad-specifier` | ARC-01 | G1-REQUISITOS |
| `G1-JORNADA` | Desenhar a jornada: fluxo principal, alternativos e exceções | specifier · `squad-specifier` | UX-03 | G1-REQUISITOS |

## Gate 2 — Especificação pronta

Saída: `spec`, `bdd`, `test-plan`, `ux-spec` · aprovação: 👤 decisão humana

| Tarefa | O que | Trinca · agente | Especialistas | Depende de |
|---|---|---|---|---|
| `G2-ESPECIFICAR` | Escrever o contrato implementável e os cenários BDD (tríade com @id) | specifier · `squad-specifier` | BA-04, ENG-08, ENG-11, ENG-01 | G1-REQUISITOS, G1-SOLUCAO, G1-JORNADA |
| `G2-PLANO-TESTES` | Definir níveis de teste, casos negativos e metas de cobertura/mutação | specifier · `squad-specifier` | QA-01 | G2-ESPECIFICAR |
| `G2-UX` | Especificar interface: estados, conteúdo, responsividade e acessibilidade | specifier · `squad-specifier` | UX-04, UX-06, UX-05 | G2-ESPECIFICAR |
| `G2-RISCO` | Classificar o risco com evidência e submeter a especificação à decisão humana | orchestrator · `sdlc-s` | — | G2-ESPECIFICAR, G2-PLANO-TESTES, G2-UX |

## Gate 3 — Construção verificada

Saída: `quality-report` · aprovação: ✅ quality gate

| Tarefa | O que | Trinca · agente | Especialistas | Depende de |
|---|---|---|---|---|
| `G3-CONSTRUIR` | Implementar o escopo aprovado com os testes (inclusive cenários não aceitos) | executor · `squad-executor` | ENG-08, ENG-11, ENG-01, QA-08 | G2-RISCO |
| `G3-REVISAR-CODIGO` | Revisar clean code, fronteiras e dívida introduzida | validator · `squad-code-reviewer` | ENG-12, ARC-08 | G3-CONSTRUIR |
| `G3-QUALIDADE` | Rodar o quality gate (estágio build) e registrar o relatório | orchestrator · `sdlc-s` | — | G3-REVISAR-CODIGO |

## Gate 4 — Validação da versão

Saída: `quality-report`, `validation-report`, `ux-review` · aprovação: ✅ quality gate

| Tarefa | O que | Trinca · agente | Especialistas | Depende de |
|---|---|---|---|---|
| `G4-VALIDAR` | Validar a versão contra a especificação e o BDD, com evidências | validator · `squad-validator` | QA-02, QA-09 | G3-QUALIDADE |
| `G4-SEGURANCA` | Revisar segurança: ameaças, controles, segredos e dependências | validator · `squad-security-reviewer` | ARC-10, OPS-04, OPS-03, OPS-10, QA-07 | G3-QUALIDADE |
| `G4-ARQUITETURA` | Revisar arquitetura e resiliência: integrações, dados, falhas e acoplamento | validator · `squad-architecture-reviewer` | ARC-08, ARC-03, ARC-04, ARC-06 | G3-QUALIDADE |
| `G4-RELEASE` | Revisar prontidão de release e operação: pipeline, implantação, observabilidade e reversão | validator · `squad-release-reviewer` | REL-04, REL-03, OPS-02, OPS-06, OPS-07 | G3-QUALIDADE |
| `G4-UX` | Revisar UX e acessibilidade da interface construída | validator · `squad-ux-reviewer` | UX-06, UX-04, UX-03, UX-05, QA-04 | G3-QUALIDADE |
| `G4-TESTES` | Revisar a suíte: cobertura, casos negativos e mutação | validator · `squad-test-reviewer` | QA-01, QA-02, QA-08, QA-09 | G3-QUALIDADE |
| `G4-QUALIDADE` | Rodar o quality gate (estágio release) sobre a versão validada | orchestrator · `sdlc-s` | — | G4-VALIDAR, G4-SEGURANCA, G4-ARQUITETURA, G4-RELEASE, G4-UX, G4-TESTES |

## Gate 5A — Liberação autorizada

Saída: `release-notes` · aprovação: 👤 decisão humana

| Tarefa | O que | Trinca · agente | Especialistas | Depende de |
|---|---|---|---|---|
| `G5A-LIBERAR` | Preparar versão, notas, plano de reversão e evidência de promoção; decisão humana | specifier · `squad-specifier` | REL-04, REL-03, REL-06 | G4-QUALIDADE |

## Gate 5B — Entrega verificada

Saída: `delivery-verification` · aprovação: 📎 evidência registrada

| Tarefa | O que | Trinca · agente | Especialistas | Depende de |
|---|---|---|---|---|
| `G5B-ENTREGAR` | Executar a entrega autorizada e verificar o estado real no destino | executor · `squad-executor` | REL-05, REL-07 | G5A-LIBERAR |

## Gate 5C — Encerramento e handoff

Saída: sem artefato obrigatório · aprovação: 📎 evidência registrada

| Tarefa | O que | Trinca · agente | Especialistas | Depende de |
|---|---|---|---|---|
| `G5C-ENCERRAR` | Consolidar evidências, pendências e handoff | orchestrator · `sdlc-s` | REL-07 | G5B-ENTREGAR |

> Rotas dos Gates 3 e 4 são provisórias até a classificação de risco vinculada no Gate 2. Orçamento: 1 produção e 2 correções por objetivo.
