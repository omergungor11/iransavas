# Phase 6: Polish & Launch Readiness

## Ozet
Son dokunuslar: 404/hata sayfalari, gorsel optimizasyonu, erisilebirlik, canli yayin & raporlar entegrasyonu.

---

## TASK-027: 404 sayfasi + hata sayfalari
**Agent**: frontend | **Complexity**: S | **Status**: DONE

### Scope
- `src/app/not-found.tsx` — ozel 404 sayfasi (ana sayfaya yonlendirme)
- `src/app/(main)/error.tsx` — global error boundary sayfasi (retry butonu)
- `src/app/(main)/haberler/[id]/not-found.tsx` — haber bulunamadi

### Acceptance Criteria
- [x] 404 sayfasi projeye uygun dark theme tasarimda
- [x] Error sayfasi retry butonu ile
- [x] Haber detay 404 ozel mesajli

---

## TASK-028: Gorsel optimizasyonu (next/image)
**Agent**: frontend | **Complexity**: M | **Status**: DONE

### Scope
- Haber kartlarinda `imageUrl` varsa goster (next/image + fallback gradient)
- Hero section'da next/image kullanimi
- `next.config.js` remote image domains ayari
- Lazy loading ve blur placeholder

### Acceptance Criteria
- [x] Haber kartlari gorselli gorunuyor (imageUrl varsa)
- [x] next/image ile optimize yuklenme
- [x] Gorsel olmayan haberler icin fallback gradient korunuyor

---

## TASK-029: Erisilebirlik (a11y) duzeltmeleri
**Agent**: frontend | **Complexity**: M | **Status**: DONE

### Scope
- Tum interaktif elemanlara aria-label
- Gorsellere alt text
- Semantic HTML kontrol (button vs div)
- Focus management (modal, popup)
- Skip-to-content link

### Acceptance Criteria
- [x] Tum butonlarda aria-label
- [x] Tum gorsellerde alt text
- [x] Keyboard navigation calisiyor
- [x] Skip-to-content link eklendi

---

## TASK-030: Canli yayin & raporlar sayfa entegrasyonu
**Agent**: frontend | **Complexity**: M | **Status**: DONE

### Scope
- `canli-yayin` sayfasi: API'den gelen veriyle dinamik, hata UI
- `raporlar` sayfasi: error state, empty state, retry
- API endpoint'leri kontrol ve duzeltme

### Acceptance Criteria
- [x] Canli yayin sayfasi API'den veri cekiyor
- [x] Raporlar sayfasi hata durumlarini gosteriyor
- [x] Bos durum mesajlari kullanici dostu
