# Phase 3: Harita Modulu Iyilestirme

## TASK-015: Kendi Leaflet haritasi (iframe yerine)

**Agent**: frontend
**Complexity**: L
**Status**: DONE
**Dependencies**: TASK-008

### Description
Harita sayfasindaki usvsiran.com iframe'ini kaldirip kendi Leaflet haritamizi ana harita olarak kullan. Mevcut WarMap componentini tam sayfa haline getir.

### Acceptance Criteria
- [x] /harita sayfasi kendi Leaflet haritamizi kullaniyor (iframe kaldirildi)
- [x] Tam ekran harita (sidebar + harita layout, lg breakpoint)
- [x] Tum WarEvent'ler haritada gosteriliyor (CircleMarker + popup)
- [x] Filtreler sidebar'da (event type, severity, date range)
- [x] Legend gorsel olarak acik (sidebar'da inline, mobile'da overlay)
- [x] Mobile responsive (Sheet drawer ile filtreler)

### Changes Made
- `harita/page.tsx`: iframe → kendi Leaflet, sidebar+map layout, mobile Sheet drawer
- `war-map-canvas.tsx`: Yeni — filters prop alan harita canvas component'i
- `map-legend.tsx`: inline prop eklendi (sidebar vs overlay)
- `ui/sheet.tsx`: Yeni — basit drawer/sheet component

---

## TASK-016: Harita clustering ve performans

**Agent**: frontend
**Complexity**: M
**Status**: DONE
**Dependencies**: TASK-015

### Description
Cok fazla marker oldugunda performans icin marker clustering ekle, zoom seviyesine gore gruplama yap.

### Acceptance Criteria
- [x] react-leaflet-cluster entegrasyonu
- [x] Zoom out'ta marker'lar gruplanir (maxClusterRadius=50)
- [x] Zoom in'de tekil marker'lar gosterilir (spiderfyOnMaxZoom)
- [x] Cluster rengi icindeki en yuksek severity'ye gore (custom iconCreateFunction)
- [x] Cluster tiklayinca zoom in (chunkedLoading)

### Changes Made
- `react-leaflet-cluster` paketi eklendi
- `war-map-canvas.tsx`: MarkerClusterGroup, custom createClusterIcon (severity-based color)

---

## TASK-017: Olay detay popup/panel

**Agent**: frontend
**Complexity**: M
**Status**: DONE
**Dependencies**: TASK-015

### Description
Marker'a tiklandiginda detayli bilgi paneli goster — mevcut popup'i zenginlestir veya side panel ekle.

### Acceptance Criteria
- [x] Marker tiklaninca detay popup acilir
- [x] Popup'da: baslik, tarih, aciklama, kayip sayisi, kaynak, olay turu
- [ ] Ilgili haberler linki — deferred (DB relation yok)
- [ ] Ilgili timeline entry linki — deferred (DB relation yok)
- [x] Popup kapatilabilir

### Changes Made
- `war-map-canvas.tsx`: Popup zenginlestirildi — grid layout, olay turu label, renkli kayip gosterimi

---

## TASK-018: Harita zaman slider'i

**Agent**: frontend
**Complexity**: M
**Status**: DONE
**Dependencies**: TASK-015

### Description
Haritanin altina zaman slider'i ekle — tarih araligini secince sadece o donemdeki olaylar gosterilsin.

### Acceptance Criteria
- [x] Range slider (from + to dual thumb)
- [x] Slider degistikce harita real-time guncellenir (custom dateRange filter)
- [x] Play butonu: otomatik zaman ilerlemesi (500ms interval animasyon)
- [x] Secili tarih araligi gorsel olarak gosteriliyor (active range bar + labels)

### Changes Made
- `time-slider.tsx`: Yeni — dual range slider, play/pause/reset, date formatting
- `harita/page.tsx`: TimeSlider entegrasyonu, customFrom/customTo filter state
- `map-filters.tsx`: MapFiltersState'e customFrom/customTo eklendi
- `war-map-canvas.tsx`: custom dateRange destegi (from+to API params)
