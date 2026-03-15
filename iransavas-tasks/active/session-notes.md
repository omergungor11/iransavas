# Session Notes

## 2026-03-16 — Session: iranwar.info Karsilastirma & Deploy

### Completed
- [x] iranwar.info detayli analiz ve karsilastirma
- [x] Catisma gun sayaci (hero section)
- [x] Schema.org LiveBlogPosting + NewsMediaOrganization + SearchAction
- [x] Hakkimizda, Iletisim, Editoryal Politika, Duzeltme Politikasi sayfalari
- [x] Breadcrumb navigasyonu (Schema.org BreadcrumbList)
- [x] Askeri Durum Ozeti karti (homepage)
- [x] OSINT Kaynaklari bolumu (homepage)
- [x] SSS (FAQ) sayfasi — Schema.org FAQPage
- [x] Gizlilik Politikasi sayfasi
- [x] Kullanim Sartlari sayfasi
- [x] News sitemap (/news-sitemap.xml)
- [x] LiveStats bar layout'a eklendi
- [x] Donation popup (hazir ama pasif)
- [x] News ticker component
- [x] Footer'a Kurumsal kolon + tum policy linkleri
- [x] Fallback veriler: haberler, istatistikler, harita markerlari
- [x] Vercel production deploy (iransavas.vercel.app)
- [x] MarketSnapshot ana sayfadan kaldirildi
- [x] Footer mobilde 2 kolon grid

### In Progress
- (yok)

### Next Session
- [ ] Donation popup duzenleme ve aktif etme (gercek IBAN, Papara, BMC bilgileri)
- [ ] Vercel'de PostgreSQL DB baglantisi (production DB yoksa haberler/eventler fallback'te kaliyor)
- [ ] Gercek haber verisi icin cron job test (DB baglandiktan sonra)
- [ ] Custom domain (iransavas.com) Vercel'e baglanmasi
- [ ] Mobil UX ince ayarlari

### Notes
- Vercel Hobby plan: cron gunde 1 kez (08:00 UTC). Daha sik fetch icin Pro plan gerekli.
- DB baglanmadan haberler, istatistikler ve harita fallback statik veriler gosteriyor.
- vercel.json cron: "0 8 * * *" olarak ayarlandi.
- Donation popup comment-out edildi, layout'ta `{/* <DonationPopup /> */}` olarak bekliyor.
