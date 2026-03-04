# KEY Builder — Setup Guide

## Prerequisites
- Node.js 18+
- A [Neon](https://neon.tech) account (free tier is enough)
- A [Cloudinary](https://cloudinary.com) account (free tier is enough)

---

## Step 1 — Get your credentials

### Neon (Database)
1. Go to [neon.tech](https://neon.tech) → Create project
2. Copy the **Connection string** (looks like `postgresql://user:pass@host.neon.tech/neondb?sslmode=require`)

### Cloudinary (Image uploads)
1. Go to [cloudinary.com](https://cloudinary.com) → Dashboard
2. Copy: Cloud Name, API Key, API Secret

### NextAuth Secret
Run this in your terminal:
```bash
openssl rand -base64 32
```

---

## Step 2 — Configure environment

Copy `.env.example` to both `.env` and `.env.local`:

```bash
cp .env.example .env
cp .env.example .env.local
```

Fill in **both files** with your real values:
- `.env` → used by Prisma CLI (`migrate`, `seed`)
- `.env.local` → used by Next.js at runtime

> **Why two files?** Prisma CLI uses `dotenv` which reads `.env`. Next.js reads `.env.local`. Both need DATABASE_URL.

---

## Step 3 — Set up the database

```bash
# Create tables in Neon
npx prisma migrate dev --name init

# Create admin user (admin@key.com / admin123)
npm run seed
```

---

## Step 4 — Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Login with `admin@key.com` / `admin123`

---

## Step 5 — Deploy to Vercel

1. Push the project to GitHub
2. Go to [vercel.com](https://vercel.com) → **Import** your repo
3. Add all env vars in Vercel dashboard (same as `.env.local` but with production values):
   - `DATABASE_URL` — your Neon connection string
   - `NEXTAUTH_SECRET` — same secret
   - `NEXTAUTH_URL` — your Vercel URL, e.g. `https://key-builder.vercel.app`
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
4. Deploy — Vercel runs `prisma migrate deploy && next build` automatically

### After first deploy, seed the admin:
```bash
# Run locally pointing at the Neon production DB (your DATABASE_URL is already set in .env)
npm run seed
```

---

## Routes

| Route | Who | Description |
|---|---|---|
| `/login` | Everyone | Email + password login |
| `/admin` | Admin only | Create members, view stats |
| `/builder` | Members | Drag & drop page editor |
| `/p/[slug]` | Public | Live landing page |

## Default admin credentials
- Email: `admin@key.com`
- Password: `admin123`

**Change the password immediately after first login.**

---

## Verification checklist
- [ ] Admin logs in → `/admin` → creates member "Ahmed Ali"
- [ ] Ahmed logs in → `/builder` → drags FOMO above Benefits
- [ ] Ahmed types his WhatsApp number, uploads photo, clicks Publish
- [ ] Visit `/p/ahmed-ali` → see live page with Ahmed's customizations
- [ ] Submit the registration form → submission appears in Neon DB
- [ ] Admin views submissions count on `/admin`
