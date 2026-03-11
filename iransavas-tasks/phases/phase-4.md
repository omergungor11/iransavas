# Phase 4: Stabilite & UX Iyilestirme

## TASK-019: Ana sayfa error boundary'leri ve fallback UI

**Agent**: frontend
**Complexity**: M
**Status**: DONE
**Dependencies**: -

### Description
Ana sayfa componentleri (TensionIndex, HeroSection, LatestNews vb.) hata durumunda sessizce basarisiz oluyor. Error boundary + fallback UI ekle.

### Acceptance Criteria
- [x] React Error Boundary wrapper component olusturuldu
- [x] Ana sayfa tum section'lari error boundary ile sarildi
- [x] Hata durumunda kullanici dostu fallback UI gosteriliyor
- [x] Retry butonu ile tekrar deneme imkani
- [x] Silent catch'ler kaldirildi, hata state'leri eklendi

### Changes Made
- `src/components/error-boundary.tsx`: Yeni — class-based Error Boundary, fallbackTitle prop, retry butonu
- `src/app/(main)/page.tsx`: Tum 11 section ErrorBoundary ile sarildi, articles error state eklendi
- `src/components/home/latest-news.tsx`: error prop eklendi, error + empty state UI
- `src/components/home/hero-section.tsx`: Silent catch → console.error
- `src/components/home/tension-index.tsx`: Silent catch → console.error

---

## TASK-020: API route validation & sanitization

**Agent**: backend
**Complexity**: S
**Status**: DONE
**Dependencies**: -

### Description
API route'larinda query parameter'lar dogrulanmiyor. Zod ile validation ekle.

### Acceptance Criteria
- [x] Zod validation schema'lari tanimlandi
- [x] /api/news, /api/events, /api/timeline, /api/reports route'lari valide ediliyor
- [x] Gecersiz parametre durumunda 400 Bad Request donuyor
- [x] Search query sanitize ediliyor (injection onleme)

### Changes Made
- `zod` paketi eklendi
- `src/lib/api-validation.ts`: Yeni — 4 Zod schema + parseQuery helper + sanitizeSearch
- 4 API route guncellendi: news, events, timeline, reports

---

## TASK-021: Zaman cizelgesi & raporlar error state

**Agent**: frontend
**Complexity**: S
**Status**: DONE
**Dependencies**: -

### Description
Timeline ve Reports sayfalarinda error state yok. Error + empty + retry ekle.

### Acceptance Criteria
- [x] /zaman-cizelgesi error state eklendi
- [x] /raporlar error state eklendi
- [x] Her iki sayfada retry butonu var
- [x] Empty state mesajlari iyilestirildi

### Changes Made
- `zaman-cizelgesi/page.tsx`: error state, retry butonu, filtre-aware empty state
- `raporlar/page.tsx`: error state, retry butonu, filtre-aware empty state

---

## TASK-022: TensionIndex skorlama algoritmasi duzeltme

**Agent**: frontend
**Complexity**: S
**Status**: DONE
**Dependencies**: -

### Description
TensionIndex skoru `70 + totalEvents` olarak hardcoded — hizla 100'e saturate oluyor. Anlamli bir algoritma ile degistir.

### Acceptance Criteria
- [x] Skor 0-100 araliginda anlamli dagilim
- [x] Son 7 gunluk olay yogunlugu baz alinir
- [x] Severity agirliklari dahil edilir (KRITIK > YUKSEK > ORTA > DUSUK)
- [x] Skor renk ve label ile eslesiyor (Dusuk/Orta/Yuksek/Kritik)

### Changes Made
- `src/app/api/stats/route.ts`: Tension score algorithm — severity-weighted intensity (0-60), casualty factor (0-25), news volume (0-15)
- `src/components/home/tension-index.tsx`: API'den tensionScore/tensionLevel alir, default 50/ELEVATED
