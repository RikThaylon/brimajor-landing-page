# Brimajor Landing Page — Guia de Deploy

Documentação completa para publicar o projeto em produção.

---

## Pré-requisitos

- Node.js 18+ instalado
- Conta no GitHub (repositório: https://github.com/RikThaylon/brimajor-landing-page)
- Conta na Render, Vercel ou outro provedor

---

## Opção 1: Deploy na Render (atual)

### 1.1 Configurar o serviço

1. Acesse [https://render.com](https://render.com) e faça login
2. Clique em **New +** → **Web Service**
3. Conecte o repositório: `RikThaylon/brimajor-landing-page`
4. Configure os campos:

| Campo          | Valor                                  |
|----------------|----------------------------------------|
| Name           | brimajor-landing                       |
| Environment    | Node                                   |
| Region         | US East (Ohio) ou São Paulo            |
| Branch         | main                                   |
| Root Directory | (deixar em branco)                     |
| Build Command  | `npm install && npm run build`         |
| Start Command  | `npm run start`                        |
| Instance Type  | Free (ou Starter para produção)        |

### 1.2 Variáveis de Ambiente

No painel da Render, em **Environment → Add Environment Variable**:

```
NODE_ENV=production
PORT=3000
```

### 1.3 Deploy Automático

A Render detecta pushes na branch `main` e faz redeploy automaticamente.

> ⚠️ **Cold Start:** O plano gratuito da Render desliga instâncias inativas. A primeira requisição após inatividade pode levar 30–60 segundos. O arquivo `public/loading.html` é um mockup visual — para uso real, considere um plano pago ou Vercel (sem cold start no plano hobby).

---

## Opção 2: Deploy na Vercel (recomendado para Next.js)

### Via CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Via Interface Web

1. Acesse [https://vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **Add New → Project**
3. Importe o repositório `RikThaylon/brimajor-landing-page`
4. Vercel detecta Next.js automaticamente — clique **Deploy**
5. URL gerada automaticamente (ex: `brimajor-landing-page.vercel.app`)

> **Dica:** Vercel oferece SSL gratuito, CDN global e preview automático por PR — sem cold start.

---

## Opção 3: Railway

1. Acesse [https://railway.app](https://railway.app)
2. Clique em **New Project → Deploy from GitHub Repo**
3. Selecione `RikThaylon/brimajor-landing-page`
4. Configure:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm run start`
5. Gere um domínio em **Settings → Domains**

---

## Build Local para Teste

```bash
# Clonar o repositório
git clone https://github.com/RikThaylon/brimajor-landing-page.git
cd brimajor-landing-page

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build

# Rodar em produção localmente
npm run start
```

---

## Domínio Personalizado

Em qualquer plataforma:
1. Vá em **Settings → Custom Domain**
2. Adicione seu domínio (ex: `brimajor.com.br`)
3. Configure os registros DNS conforme indicado:
   - **Tipo A** → IP da plataforma
   - **Tipo CNAME** → URL da plataforma
4. SSL é provisionado automaticamente em até 24h

---

## Estrutura do Projeto

```
brimajor-landing-page/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout raiz com Navbar e Footer
│   │   ├── page.tsx                # Home institucional
│   │   ├── loading.tsx             # Splash de loading (Next.js nativo)
│   │   ├── globals.css             # Design system, tokens de cor e animações
│   │   ├── actions.ts              # Server Actions (placeholder para futuro)
│   │   ├── iniciacoes/
│   │   │   └── page.tsx            # Vitrine de conceitos exploratórios
│   │   └── estoque/
│   │       ├── page.tsx            # Página do Kanban Estoque
│   │       └── dossie-tecnico/
│   │           └── page.tsx        # Página de solicitação de material técnico
│   ├── components/
│   │   ├── navbar.tsx              # Navbar responsiva (desktop + mobile bottom nav)
│   │   ├── contact-form.tsx        # Formulário de contato via WhatsApp
│   │   ├── kanban-preview.tsx      # Preview interativo do board Kanban
│   │   ├── animate-on-scroll.tsx   # Wrapper de animação de entrada
│   │   └── brand-watermark.tsx     # Marca d'água do hero
│   └── lib/
│       └── data.ts                 # Dados do site (capacidades, módulos, etc.)
├── public/
│   ├── hero-bg.jpg                 # Imagem hero
│   └── loading.html                # Mockup visual de cold start (standalone, não integrado)
├── DEPLOY.md
├── README.md
├── package.json
└── next.config.ts
```

---

Dúvidas: WhatsApp (92) 98522-4523