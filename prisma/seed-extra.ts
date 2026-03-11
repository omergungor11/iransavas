// Extra seed data to enrich the database
// Imported by seed.ts

export const extraNewsArticles = [
  // ASKERI (20 articles)
  ...Array.from({ length: 20 }, (_, i) => {
    const titles = [
      'İran Donanması Hürmüz Boğazı\'nda Yeni Tatbikat Başlattı',
      'ABD F-35 Savaş Uçakları Katar Üssü\'ne Konuşlandı',
      'İsrail Hava Kuvvetleri İsfahan Yakınlarında Operasyon Düzenledi',
      'Devrim Muhafızları Yeni Balistik Füze Testini Duyurdu',
      'NATO Müttefikleri Basra Körfezi\'ne Ek Savaş Gemisi Gönderdi',
      'İran Hava Savunma Sistemi Modernize Edildi',
      'ABD Donanması Aden Körfezi\'nde Devriye Artırdı',
      'İran İHA\'ları Irak Sınırında Keşif Uçuşu Gerçekleştirdi',
      'Suudi Arabistan Patriot Bataryalarını Güçlendirdi',
      'İran Denizaltısı Umman Denizi\'nde Görüntülendi',
      'B-52 Bombardıman Uçakları Diego Garcia\'ya Sevk Edildi',
      'İran Siber Ordusu ABD Üslerine Saldırı Düzenledi',
      'Türkiye Sınır Güvenliğini Maksimum Seviyeye Çıkardı',
      'İran Kara Kuvvetleri Huzistan\'da Mevzi Aldı',
      'ABD CENTCOM Komutanı Bölge Turuna Çıktı',
      'İran S-300 Sistemleri Aktif Konuma Getirildi',
      'Britanya Kraliyet Donanması HMS Queen Elizabeth\'i Gönderdi',
      'İran Yeraltı Füze Üslerini Genişletiyor',
      'Fransa Charles de Gaulle Uçak Gemisini Doğu Akdeniz\'e Yönlendirdi',
      'İran Sahil Güvenlik Botları Ticari Gemileri Denetliyor',
    ]
    const contents = [
      'İran Donanması, Hürmüz Boğazı ve çevresinde kapsamlı bir deniz tatbikatı başlattı. Tatbikata fırkateynler, hücumbotlar ve denizaltılar katılıyor.',
      'ABD Hava Kuvvetleri, bölgedeki caydırıcılığı artırmak amacıyla Katar\'daki Al Udeid Üssü\'ne F-35 Lightning II savaş uçakları konuşlandırdı.',
      'İsrail Hava Kuvvetleri\'nin İsfahan yakınlarında düzenlediği hava operasyonunda askeri tesisler hedef alındı. İran hava savunması karşılık verdi.',
      'İran Devrim Muhafızları, menzili 2000 km\'yi aşan yeni nesil balistik füze testini başarıyla tamamladığını duyurdu.',
      'NATO müttefikleri, bölgesel istikrarı korumak amacıyla Basra Körfezi\'ne ek fırkateyn ve muhrip gönderme kararı aldı.',
      'İran, Rusya\'dan temin ettiği ileri teknoloji hava savunma sistemleriyle mevcut kapasitesini önemli ölçüde güçlendirdi.',
      'ABD Donanması 5. Filo komutanlığı, Aden Körfezi\'ndeki devriye faaliyetlerini iki katına çıkardığını açıkladı.',
      'İran\'ın Shahed serisi İHA\'ları, Irak sınırı boyunca yoğun keşif uçuşları gerçekleştirdi.',
      'Suudi Arabistan, olası balistik füze tehdidine karşı Patriot hava savunma bataryalarını takviye etti.',
      'İran\'ın Fateh sınıfı denizaltısı, Umman Denizi\'nde uydu görüntüleriyle tespit edildi.',
      'ABD Stratejik Komutanlığı, B-52H bombardıman uçaklarını Hint Okyanusu\'ndaki Diego Garcia üssüne konuşlandırdı.',
      'İran\'ın siber birimlerinin ABD\'nin bölgedeki askeri üslerinin iletişim altyapısına saldırı düzenlediği raporlandı.',
      'Türkiye, İran sınırındaki güvenlik önlemlerini en üst seviyeye çıkardı ve ek zırhlı birlikler konuşlandırdı.',
      'İran Kara Kuvvetleri, petrol zengini Huzistan eyaletinde savunma mevzileri oluşturdu.',
      'ABD Merkez Kuvvetler Komutanı, Körfez ülkelerini ziyaret ederek askeri koordinasyonu güçlendirdi.',
      'İran\'ın Rusya\'dan aldığı S-300 hava savunma sistemleri, nükleer tesisler çevresinde aktif konuma getirildi.',
      'İngiltere, HMS Queen Elizabeth uçak gemisini Basra Körfezi\'ne göndererek bölgedeki askeri varlığını artırdı.',
      'Uydu görüntüleri, İran\'ın dağlık bölgelerdeki yeraltı füze üslerini genişlettiğini ortaya koydu.',
      'Fransa, Charles de Gaulle uçak gemisini Doğu Akdeniz\'e yönlendirerek bölgedeki askeri varlığını güçlendirdi.',
      'İran Sahil Güvenlik botları, Hürmüz Boğazı\'ndan geçen ticari gemileri durdurarak arama yapıyor.',
    ]
    const date = new Date(2026, 0, 5 + i * 4)
    return {
      id: `cna_extra_askeri_${String(i + 1).padStart(3, '0')}`,
      title: titles[i],
      slug: titles[i].toLowerCase().replace(/[^a-z0-9ğüşıöç\s-]/g, '').replace(/\s+/g, '-').slice(0, 120) + `-${i + 1}`,
      content: contents[i] + ` Bu gelişme, bölgedeki askeri tansiyonun yeni bir boyut kazandığına işaret ediyor. Uzmanlar, durumun daha da tırmanabileceği konusunda uyarıyor. Diplomatik kanalların açık tutulması kritik önem taşıyor.`,
      summary: titles[i],
      source: ['Reuters', 'Al Jazeera', 'BBC', 'Anadolu Ajansı', 'TRT Haber'][i % 5],
      sourceUrl: 'https://example.com',
      category: 'ASKERI',
      publishedAt: date,
    }
  }),
  // SIYASI (15 articles)
  ...Array.from({ length: 15 }, (_, i) => {
    const titles = [
      'BM Güvenlik Konseyi İran Gündemiyle Acil Toplandı',
      'AB Dış İlişkiler Yüksek Temsilcisi Tahran\'ı Ziyaret Etti',
      'Rusya İran\'a Diplomatik Destek Verdi',
      'Çin Barış Planını BM\'ye Sundu',
      'Türkiye Arabuluculuk Teklifi Yaptı',
      'İran Dışişleri Bakanı Cenevre\'de Basın Toplantısı Düzenledi',
      'ABD Kongresi İran Yaptırımlarını Genişletti',
      'Katar Doha\'da Gizli Müzakerelere Ev Sahipliği Yaptı',
      'Hindistan Tarafsızlık Politikasını Yineledi',
      'İran Cumhurbaşkanı Ulusa Seslendi',
      'IAEA İran Nükleer Tesislerini Denetledi',
      'Japonya Diplomatik Arabuluculuk Girişimi Başlattı',
      'Brezilya BM\'de Ateşkes Çağrısı Yaptı',
      'İran Meclisi Olağanüstü Toplandı',
      'NATO Genel Sekreteri Endişelerini Dile Getirdi',
    ]
    const date = new Date(2026, 0, 3 + i * 5)
    return {
      id: `cna_extra_siyasi_${String(i + 1).padStart(3, '0')}`,
      title: titles[i],
      slug: titles[i].toLowerCase().replace(/[^a-z0-9ğüşıöç\s-]/g, '').replace(/\s+/g, '-').slice(0, 120) + `-s${i + 1}`,
      content: `${titles[i]}. Bu gelişme uluslararası kamuoyunda geniş yankı uyandırdı. Diplomatik çözüm arayışları yoğunlaşırken, tarafların uzlaşmaz tutumları müzakereleri zorlaştırıyor. Bölgesel aktörlerin de devreye girmesiyle kriz çok boyutlu bir hal aldı. Uzmanlar, diplomatik kanalların açık tutulmasının kritik önem taşıdığını vurguluyor.`,
      summary: titles[i],
      source: ['Al Jazeera', 'BBC', 'Reuters', 'France24', 'DW'][i % 5],
      sourceUrl: 'https://example.com',
      category: 'SIYASI',
      publishedAt: date,
    }
  }),
  // EKONOMI (15 articles)
  ...Array.from({ length: 15 }, (_, i) => {
    const titles = [
      'Petrol Fiyatları 120 Doları Aştı',
      'Hürmüz Boğazı Kapanırsa Küresel Ekonomiye Etkisi',
      'İran Riyali Tarihi Dip Seviyeye Geriledi',
      'Altın Fiyatları Rekor Kırdı',
      'Küresel Tedarik Zincirleri Tehdit Altında',
      'OPEC Acil Toplantı Kararı Aldı',
      'Sigorta Şirketleri Körfez Primlerini Yükseltti',
      'İran\'ın Petrol İhracatı Sıfıra Yaklaştı',
      'Avrupa Doğalgaz Fiyatları Tavan Yaptı',
      'Borsa İstanbul\'da Savaş Etkisi Görüldü',
      'Küresel Gıda Fiyatları Yükselişte',
      'ABD Stratejik Petrol Rezervlerini Serbest Bıraktı',
      'Deniz Taşımacılığı Maliyetleri İkiye Katlandı',
      'İran Merkez Bankası Döviz Kısıtlaması Getirdi',
      'Körfez Ülkeleri Ekonomik Tedbir Paketi Açıkladı',
    ]
    const date = new Date(2026, 0, 7 + i * 5)
    return {
      id: `cna_extra_ekonomi_${String(i + 1).padStart(3, '0')}`,
      title: titles[i],
      slug: titles[i].toLowerCase().replace(/[^a-z0-9ğüşıöç\s-]/g, '').replace(/\s+/g, '-').slice(0, 120) + `-e${i + 1}`,
      content: `${titles[i]}. Çatışmanın ekonomik etkileri küresel boyutta hissedilmeye devam ediyor. Enerji piyasaları büyük dalgalanma yaşarken, yatırımcılar güvenli liman arayışında. Tedarik zincirlerindeki aksaklıklar enflasyonist baskıları artırıyor. Ekonomistler durumun uzaması halinde küresel resesyon riskinin yükseleceğini belirtiyor.`,
      summary: titles[i],
      source: ['Bloomberg', 'Reuters', 'Financial Times', 'CNBC', 'Dünya Gazetesi'][i % 5],
      sourceUrl: 'https://example.com',
      category: 'EKONOMI',
      publishedAt: date,
    }
  }),
  // INSANI_YARDIM (15 articles)
  ...Array.from({ length: 15 }, (_, i) => {
    const titles = [
      'UNICEF: İran\'da 2 Milyon Çocuk Risk Altında',
      'Kızılhaç İran\'a İnsani Yardım Koridoru Talep Etti',
      'Mülteci Akını Komşu Ülkeleri Zorluyor',
      'DSÖ İran Sağlık Krizini Belgeledi',
      'Türkiye Sınırında Mülteci Kampı Kuruldu',
      'BM Gıda Programı İran\'a Acil Yardım Gönderdi',
      'İsfahan\'da Hastane Bombardımanı Uluslararası Tepki Çekti',
      'Irak Sınırında 50.000 Mülteci Bekliyor',
      'Sınır Tanımayan Doktorlar İran\'a Ekip Gönderdi',
      'İran\'da Temiz Su Krizi Büyüyor',
      'Afganistan Sınırında İnsani Dram Yaşanıyor',
      'İnsani Yardım Konvoyu Saldırıya Uğradı',
      'İran\'da 3 Milyon Kişi Gıda Güvensizliği Yaşıyor',
      'UNHCR Acil Fon Çağrısı Yaptı',
      'Çatışma Bölgesinde Eğitim Durma Noktasında',
    ]
    const date = new Date(2026, 0, 10 + i * 5)
    return {
      id: `cna_extra_insani_${String(i + 1).padStart(3, '0')}`,
      title: titles[i],
      slug: titles[i].toLowerCase().replace(/[^a-z0-9ğüşıöç\s-]/g, '').replace(/\s+/g, '-').slice(0, 120) + `-h${i + 1}`,
      content: `${titles[i]}. İnsani kriz her geçen gün derinleşiyor. Sivil halk, çatışmanın en ağır bedelini ödemeye devam ediyor. Uluslararası yardım kuruluşları erişim sorunlarıyla karşılaşırken, ihtiyaçlar katlanarak artıyor. Çocuklar, kadınlar ve yaşlılar en savunmasız gruplar olarak öne çıkıyor.`,
      summary: titles[i],
      source: ['UNICEF', 'WHO', 'Al Jazeera', 'BBC', 'Reuters'][i % 5],
      sourceUrl: 'https://example.com',
      category: 'INSANI_YARDIM',
      publishedAt: date,
    }
  }),
  // DIPLOMASI (15 articles)
  ...Array.from({ length: 15 }, (_, i) => {
    const titles = [
      'Cenevre\'de Gizli Ateşkes Müzakereleri Başladı',
      'İran-ABD Esir Takası Gerçekleşti',
      'Muscat Barış Görüşmeleri İkinci Tura Geçti',
      'Türkiye-İran Dışişleri Bakanları Ankara\'da Görüştü',
      'BM Özel Temsilcisi Bölge Turuna Çıktı',
      'Rusya-Çin Ortak Barış Planı Teklifi',
      'İsviçre Arabuluculuk Önerisi Sundu',
      'Körfez İşbirliği Konseyi Olağanüstü Zirvesi',
      'AB İran\'a Yönelik Yeni Yaptırım Paketi',
      'Norveç Oslo\'da Barış Müzakeresi Ev Sahipliği Önerdi',
      'G7 Dışişleri Bakanları Ortak Bildiri Yayımladı',
      'ASEAN İran Krizine İlişkin Kaygılarını Açıkladı',
      'Afrika Birliği Ateşkes Çağrısı Yaptı',
      'Papa Francis Barış İçin Çağrıda Bulundu',
      'İran ve Irak Sınır Güvenliği Anlaşması İmzaladı',
    ]
    const date = new Date(2026, 0, 8 + i * 5)
    return {
      id: `cna_extra_diplomasi_${String(i + 1).padStart(3, '0')}`,
      title: titles[i],
      slug: titles[i].toLowerCase().replace(/[^a-z0-9ğüşıöç\s-]/g, '').replace(/\s+/g, '-').slice(0, 120) + `-d${i + 1}`,
      content: `${titles[i]}. Diplomatik alanda yoğun trafiğin yaşandığı bu dönemde, barış umutları zaman zaman yeşeriyor ancak tarafların karşılıklı güvensizliği ilerlemeyi engelliyor. Uluslararası toplum, kalıcı bir ateşkes için baskılarını artırıyor.`,
      summary: titles[i],
      source: ['Reuters', 'Al Jazeera', 'France24', 'BBC', 'DW'][i % 5],
      sourceUrl: 'https://example.com',
      category: 'DIPLOMASI',
      publishedAt: date,
    }
  }),
]

