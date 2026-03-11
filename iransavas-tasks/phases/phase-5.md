# Phase 5: SEO & Production Readiness

## TASK-023: SEO metadata & Open Graph

**Agent**: frontend
**Complexity**: S
**Status**: DONE
**Dependencies**: -

### Description
Her sayfa icin dinamik metadata, OG tags, Twitter cards ekle. Haber detay sayfasi icin dynamik generateMetadata.

### Acceptance Criteria
- [x] Her sayfa icin title + description metadata
- [x] Open Graph tags (og:title, og:description, og:image)
- [x] Twitter card meta tags
- [x] Haber detay sayfasi dynamik generateMetadata (baslik, ozet, resim)

### Changes Made
- `src/lib/seo.ts`: createMetadata helper (OG + Twitter cards)
- `src/app/layout.tsx`: metadataBase, keywords, OG defaults
- 6 layout dosyasi eklendi (haberler, harita, zaman-cizelgesi, raporlar, analiz, canli-yayin)
- `haberler/[id]/page.tsx`: generateMetadata ile dynamik baslik/ozet/resim

---

## TASK-024: sitemap.xml & robots.txt

**Agent**: frontend
**Complexity**: S
**Status**: DONE
**Dependencies**: -

### Description
Next.js sitemap ve robots config ekle. Haber detay sayfalari dynamic sitemap'e dahil.

### Acceptance Criteria
- [x] sitemap.ts — statik sayfalar + dinamik haber URL'leri
- [x] robots.ts — allow/disallow kurallari
- [x] sitemap haber detay sayfalarini icerir

### Changes Made
- `src/app/sitemap.ts`: 6 statik + 500 dinamik haber URL
- `src/app/robots.ts`: /api/ ve /analiz disallow

---

## TASK-025: Loading states (loading.tsx)

**Agent**: frontend
**Complexity**: S
**Status**: DONE
**Dependencies**: -

### Description
Her route group icin skeleton loading.tsx dosyalari ekle.

### Acceptance Criteria
- [x] (main)/loading.tsx — genel skeleton
- [x] haberler/loading.tsx — haber listesi skeleton
- [x] harita/loading.tsx — harita skeleton
- [x] zaman-cizelgesi/loading.tsx — timeline skeleton
- [x] raporlar/loading.tsx — raporlar skeleton

### Changes Made
- 5 loading.tsx dosyasi eklendi (main, haberler, harita, zaman-cizelgesi, raporlar)

---

## TASK-026: Ana sayfa SSR optimizasyonu

**Agent**: frontend
**Complexity**: M
**Status**: DONE
**Dependencies**: TASK-023

### Description
Homepage "use client" ile tamamen client-side. Articles fetch'ini server-side'a tasiyip, interaktif section'lari client component olarak birak.

### Acceptance Criteria
- [x] page.tsx Server Component olarak calisir
- [x] Articles server-side fetch edilir (prisma veya internal fetch)
- [x] Interaktif componentler (TensionIndex, StrategicMap vb.) client component olarak kalir
- [x] Ilk yukleme suresi iyilesir (no client fetch for articles)

### Changes Made
- `src/app/(main)/page.tsx`: "use client" kaldirildi, async Server Component, Prisma ile articles fetch
- `src/components/home/home-sections.tsx`: Yeni — InteractiveSections + BottomSections client wrappers (ErrorBoundary ile)
