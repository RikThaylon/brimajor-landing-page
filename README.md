# Brimajor Landing Page

Site institucional da **Brimajor** — empresa de Sistemas Embarcados, IA e Prototipagem Ágil, sediada em Manaus/AM.

🌐 **Deploy:** [brimajor.onrender.com](https://brimajor.onrender.com)

---

## Stack

| Camada    | Tecnologia                                    |
|-----------|-----------------------------------------------|
| Framework | Next.js 15 (App Router)                       |
| UI        | React 19 + Tailwind CSS 4                     |
| Fonte     | Inter via `next/font/google`                  |
| Ícones    | Lucide React                                  |
| Deploy    | Render (Free Tier) / Vercel compatível        |

---

## Rotas

| Rota                      | Descrição                                            |
|---------------------------|------------------------------------------------------|
| `/`                       | Home institucional com hero animado e capacidades    |
| `/iniciacoes`             | Vitrine de conceitos exploratórios em validação      |
| `/estoque`                | Página do produto Kanban Estoque (fase final de dev) |
| `/estoque/dossie-tecnico` | Solicitação de material técnico (noindex)            |

---

## Como Rodar Localmente

```bash
git clone https://github.com/RikThaylon/brimajor-landing-page.git
cd brimajor-landing-page
npm install
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## Build de Produção

```bash
npm run build
npm run start
```

---

## Estrutura de Pastas

```
src/
├── app/
│   ├── layout.tsx          # Navbar global, Footer, fontes
│   ├── page.tsx            # Home
│   ├── loading.tsx         # Splash de carregamento (Next.js nativo)
│   ├── globals.css         # Tokens de cor, animações 3D, utilitários
│   ├── iniciacoes/         # Conceitos em validação
│   └── estoque/            # Produto Kanban Estoque
├── components/
│   ├── navbar.tsx          # Header responsivo + bottom nav mobile
│   ├── contact-form.tsx    # Formulário → WhatsApp (validação real com form)
│   ├── kanban-preview.tsx  # Board Kanban interativo com magnetic tilt
│   ├── animate-on-scroll.tsx
│   └── brand-watermark.tsx
└── lib/
    └── data.ts             # Conteúdo centralizado do site
```

---

## Variáveis de Ambiente

Nenhuma variável obrigatória no momento. Para futuras integrações (e-mail, analytics):

```env
# .env.local
NODE_ENV=development
```

---

## Contato

WhatsApp: [(92) 98522-4523](https://wa.me/5592985224523) | Manaus – AM