// EXTRA WAR EVENTS (60 more)
const iranCities: [string, number, number][] = [
  ['Tahran', 35.6892, 51.3890],
  ['İsfahan', 32.6546, 51.6680],
  ['Şiraz', 29.5918, 52.5837],
  ['Tebriz', 38.0800, 46.2919],
  ['Meşhed', 36.2605, 59.6168],
  ['Ahvaz', 31.3183, 48.6706],
  ['Buşehr', 28.9234, 50.8203],
  ['Bandar Abbas', 27.1865, 56.2808],
  ['Kerman', 30.2839, 57.0834],
  ['Hemedan', 34.7988, 48.5146],
  ['Rasht', 37.2808, 49.5832],
  ['Yezd', 31.8974, 54.3569],
  ['Karaj', 35.8400, 50.9391],
  ['Kum', 34.6399, 50.8759],
  ['Urmiye', 37.5527, 45.0761],
  ['Zahedan', 29.4963, 60.8629],
  ['Arak', 34.0917, 49.6892],
  ['Hürmüz Boğazı', 26.5667, 56.2500],
  ['Harg Adası', 29.2333, 50.3167],
  ['Çabahar', 25.2919, 60.6430],
]

const eventTypes = ['CATISMA', 'HAVA_SALDIRISI', 'DENIZ_OPERASYONU', 'DIPLOMASI', 'INSANI_KRIZ', 'SIBER_SALDIRI']
const severities = ['DUSUK', 'ORTA', 'YUKSEK', 'KRITIK']

