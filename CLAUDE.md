# Iran Savas - Haber & Analiz Platformu

## Proje

iransavas.com - Iran savasi hakkinda kapsamli haber, analiz ve raporlama platformu. Canli harita, zaman cizelgesi, AI destekli haber ozetleri ve istatistik dashboard'u iceren modern web uygulamasi.

---

## Slash Commandlar

| Command | Ne yapar |
|---------|----------|
| `/cold-start` | Session baslangici — projeyi oku, durumu raporla |
| `/git-full` | Stage, commit, push — task durumlarini guncelle |
| `/local-testing` | Tum servisleri ayaga kaldir ve dogrula |
| `/turn-off` | Session notu yaz, tasklari isaretle, push, kapat |

---

## Mevcut Durum

**Progress**: 7/18 task (%39) — Phase 0 tamam, Phase 1 (DB+Seed) basliyor.

> Her yeni session'da `iransavas-tasks/task-index.md` oku veya `/cold-start` calistir.

---

## Workspace

```
iransavas/
├── src/app/              # Next.js App Router
│   ├── (main)/           # Main layout group
│   │   ├── page.tsx              # Ana sayfa
│   │   ├── haberler/             # Haber listesi + detay
│   │   ├── harita/               # Interaktif harita
│   │   ├── zaman-cizelgesi/      # Timeline
│   │   ├── analiz/               # Dashboard
│   │   └── raporlar/             # Raporlar
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout
│   └── globals.css
├── src/components/       # Shared components
├── src/lib/              # Utilities
├── src/types/            # TypeScript types
├── prisma/               # DB schema + seed
└── public/               # Static assets
```

## Temel Komutlar

```bash
pnpm dev                    # Start dev server (port 3000)
pnpm build                  # Production build
pnpm lint                   # ESLint
npx prisma generate         # Generate Prisma client
npx prisma db push          # Push schema to DB
npx prisma db seed          # Seed database
```

---

## Code Conventions (Kisa)

- **TypeScript**: strict mode, `any` yasak
- **Dosya**: `kebab-case`, component'ler PascalCase
- **API**: Next.js Route Handlers, response `{ data, meta? }`
- **Commit**: `feat(TASK-XXX): aciklama`
- **Styling**: Tailwind CSS + shadcn/ui, dark theme default

---

## Referans Dizinleri

| Dizin | Icerik |
|-------|--------|
| `iransavas-tasks/` | Task takip |
| `iransavas-config/` | Proje kurallari |
| `iransavas-docs/` | Hafiza + changelog |
| `iransavas-plans/` | Uygulama planlari |

---

## Notlar

- Harita: Leaflet.js + OpenStreetMap (free)
- AI ozetler: OpenAI API
- Haberler: NewsAPI + RSS feeds
- Hafiza: `iransavas-docs/MEMORY.md`
