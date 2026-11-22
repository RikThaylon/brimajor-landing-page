# Estado do recorte OBJ-001 — o que falta e o que é seu

> Resumo honesto de como a Brimajor Squad SDD foi usada neste site e do que ainda depende de você (Rik).

## O que a squad fez

| Gate | Situação |
|---|---|
| 0 · Enquadramento | concluído — `00-enquadramento.md` |
| 1 · Definição | concluído — `01-requisitos.md` |
| 2 · Especificação | artefatos aprovados pela squad (`02-especificacao.md`, `../../domain/OBJ-001-bdd.md`, `02-plano-de-testes.md`, `02-ux-spec.md`), risco **médio**; **recibo humano pendente** (código pedido: [omitido]) |
| 3 · Construção | código pronto; quality gate `build` **passed** |
| 4 · Validação | revisão **sequencial** registrada em `docs/evidence/OBJ-001/revisao-sequencial.md` (não conta como independente) |
| 5A · Liberação | notas prontas em `05-release.md`; **decisão sua** |

### Desvio registrado

A squad exige o recibo `aprovo <código>` antes de qualquer código. Nesta sessão em nuvem o hook de prompt da squad não roda, então o recibo não pôde ser gravado. Você respondeu **"Aprovo, pode construir"** no chat e o site foi construído com essa autorização — registrada como decisão `DEC-002`, **não** como recibo verificado. O checkpoint assinado ficou na máquina da nuvem (a chave HMAC é por máquina) e não foi para o Git.

## Como dar as decisões formais no seu computador

Na raiz de um clone de `brimajor-landing-page`, com o framework disponível separadamente:

```bash
npm ci
python3 /caminho/para/squad-framework-brimajor/install.py install --target . --harness claude-code
alias squad='python3 .claude/skills/brimajor-squad-sdd/scripts/squad.py'
squad doctor                                                        # precisa dizer "Pronto para uso"
```

Abra a pasta `brimajor-landing-page/` no Claude Code e peça:

> `/squad retomar o OBJ-001 do site da Brimajor: os artefatos dos Gates 0 a 2 já estão em docs/squad/OBJ-001 e docs/domain; registre-os, classifique o risco como medium e peça minha aprovação`

A squad abre o recorte, registra os documentos existentes e mostra um código. Leia a especificação e responda `aprovo <código>` (ou `rejeito <código> <o que mudar>`). Depois disso, peça `/squad-review` para a revisão independente e, quando quiser publicar, a liberação do Gate 5A com outro `aprovo <código>`.

## O que mais depende de você

1. **Cursos reais** — troque os 14 cursos de exemplo pelo SQL Editor da Neon (README do site).
2. **Fotos** — `public/fotos/equipe.jpg`, `bancada.jpg`, `prototipos.jpg`, `aulas.jpg`.
3. **Render** — serviço `brimajor`, raiz do repositório e `DATABASE_URL` com o usuário `site_leitura`.
4. **Pagamento** — hoje é combinado pelo WhatsApp; quando escolher um meio (Pix, Mercado Pago, Stripe), vira um novo recorte.