export const extraWarEvents = Array.from({ length: 60 }, (_, i) => {
  const city = iranCities[i % iranCities.length]
  const eventType = eventTypes[i % eventTypes.length]
  const severity = severities[i % severities.length]
  const date = new Date(2026, 0, 1 + i)
  const jitter = () => (Math.random() - 0.5) * 0.5

  const descriptions: Record<string, string[]> = {
    CATISMA: [
      `${city[0]} yakınlarında kara kuvvetleri arasında yoğun çatışma yaşandı.`,
      `${city[0]} bölgesinde zırhlı birlikler arasında şiddetli muharebe gerçekleşti.`,
      `${city[0]} çevresinde milis gruplarıyla güvenlik kuvvetleri arasında silahlı çatışma çıktı.`,
    ],
    HAVA_SALDIRISI: [
      `${city[0]} havaalanı ve çevresindeki askeri tesisler hava saldırısına uğradı.`,
      `${city[0]} üzerinde yoğun hava bombardımanı gerçekleştirildi.`,
      `${city[0]}'daki savunma sanayii tesisleri hava operasyonuyla hedef alındı.`,
    ],
    DENIZ_OPERASYONU: [
      `${city[0]} açıklarında deniz kuvvetleri arasında karşılaşma yaşandı.`,
      `${city[0]} limanında deniz mayını tespit edildi ve imha operasyonu başlatıldı.`,
      `${city[0]} kıyısında hücumbot saldırısı gerçekleşti.`,
    ],
    DIPLOMASI: [
      `${city[0]}'da uluslararası diplomatik temas gerçekleştirildi.`,
      `${city[0]} valiliği yerel ateşkes ilan etti.`,
      `${city[0]}'da insani koridor açılması müzakereleri başladı.`,
    ],
    INSANI_KRIZ: [
      `${city[0]}'da sivil halk gıda ve temiz su sıkıntısı yaşıyor.`,
      `${city[0]} hastanesinin kapasitesi aşıldı, yaralılar tedavi bekliyor.`,
      `${city[0]}'dan büyük sivil göç dalgası başladı.`,
    ],
    SIBER_SALDIRI: [
      `${city[0]}'daki enerji altyapısına siber saldırı düzenlendi.`,
      `${city[0]} iletişim ağları siber operasyonla devre dışı bırakıldı.`,
      `${city[0]}'daki su arıtma tesisi siber saldırıyla hedef alındı.`,
    ],
  }

  const desc = descriptions[eventType][i % 3]
  const casualties = eventType === 'DIPLOMASI' ? 0 : Math.floor(Math.random() * 150) + 5

  return {
    id: `evt_extra_${String(i + 1).padStart(3, '0')}`,
    title: `${city[0]} — ${eventType.replace('_', ' ')} Olayı`,
    description: desc,
    date,
    latitude: city[1] + jitter(),
    longitude: city[2] + jitter(),
    eventType,
    severity,
    casualties: casualties || null,
    source: ['Reuters', 'Al Jazeera', 'BBC', 'OSINT', 'Yerel Kaynaklar'][i % 5],
  }
})

