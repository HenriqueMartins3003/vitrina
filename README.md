# Vitrina — Landing Page + Stripe

Next.js 14 · TypeScript · Tailwind CSS · Stripe Subscriptions · Vercel

---

## Stack

| Camada | Ferramenta |
|---|---|
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS |
| Pagamento | Stripe (assinatura mensal) |
| Deploy | Vercel (grátis) |

---

## Estrutura do projeto

```
vitrina/
├── app/
│   ├── layout.tsx          ← Layout raiz + fonts
│   ├── page.tsx            ← Landing page
│   ├── globals.css         ← Estilos globais
│   ├── sucesso/page.tsx    ← Página pós-pagamento
│   ├── cancelado/page.tsx  ← Página se cancelar no Stripe
│   └── api/
│       └── checkout/route.ts  ← API que cria sessão Stripe
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── SocialProof.tsx
│   ├── HowItWorks.tsx
│   ├── Plans.tsx           ← Planos + botão de checkout
│   ├── FAQ.tsx
│   └── Footer.tsx
├── .env.example            ← Template das variáveis
└── vercel.json
```

---

## Setup local (5 minutos)

### 1. Instalar dependências
```bash
npm install
```

### 2. Criar variáveis de ambiente
```bash
cp .env.example .env.local
```

Abra `.env.local` e preencha:

```env
NEXT_PUBLIC_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...       # stripe.com/apikeys
NEXT_PUBLIC_STRIPE_PRICE_PRESENCA=price_...
NEXT_PUBLIC_STRIPE_PRICE_VITRINA=price_...
NEXT_PUBLIC_STRIPE_PRICE_AUTORIDADE=price_...
```

### 3. Criar produtos no Stripe

No [painel do Stripe](https://dashboard.stripe.com/products):

1. Criar produto **Vitrina Presença** → Preço recorrente R$ 297/mês → copiar Price ID
2. Criar produto **Vitrina Vitrina** → Preço recorrente R$ 497/mês → copiar Price ID  
3. Criar produto **Vitrina Autoridade** → Preço recorrente R$ 797/mês → copiar Price ID

Cole os IDs no `.env.local`.

### 4. Rodar localmente
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

---

## Deploy na Vercel (grátis)

### Opção A — Interface web (mais fácil)

1. Acesse [vercel.com](https://vercel.com) e crie conta
2. Clique **New Project** → **Import Git Repository**
3. Suba o projeto para GitHub primeiro:
   ```bash
   git init
   git add .
   git commit -m "feat: vitrina landing page"
   gh repo create vitrina --private --push --source=.
   ```
4. Selecione o repositório na Vercel
5. Em **Environment Variables**, adicione todas as variáveis do `.env.example`
6. Clique **Deploy**

### Opção B — CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

Siga as instruções e adicione as variáveis quando solicitado.

---

## Personalizar antes de publicar

Busque por estes placeholders e substitua:

| Placeholder | Onde | O que é |
|---|---|---|
| `55XXXXXXXXXXX` | Plans.tsx, FAQ.tsx, cancelado, sucesso | Seu número WhatsApp (ex: 5511999999999) |
| `oi@vitrina.com.br` | Footer.tsx | Email de contato |
| `vitrina.com.br` | .env, vercel, metadata | Seu domínio real |

---

## Configurar domínio próprio

Na Vercel:
1. Abra o projeto → **Settings → Domains**
2. Adicione o domínio (ex: `vitrina.com.br`)
3. Atualize os DNS no seu registrador conforme instruções

---

## Próximos passos (pós-MVP)

- [ ] Webhook Stripe → disparo automático do email de boas-vindas
- [ ] Integração Make/n8n → envio do contrato Autentique
- [ ] Dashboard do cliente (briefing, aprovação, relatório)
- [ ] Página de admin para gestão de clientes
