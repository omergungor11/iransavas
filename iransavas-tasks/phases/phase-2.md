# Phase 2: Haber Modulu Iyilestirme

## TASK-011: RSS/NewsAPI fetcher'lari test ve duzelt

**Agent**: backend
**Complexity**: M
**Status**: DONE
**Dependencies**: TASK-008

### Description
Mevcut RSS ve NewsAPI fetcher'larini canli kaynaklarla test et, calismayanlari duzelt, yeni kaynaklar ekle.

### Acceptance Criteria
- [x] Tum RSS kaynaklari test edildi (8 kaynak — 8/8 OK)
- [x] Calismayan RSS URL'leri guncellendi (Reuters → FiveFilters proxy, TRT Haber → dunya_articles.rss)
- [x] NewsAPI entegrasyonu test edildi (API key yoksa graceful skip)
- [x] Scraper selektorleri dogrulandi (Defense News → RSS'e cevirildi, Crisis Group → 403 disabled)
- [x] fetch-orchestrator paralel fetch ile iyilestirildi
- [x] Hata loglama iyilestirildi (console.warn → console.log, structured logs)

### Changes Made
- `sources.ts`: Reuters URL updated, TRT Haber URL updated, Defense News scrape→RSS, Crisis Group disabled
- `rss-fetcher.ts`: Iran keyword list expanded, feed item count logged, console.warn→console.log
- `newsapi-fetcher.ts`: console.warn→console.log
- `scraper.ts`: console.warn→console.log
- `fetch-orchestrator.ts`: Sequential fetch → parallel Promise.allSettled, summary logging added

---

## TASK-012: AI ozet sistemi (OpenAI)

**Agent**: backend
**Complexity**: M
**Status**: DONE
**Dependencies**: TASK-011

### Description
OpenAI API ile haber ozetleme sistemini canli test et, prompt'lari optimize et, fallback mekanizmasi ekle.

### Acceptance Criteria
- [x] OpenAI API baglantisi calisiyor (gpt-4o-mini, maliyet optimize)
- [x] Turkce haber ozetleme prompt'u optimize edildi (savas muhabiri rolü, kurallar)
- [x] Ozet uzunlugu 2-3 cumle, max 200 karakter, temperature 0.3
- [x] API key yoksa graceful fallback (baslik + kategori bazli ozet)
- [x] Rate limiting (20/dk, 500/gun)
- [x] Batch ozet uretimi destegi (batchSummarize, fetch-orchestrator entegrasyonu)

### Changes Made
- `src/lib/ai-summarizer.ts`: Yeni modül — summarizeArticle, batchSummarize, rate limiting
- `src/app/api/ai-summary/route.ts`: Single + batch mode, cached response
- `src/lib/fetchers/fetch-orchestrator.ts`: Fetch sonrası otomatik batch summarize

---

## TASK-013: Cron scheduler production-ready

**Agent**: backend
**Complexity**: S
**Status**: DONE
**Dependencies**: TASK-011

### Description
node-cron scheduler'i production icin iyilestir — restart dayanikliligi, loglama, durum takibi.

### Acceptance Criteria
- [x] Cron her 30dk calisacak sekilde ayarlandi (default */30)
- [x] Son calisma zamani ve sonucu kayit ediliyor (runHistory, max 20)
- [x] Cron durumu API'den sorgulanabiliyor (/api/cron-status — interval, lastRun, recentHistory)
- [x] Hata durumunda retry mekanizmasi (2 retry, 30s arasi, consecutiveErrors takibi)

### Changes Made
- `cron-scheduler.ts`: Tamamen yeniden yazildi — run history, retry logic, detayli CronStatus
- `api/cron-status/route.ts`: Default interval 30dk'ya guncellendi

---

## TASK-014: Haber listesi UI iyilestirme

**Agent**: frontend
**Complexity**: M
**Status**: DONE
**Dependencies**: TASK-011

### Description
Haberler sayfasini iyilestir — infinite scroll veya better pagination, arama iyilestirme, loading state'ler.

### Acceptance Criteria
- [x] Loading skeleton iyilestirildi (card yapisini yansitan detayli skeleton)
- [x] Empty state eklendi (arama/filtre durumuna ozel mesajlar, filtreleri temizle butonu)
- [x] Error state eklendi (hata mesaji + tekrar dene butonu)
- [x] Arama debounce eklendi (300ms, AbortController ile race condition onleme)
- [x] Sayfalama iyilestirildi (toplam haber sayisi, responsive layout)
- [x] Responsive tasarim (sm/md/lg breakpoint'ler, mobile-first)

### Changes Made
- `haberler/page.tsx`: Tamamen yeniden yazildi — debounce, error state, improved skeleton, AbortController