// EXTRA CASUALTY REPORTS (20 more)
export const extraCasualtyReports = Array.from({ length: 20 }, (_, i) => {
  const regions = [
    'Tahran', 'Huzistan', 'İsfahan', 'Fars', 'Buşehr',
    'Hürmüzgan', 'Doğu Azerbaycan', 'Batı Azerbaycan', 'Kerman', 'Sistan-Belucistan',
  ]
  const date = new Date(2026, 0, 1 + i * 4)
  return {
    id: `cas_extra_${String(i + 1).padStart(3, '0')}`,
    date,
    civilianCasualties: Math.floor(Math.random() * 80) + 10,
    militaryCasualties: Math.floor(Math.random() * 120) + 20,
    injured: Math.floor(Math.random() * 300) + 50,
    displaced: Math.floor(Math.random() * 15000) + 2000,
    region: regions[i % regions.length],
    source: ['BM', 'Kızılhaç', 'DSÖ', 'Yerel Kaynaklar', 'UNHCR'][i % 5],
  }
})

// EXTRA TIMELINE ENTRIES (35 more)
export const extraTimelineEntries = [
  { id: 'tle_extra_001', title: 'ABD Uçak Gemisi Körfez\'e Girdi', description: 'USS Gerald Ford uçak gemisi savaş grubuyla birlikte Basra Körfezi\'ne konuşlandı.', date: new Date('2026-01-02'), category: 'ASKERI', importance: 'CRITICAL' },
  { id: 'tle_extra_002', title: 'İran Hürmüz\'ü Kapatma Tehdidinde Bulundu', description: 'İran Genelkurmayı, saldırılar devam ederse Hürmüz Boğazı\'nı kapatacağını açıkladı.', date: new Date('2026-01-04'), category: 'ASKERI', importance: 'CRITICAL' },
  { id: 'tle_extra_003', title: 'BM Güvenlik Konseyi Acil Oturum', description: 'BM Güvenlik Konseyi İran krizini görüşmek üzere acil olarak toplandı.', date: new Date('2026-01-06'), category: 'DIPLOMASI', importance: 'HIGH' },
  { id: 'tle_extra_004', title: 'İlk Sivil Kayıplar Raporlandı', description: 'Ahvaz\'da düzenlenen hava saldırısında 47 sivil hayatını kaybetti.', date: new Date('2026-01-08'), category: 'INSANI', importance: 'CRITICAL' },
  { id: 'tle_extra_005', title: 'Petrol 100 Doları Aştı', description: 'Brent petrolün varili çatışma haberleriyle 100 doların üzerine çıktı.', date: new Date('2026-01-09'), category: 'EKONOMI', importance: 'HIGH' },
  { id: 'tle_extra_006', title: 'İran İlk Karşı Saldırıyı Gerçekleştirdi', description: 'İran balistik füzelerle bölgedeki ABD üslerini hedef aldı.', date: new Date('2026-01-11'), category: 'ASKERI', importance: 'CRITICAL' },
  { id: 'tle_extra_007', title: 'Türkiye Sınırlarını Kapattı', description: 'Türkiye güvenlik gerekçesiyle İran sınır kapılarını geçici olarak kapattı.', date: new Date('2026-01-13'), category: 'DIPLOMASI', importance: 'HIGH' },
  { id: 'tle_extra_008', title: 'İsfahan Nükleer Tesisi Alarm Verdi', description: 'İsfahan nükleer araştırma tesisi yakınlarında patlama sesleri duyuldu.', date: new Date('2026-01-15'), category: 'ASKERI', importance: 'CRITICAL' },
  { id: 'tle_extra_009', title: 'İlk İnsani Yardım Konvoyu', description: 'Kızılhaç öncülüğünde ilk insani yardım konvoyu İran\'a ulaştı.', date: new Date('2026-01-17'), category: 'INSANI', importance: 'HIGH' },
  { id: 'tle_extra_010', title: 'Siber Saldırı Dalgası Başladı', description: 'İran siber birimlerinin ABD ve İsrail altyapısına yönelik kapsamlı saldırıları tespit edildi.', date: new Date('2026-01-19'), category: 'ASKERI', importance: 'HIGH' },
  { id: 'tle_extra_011', title: 'Çin Barış Planı Açıkladı', description: 'Çin, 6 maddelik İran barış planını BM\'ye resmen sundu.', date: new Date('2026-01-21'), category: 'DIPLOMASI', importance: 'HIGH' },
  { id: 'tle_extra_012', title: 'Bandar Abbas Limanı Kullanılamaz Hale Geldi', description: 'Yoğun bombardıman sonucu İran\'ın en büyük ticari limanı hasar gördü.', date: new Date('2026-01-23'), category: 'ASKERI', importance: 'CRITICAL' },
  { id: 'tle_extra_013', title: 'Mülteci Sayısı 100.000\'i Geçti', description: 'BM, İran\'dan komşu ülkelere göç eden mülteci sayısının 100 bini aştığını açıkladı.', date: new Date('2026-01-25'), category: 'INSANI', importance: 'HIGH' },
  { id: 'tle_extra_014', title: 'İlk Ateşkes Teklifi Reddedildi', description: 'BM\'nin 72 saatlik ateşkes teklifi İran tarafından koşullu kabul, ABD tarafından reddedildi.', date: new Date('2026-01-27'), category: 'DIPLOMASI', importance: 'HIGH' },
  { id: 'tle_extra_015', title: 'Tahran\'da Hava Saldırısı', description: 'İlk kez başkent Tahran merkezdeki askeri tesisler vuruldu.', date: new Date('2026-01-29'), category: 'ASKERI', importance: 'CRITICAL' },
  { id: 'tle_extra_016', title: 'Petrol 130 Doları Gördü', description: 'Hürmüz Boğazı\'ndaki gerilim petrol fiyatlarını tarihi seviyelere taşıdı.', date: new Date('2026-02-01'), category: 'EKONOMI', importance: 'HIGH' },
  { id: 'tle_extra_017', title: 'İran Denizaltısı ABD Gemisine Yaklaştı', description: 'İran Fateh sınıfı denizaltı, ABD destroyerine tehlikeli mesafede yaklaştı.', date: new Date('2026-02-03'), category: 'ASKERI', importance: 'HIGH' },
  { id: 'tle_extra_018', title: 'DSÖ Sağlık Acil Durumu İlan Etti', description: 'DSÖ, İran\'daki sağlık sisteminin çöküş eşiğinde olduğunu resmen ilan etti.', date: new Date('2026-02-05'), category: 'INSANI', importance: 'CRITICAL' },
  { id: 'tle_extra_019', title: 'Katar Arabuluculuk Başlattı', description: 'Katar Emiri, İran ve ABD arasında arabuluculuk girişimi başlattı.', date: new Date('2026-02-07'), category: 'DIPLOMASI', importance: 'HIGH' },
  { id: 'tle_extra_020', title: 'İran\'ın Hava Savunması Güçlendirildi', description: 'İran, Rusya\'dan acil temin ettiği hava savunma sistemlerini konuşlandırdı.', date: new Date('2026-02-09'), category: 'ASKERI', importance: 'MEDIUM' },
  { id: 'tle_extra_021', title: 'Huzistan Petrol Tesisleri Yanıyor', description: 'Huzistan\'daki petrol rafinerileri hava saldırısı sonucu büyük yangınla karşı karşıya.', date: new Date('2026-02-11'), category: 'EKONOMI', importance: 'CRITICAL' },
  { id: 'tle_extra_022', title: 'NATO Olağanüstü Toplantı', description: 'NATO, İran krizinin müttefiklere etkisini değerlendirmek için olağanüstü toplantı düzenledi.', date: new Date('2026-02-13'), category: 'DIPLOMASI', importance: 'MEDIUM' },
  { id: 'tle_extra_023', title: '120 Esir Takas Edildi', description: 'Katar arabuluculuğuyla her iki taraftan 60\'ar savaş esiri serbest bırakıldı.', date: new Date('2026-02-15'), category: 'DIPLOMASI', importance: 'HIGH' },
  { id: 'tle_extra_024', title: 'Tebriz\'de Sivil Pazar Bombalandı', description: 'Tebriz\'deki sivil pazar alanına düşen füze 83 sivili öldürdü.', date: new Date('2026-02-17'), category: 'INSANI', importance: 'CRITICAL' },
  { id: 'tle_extra_025', title: 'ABD Ek Kuvvet Konuşlandırdı', description: 'Pentagon, bölgeye 15.000 ek asker ve zırhlı araç gönderileceğini açıkladı.', date: new Date('2026-02-19'), category: 'ASKERI', importance: 'HIGH' },
  { id: 'tle_extra_026', title: 'İran Merkez Bankası Çöküş Eşiğinde', description: 'İran Merkez Bankası döviz rezervlerinin kritik seviyeye düştüğünü itiraf etti.', date: new Date('2026-02-21'), category: 'EKONOMI', importance: 'HIGH' },
  { id: 'tle_extra_027', title: 'Rusya-Çin Ortak Veto', description: 'Rusya ve Çin, BM Güvenlik Konseyi\'ndeki yaptırım kararını veto etti.', date: new Date('2026-02-23'), category: 'DIPLOMASI', importance: 'CRITICAL' },
  { id: 'tle_extra_028', title: 'İran İHA Sürüsü Saldırısı', description: 'İran, ilk kez 50+ İHA ile koordineli sürü saldırısı gerçekleştirdi.', date: new Date('2026-02-25'), category: 'ASKERI', importance: 'HIGH' },
  { id: 'tle_extra_029', title: 'Yerinden Edilenler 500.000\'i Aştı', description: 'UNHCR, İran\'da yerinden edilenlerin yarım milyonu geçtiğini raporladı.', date: new Date('2026-02-27'), category: 'INSANI', importance: 'CRITICAL' },
  { id: 'tle_extra_030', title: 'Muscat Müzakereleri Başladı', description: 'Umman\'ın başkenti Muscat\'ta doğrudan barış müzakereleri ilk kez başladı.', date: new Date('2026-03-01'), category: 'DIPLOMASI', importance: 'CRITICAL' },
  { id: 'tle_extra_031', title: 'İran Elektrik Şebekesi Çöktü', description: 'Siber saldırı ve fiziksel hasar kombinasyonuyla İran\'ın güney bölgesinde elektrik kesildi.', date: new Date('2026-03-03'), category: 'INSANI', importance: 'HIGH' },
  { id: 'tle_extra_032', title: 'ICC Soruşturma Başlattı', description: 'Uluslararası Ceza Mahkemesi, İran çatışmasında savaş suçları soruşturması başlattı.', date: new Date('2026-03-05'), category: 'DIPLOMASI', importance: 'CRITICAL' },
  { id: 'tle_extra_033', title: 'Küresel Borsa Çalkantısı', description: 'Savaşın yayılma riski küresel borsalarda %8\'lik düşüşe yol açtı.', date: new Date('2026-03-06'), category: 'EKONOMI', importance: 'HIGH' },
  { id: 'tle_extra_034', title: 'İnsani Yardım Çalışanları Saldırıya Uğradı', description: 'Bağımsız insani yardım konvoyuna düzenlenen saldırıda 12 yardım çalışanı hayatını kaybetti.', date: new Date('2026-03-08'), category: 'INSANI', importance: 'CRITICAL' },
  { id: 'tle_extra_035', title: 'Kısmi Ateşkes İlan Edildi', description: 'Muscat müzakereleri sonucunda 7 günlük kısmi ateşkes ilan edildi.', date: new Date('2026-03-10'), category: 'DIPLOMASI', importance: 'CRITICAL' },
]

