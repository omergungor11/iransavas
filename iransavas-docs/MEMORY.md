# Iran Savas Project Memory

## Project Info
- Iran savasi haber, analiz ve raporlama platformu (iransavas.com)
- Next.js 14 + TypeScript + Tailwind + shadcn/ui + Prisma + PostgreSQL

## Project Status
- **Phase 0**: DONE — Proje scaffold (7/7 task)
- **Phase 1**: DONE — DB + Seed iyilestirme (3/3 task)
- **Phase 2**: DONE — Haber modulu (4/4 task)
- **Phase 3**: DONE — Harita modulu (4/4 task)
- **Phase 4**: DONE — Stabilite & UX (4/4 task)
- **Phase 5**: DONE — SEO & Production (4/4 task)
- **TOTAL**: 26/26 (100%) — Tum phase'ler tamamlandi

## Key Technical Decisions
- Leaflet.js secildi (free, no API key, OpenStreetMap/CARTO dark tiles)
- Recharts secildi (React-native, lightweight)
- App Router kullaniliyor (pages/ degil)
- Dark theme default
- gpt-4o-mini secildi (AI ozetler icin, maliyet optimize)
- react-leaflet-cluster eklendi (marker clustering)

## Important Patterns
- Server Components default, client sadece interaktif elemanlar
- Prisma ile type-safe DB erisimi
- API routes /api/ altinda
- Fetcher'lar paralel calisir (Promise.allSettled)
- AI ozetler: src/lib/ai-summarizer.ts (rate limit: 20/dk, 500/gun)

## RSS Feed Notes
- Reuters: FiveFilters proxy (cdn.feedcontrol.net) — resmi RSS kapali
- TRT Haber: dunya_articles.rss
- Defense News: arc/outboundfeeds/rss endpoint (scrape yerine)
- Crisis Group: 403 blocked, disabled
- Toplam 8 RSS + 3 NewsAPI kaynak

## Known Issues / Gotchas
- components.json yok, shadcn CLI calismaz — UI componentleri manuel
- L.MarkerCluster tipi @types/leaflet'te yok, any kullanildi
- TASK-017 ilgili haberler/timeline linkleri deferred (DB relation yok)
