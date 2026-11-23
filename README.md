# Site da Brimajor

Site institucional da **Brimajor Sistemas Embarcados & IA** (Manaus/AM), com modelos 3D, transições cinematográficas e o **Mapa de Cursos e Treinamentos de IA**. Especificado e verificado com a **Brimajor Squad SDD**, ferramenta de uso interno (recorte `OBJ-001`, documentos em [`docs/squad/OBJ-001/`](docs/squad/OBJ-001/)).

| Página | O que tem |
|---|---|
| `/` | Abertura animada, chip 3D que reage ao mouse e mergulha com o scroll, manifesto, frentes, produtos e serviços, modelo de trabalho, iniciações, chamada dos cursos e contato |
| `/cursos` | Mapa de cinco módulos em linhas de metrô (lido da Neon), painel, filtros e acesso à Brimajor Academy |
| `/squad` | Serviço de montagem de squads de agentes de IA sob medida para outras equipes |
| `/estoque`, `/estoque/dossie-tecnico`, `/iniciacoes` | Conteúdo do site anterior, no visual novo (links antigos continuam valendo) |

**Stack:** Next.js 16 · React 19 · Tailwind CSS 4 · GSAP (ScrollTrigger + SplitText) · three.js · Postgres na Neon (`@neondatabase/serverless`).

## Rodar no seu computador

```bash
cd brimajor-landing-page
npm ci
cp .env.example .env.local      # cole a DATABASE_URL da Neon (opcional: sem ela, usa o catálogo local)
npm run dev                     # http://localhost:3000
```

Para ver sem a abertura animada: `http://localhost:3000/?sem-abertura`.

| Comando | Para quê |
|---|---|
| `npm test` | Testes unitários (Vitest) — WhatsApp, catálogo, filtro, layout do mapa, fallback do banco |
| `npm run lint` · `npm run typecheck` | Qualidade e tipos |
| `npm run build` · `npm run start` | Build e servidor de produção |
| `npm run models:export` | Regera os modelos 3D em `public/modelos/*.glb` |
| `python3 .claude/skills/brimajor-squad-sdd/scripts/squad.py quality run --stage build` | Quality gate da Squad (depois de instalar a Squad, ver abaixo) |

## Publicar na Render

O serviço `brimajor` publica a branch `main` de `RikThaylon/brimajor-landing-page` em https://brimajor.onrender.com. A aplicação fica na raiz do repositório.

- **Serviço:** Web Service, Node, plano Free. Deixe **Root Directory** em branco.
- **Build:** `npm ci && npm run build`. **Start:** `npm run start`.
- **Banco:** configure `DATABASE_URL` no ambiente do serviço com a conexão da conta de leitura `site_leitura` do projeto Neon `brimajor-site`. O catálogo local atende quando o banco está indisponível.

O [Blueprint](render.yaml) fica na raiz do repositório.

> No plano gratuito a Render "dorme" sem acesso e a primeira visita pode levar 30–60 s.

## Cursos e materiais de capacitação

O catálogo tem **5 módulos empresariais em 4 trilhas de maturidade**: Começar com IA, Engenharia de Contexto, IA nos Processos e Agentes e Squads. O foco é aplicação prática sem exigir programação; cada módulo adquirido inclui apostila em PDF, apresentação em PPTX, acesso permanente e três meses de mentoria.

Os materiais não são publicados como amostra gratuita. Os arquivos finais ficam no bucket privado da Neon e são liberados somente na área autenticada da **Brimajor Academy**, após matrícula válida.

O catálogo publicado vem do projeto **`brimajor-site`** na Neon, tabelas `trilhas` e `cursos` ([`db/schema.sql`](db/schema.sql)). O conteúdo inicial está em [`db/seed.sql`](db/seed.sql), com os cinco módulos em `inscricoes_abertas`. Para administrar as ofertas, use o **SQL Editor** da Neon:

```sql
-- abrir inscrições de um curso e definir a carga horária
update cursos set status = 'inscricoes_abertas', carga_horaria = 4 where id = 'engenharia-contexto';

-- novo curso
insert into cursos (id, trilha_id, titulo, resumo, nivel, modalidades, topicos, status, ordem)
values ('ia-para-vendas', 'dev', 'IA para Vendas', 'Aplicação supervisionada de IA no processo comercial.',
        'intermediario', '{online,in_company}', '{"Contexto comercial","Roteiros","Revisão humana"}', 'em_breve', 4);

-- tirar do site
update cursos set status = 'encerrado' where id = 'uso-seguro-ia';
```

- `nivel`: `iniciante`, `intermediario` ou `avancado` · `status`: `em_breve`, `inscricoes_abertas` (exibido como "Disponível") ou `encerrado` (some do site) · `modalidades`: `presencial`, `online`, `in_company`.
- O site atualiza sozinho em até **5 minutos**. Linha inválida é ignorada e aparece no log da Render.
- Sem banco ou com o banco fora do ar, o site mostra o catálogo local ([`src/lib/cursos/catalogo-local.ts`](src/lib/cursos/catalogo-local.ts)) — mantenha os dois em sincronia quando os cursos forem definitivos.

**Compra e acesso:** os botões dos cinco módulos levam ao portal `brimajor-academy.onrender.com`. O login usa Google, o material permanece privado e o checkout hospedado pelo Mercado Pago só é habilitado quando as credenciais próprias de produção estão validadas.

## Fotos autorais

Coloque as fotos em [`public/fotos/`](public/fotos/LEIA-ME.md) com estes nomes — elas substituem a arte automaticamente no próximo deploy:

| Arquivo | Onde aparece |
|---|---|
| `equipe.jpg` | Início → "Quem somos" |
| `bancada.jpg` | Início → "Modelo de trabalho" |
| `prototipos.jpg` | Início → "Iniciações" e página `/iniciacoes` |
| `aulas.jpg` | `/cursos` → "Formatos" |

Aceita `.jpg`, `.jpeg`, `.png`, `.webp` ou `.avif`. Ideal: horizontal, pelo menos 1600 px de largura.

## Modelos 3D

Os modelos são **feitos em código** (three.js), sem arquivos de terceiros:

- **Placa com microcontrolador** ([`src/three/modelos/chip.ts`](src/three/modelos/chip.ts)): QFP-48 com pinos "asa de gaivota", 48 trilhas de cobre em barramentos com curvas de 45°, vias, cristal, capacitores, LED, USB-C, antena e o logo da Brimajor no topo do chip.
- **Cérebro-circuito** ([`src/three/modelos/rede-neural.ts`](src/three/modelos/rede-neural.ts)): a ideia do logo em 3D — dois hemisférios de neurônios e o tronco de circuito.

Os dois também estão em `public/modelos/*.glb` (abrem no Blender, PowerPoint, Visualizador 3D do Windows). Com "reduzir movimento" ligado ou sem WebGL, o site mostra imagens estáticas renderizadas desses mesmos modelos.

## Verificação interna com a Squad

A Squad foi usada para especificar e verificar o site, mas a instalação dela (`.claude/`) não vai para o Git porque é regenerável:

```bash
python3 /caminho/para/squad-framework-brimajor/install.py install --target . --harness claude-code
```

O que ainda depende de você está em [`docs/squad/OBJ-001/estado-do-recorte.md`](docs/squad/OBJ-001/estado-do-recorte.md).