// EXTRA REPORTS (6 more)
export const extraReports = [
  {
    id: 'crp_extra_001',
    title: 'Ocak 2026 İlk Hafta Değerlendirmesi',
    type: 'HAFTALIK',
    content: 'Çatışmanın ilk haftasında hava operasyonları yoğunlaştı. İran hava savunması beklenenden etkili performans gösterdi. Hürmüz Boğazı trafiği %40 azaldı. Sivil kayıplar artmaya başladı.',
    summary: 'İlk hafta: Hava üstünlüğü mücadelesi, Hürmüz trafiği azaldı, sivil kayıplar artışta.',
    period: 'Ocak 2026 — Hafta 1',
    publishedAt: new Date('2026-01-12'),
  },
  {
    id: 'crp_extra_002',
    title: 'Ocak 2026 İkinci Hafta Değerlendirmesi',
    type: 'HAFTALIK',
    content: 'Kara harekatı başladı. Huzistan bölgesinde zırhlı muharebe yoğunlaştı. İran siber saldırı kapasitesini kullanmaya başladı. Diplomatik kanallar tıkandı.',
    summary: 'İkinci hafta: Kara harekatı başlangıcı, siber savaş boyutu eklendi.',
    period: 'Ocak 2026 — Hafta 2',
    publishedAt: new Date('2026-01-19'),
  },
  {
    id: 'crp_extra_003',
    title: 'Şubat 2026 İlk Hafta Değerlendirmesi',
    type: 'HAFTALIK',
    content: 'Tahran ilk kez doğrudan vuruldu. İnsani kriz derinleşti. Mülteci sayısı 200.000\'i geçti. Petrol fiyatları 130 doları gördü.',
    summary: 'Tahran vuruldu, mülteci krizi büyüdü, petrol 130 dolar.',
    period: 'Şubat 2026 — Hafta 1',
    publishedAt: new Date('2026-02-09'),
  },
  {
    id: 'crp_extra_004',
    title: 'Mart 2026 Özel Rapor: Siber Savaş Boyutu',
    type: 'OZEL',
    content: 'İran\'ın siber kapasitesi beklenenden güçlü çıktı. Enerji altyapısı, iletişim ağları ve finansal sistemler hedef alındı. Her iki taraf da siber silahları etkin kullanıyor.',
    summary: 'Siber savaş analizi: Her iki tarafın kapasitesi ve hedefleri.',
    period: 'Mart 2026',
    publishedAt: new Date('2026-03-05'),
  },
  {
    id: 'crp_extra_005',
    title: 'Özel Rapor: Hürmüz Boğazı Ekonomik Etki Analizi',
    type: 'OZEL',
    content: 'Hürmüz Boğazı\'ndaki gerilim küresel enerji piyasalarını derinden etkiledi. Günlük 21 milyon varil petrol geçişi tehlike altında. Sigorta maliyetleri %400 arttı.',
    summary: 'Hürmüz krizi: Enerji piyasası etkileri ve ekonomik kayıp analizi.',
    period: 'Ocak-Mart 2026',
    publishedAt: new Date('2026-03-08'),
  },
  {
    id: 'crp_extra_006',
    title: 'Özel Rapor: İnsani Kriz ve Mülteci Durumu',
    type: 'OZEL',
    content: 'İran\'dan komşu ülkelere göç eden mülteci sayısı 500.000\'i aştı. Türkiye, Irak ve Afganistan sınırlarında kamplar kuruluyor. Sağlık sistemi çöküş eşiğinde.',
    summary: '500.000+ mülteci, sağlık sistemi çöküşte, insani koridor ihtiyacı acil.',
    period: 'Ocak-Mart 2026',
    publishedAt: new Date('2026-03-10'),
  },
]
