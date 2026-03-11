# Phase 8: Deployment & Canliya Alma

## Ozet
Vercel deployment, cron job kurulumu ve analytics entegrasyonu.

---

## TASK-034: Vercel deployment kurulumu
**Agent**: devops | **Complexity**: S | **Status**: DONE

### Scope
- `vercel.json` konfigurasyonu
- Environment variables tanimla
- Build settings dogrula
- Domain ayarlari (iransavas.com)

### Acceptance Criteria
- [x] Vercel'e basarili deploy
- [x] Env variables dogru tanimli
- [x] Build hatasiz

---

## TASK-035: Cron job kurulumu (haber fetch)
**Agent**: backend | **Complexity**: S | **Status**: DONE

### Scope
- Vercel cron route olustur (`vercel.json` crons)
- `/api/cron/fetch-news` endpoint
- 30 dakikada bir otomatik haber cekme

### Acceptance Criteria
- [x] Cron job tanimli
- [x] Otomatik haber cekme calisiyor
- [x] Hata durumunda log

---

## TASK-036: Analytics entegrasyonu
**Agent**: frontend | **Complexity**: S | **Status**: DONE

### Scope
- Vercel Analytics veya Google Analytics
- Web Vitals izleme
- Sayfa goruntulenme takibi

### Acceptance Criteria
- [x] Analytics kodu eklendi
- [x] Sayfa goruntulenmeleri izleniyor
- [x] Web Vitals raporlaniyor
