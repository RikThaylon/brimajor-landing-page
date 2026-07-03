# Brimajor Landing Page — Guia de Deploy

Documentação completa para publicar o projeto em produção.

---

## Pré-requisitos

- Node.js 18+ instalado
- Conta no GitHub (repositório: https://github.com/RikThaylon/brimajor-landing-page)
- Conta na Render, Vercel ou outro provedor

---

## Opção 1: Deploy na Render (Recomendado)

### 1.1 Configurar o serviço

1. Acesse [https://render.com](https://render.com) e faça login
2. Clique em **New +** → **Web Service**
3. Conecte seu repositório GitHub: RikThaylon/brimajor-landing-page
4. Configure os campos:

| Campo              | Valor                        |
|--------------------|------------------------------|
| Name               | brimajor-landing              |
| Environment        | Node                          |
| Region             | US East (Ohio) ou São Paulo   |
| Branch             | main                          |
| Root Directory     | (deixar em branco)            |
| Build Command      | 
pm install && npm run build|
| Start Command      | 
pm run start               |
| Instance Type      | Free (ou Starter para produção)|

### 1.2 Variáveis de Ambiente (se necessário)

No painel da Render, em **Environment → Add Environment Variable**:

`
NODE_ENV=production
PORT=3000
`

### 1.3 Deploy Automático

A Render detecta pushes na branch main e faz redeploy automaticamente.

---

## Opção 2: Deploy na Vercel (Mais simples para Next.js)

### 2.1 Via CLI

`ash
npm install -g vercel
vercel login
vercel --prod
`

### 2.2 Via Interface Web

1. Acesse [https://vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **Add New → Project**
3. Importe o repositório RikThaylon/brimajor-landing-page
4. Vercel detecta Next.js automaticamente — clique **Deploy**
5. Pronto! URL gerada automaticamente (ex: rimajor-landing-page.vercel.app)

> **Dica:** A Vercel oferece SSL gratuito, CDN global e preview automático por PR.

---

## Opção 3: Deploy na Railway

1. Acesse [https://railway.app](https://railway.app)
2. Clique em **New Project → Deploy from GitHub Repo**
3. Selecione RikThaylon/brimajor-landing-page
4. Railway configura automaticamente. Adicione:
   - **Build Command:** 
pm run build
   - **Start Command:** 
pm run start
5. Gere um domínio em **Settings → Domains**

---

## Build Local para Teste

`ash
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
`

---

## Domínio Personalizado

Em qualquer plataforma:
1. Vá em **Settings → Custom Domain**
2. Adicione seu domínio (ex: rimajor.com.br)
3. Configure os registros DNS conforme indicado:
   - **Tipo A** → IP da plataforma
   - **Tipo CNAME** → URL da plataforma
4. SSL é provisionado automaticamente em até 24h

---

## next.config.ts — Configurações de Produção

O arquivo já está configurado para produção. Caso precise adicionar variáveis de ambiente sensíveis (tokens, API keys), use o arquivo .env.local localmente e configure na plataforma de deploy.

---

## Estrutura do Projeto

`
brimajor-landing-page/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout raiz com Navbar e Footer
│   │   ├── page.tsx            # Home
│   │   ├── globals.css         # Design system e tokens de cor
│   │   ├── iniciacoes/         # Página de Iniciações & Prototipagem
│   │   └── estoque/            # Página Kanban Estoque
│   ├── components/
│   │   ├── navbar.tsx          # Navbar responsiva com menu mobile
│   │   ├── contact-form.tsx    # Formulário de contato
│   │   └── animate-on-scroll.tsx
│   └── lib/
│       └── data.ts             # Dados do site (capacidades, timeline, etc.)
├── public/
│   └── hero-bg.jpg             # Imagem hero
├── DEPLOY.md                   # Este arquivo
├── package.json
└── next.config.ts
`

---

Dúvidas: brimajor.ia@gmail.com | WhatsApp: (92) 98522-4523