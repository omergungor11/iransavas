import { PrismaClient } from '@prisma/client'
import { extraNewsArticles, extraWarEvents, extraCasualtyReports, extraTimelineEntries, extraReports } from './seed-extra'

const prisma = new PrismaClient()

async function main() {
  console.log('Seed verisi ekleniyor...')

  // ---------------------------------------------------------------------------
  // NEWS ARTICLES
  // ---------------------------------------------------------------------------
  const newsArticles = [
    {
      id: 'cna001iransavas2026a',
      title: 'İran Hava Kuvvetleri Körfez\'de Tatbikat Başlattı',
      slug: 'iran-hava-kuvvetleri-korfezde-tatbikat-baslatti',
      content: `İran Hava Kuvvetleri, Basra Körfezi ve Hürmüz Boğazı üzerinde kapsamlı bir hava tatbikatı başlattı. "Büyük Peygamber 18" adıyla yürütülen tatbikata F-14 Tomcat, Mig-29 ve Su-22 savaş uçaklarının yanı sıra insansız hava araçları da katılıyor. İran Genelkurmay Başkanlığı, tatbikatın tamamen savunma amaçlı olduğunu ve ulusal egemenliğin korunması kapsamında değerlendirilmesi gerektiğini açıkladı. ABD'nin bölgedeki 5. Filosu tatbikatı yakından takip ederken, Körfez ülkeleri tedirginliklerini diplomatik kanallar aracılığıyla dile getirdi. Tatbikat süresince Hürmüz Boğazı'nda ticari deniz trafiği yüzde kırk oranında yavaşladı; petrol tankerleri alternatif güzergahlar aramaya başladı.`,
      summary: 'İran, Basra Körfezi\'nde kapsamlı hava tatbikatı başlattı; Hürmüz Boğazı\'ndaki deniz trafiği yavaşladı.',
      aiSummary: 'İran Hava Kuvvetleri\'nin Körfez tatbikatı bölgesel tansiyon ve deniz trafiği üzerinde belirgin etkiler yaratıyor.',
      source: 'Reuters',
      sourceUrl: 'https://reuters.com',
      category: "ASKERI",
      publishedAt: new Date('2026-01-05T08:30:00Z'),
    },
    {
      id: 'cna002iransavas2026b',
      title: 'BM: İran\'daki Sivil Kayıplar Endişe Verici Boyuta Ulaştı',
      slug: 'bm-iran-sivil-kayiplar-endise-verici-boyut',
      content: `Birleşmiş Milletler İnsancıl İşler Ofisi (OCHA), çatışmanın başladığı günden bu yana İran'da 4.200'ü aşkın sivilin hayatını kaybettiğini, 18.000'den fazla kişinin yaralandığını açıkladı. BM Genel Sekreteri'nin sözcüsü, sivilleri koruyan uluslararası insancıl hukukun tüm taraflarca gözetilmesini talep etti. Özellikle Huzistan ve Kirmanşah eyaletlerindeki kentsel alanlarda tahliye operasyonlarının son derece güç koşullarda yürütüldüğü belirtildi. Uluslararası Kızılhaç Komitesi (ICRC) temsilcileri bölgeye erişim talep ederken, İran hükümeti yabancı insancıl yardım kuruluşlarının operasyonlarını kısıtlamaya devam ediyor.`,
      summary: 'BM, İran\'da 4.200\'den fazla sivilin hayatını kaybettiğini açıkladı; insancıl yardım erişimi kısıtlanıyor.',
      aiSummary: 'İnsani kriz derinleşiyor; BM ve uluslararası kuruluşlar bölgeye erişimde ciddi engellerle karşılaşıyor.',
      source: 'Al Jazeera',
      sourceUrl: 'https://aljazeera.com',
      category: "INSANI_YARDIM",
      publishedAt: new Date('2026-01-08T14:00:00Z'),
    },
    {
      id: 'cna003iransavas2026c',
      title: 'Hürmüz Boğazı\'nda Tanker Krizi: Petrol Fiyatları Rekor Kırdı',
      slug: 'hurmuz-bogazi-tanker-krizi-petrol-fiyatlari-rekor',
      content: `Hürmüz Boğazı'nda yaşanan gerilim, küresel petrol piyasalarını derinden sarstı. Brent ham petrolü 142 dolar seviyesine yükselirken, doğalgaz fiyatları da tarihi zirvelere ulaştı. İran Devrim Muhafızları'na bağlı deniz kuvvetleri, boğazdan geçen iki Yunan bayraklı tankeri geçici olarak durdurdu. ABD ve AB, İran'a yönelik ek ekonomik yaptırım paketini acil gündem maddesi olarak Birleşmiş Milletler Güvenlik Konseyi'ne taşıdı. Uluslararası Denizcilik Örgütü (IMO), bölgedeki denizcilik güvenliği için kırmızı alarm ilan etti. Japonya ve Güney Kore hükümetleri, stratejik petrol rezervlerini serbest bırakmayı değerlendiriyor.`,
      summary: 'Hürmüz\'deki tanker krizinin ardından Brent petrol 142 dolara fırladı; piyasalar çalkantıda.',
      aiSummary: 'Hürmüz Boğazı krizi küresel enerji güvenliğini tehdit ediyor; petrol 142 dolar seviyesinde.',
      source: 'Financial Times',
      sourceUrl: 'https://ft.com',
      category: "EKONOMI",
      publishedAt: new Date('2026-01-12T10:15:00Z'),
    },
    {
      id: 'cna004iransavas2026d',
      title: 'Tahran-Bağdat Hattında Acil Ateşkes Görüşmeleri',
      slug: 'tahran-bagdat-acil-ateskez-gorusmeleri',
      content: `Irak Başbakanı Mohammed Şia el-Sudani, Tahran ve Washington arasında arabuluculuk girişimini başlatarak her iki tarafı acil ateşkes masasına davet etti. Bağdat'ta yürütülen kapalı kapı diplomatik görüşmelerine Türkiye, Katar ve Umman dışişleri bakanları da katıldı. İran heyeti, herhangi bir ateşkesin önkoşul olarak yabancı kuvvetlerin bölgeden çekilmesini içermesi gerektiğini vurgularken, karşı taraf bu talebi reddetti. Görüşmeler somut bir sonuç üretmeden sona erdi; ancak iletişim kanallarının açık tutulması konusunda mutabık kalındı. Bir sonraki görüşme turunun Muscat'ta gerçekleştirilmesi planlanıyor.`,
      summary: 'Irak arabuluculuğuyla başlatılan Tahran-Washington ateşkes görüşmeleri somut sonuç vermeden tamamlandı.',
      aiSummary: 'Çok taraflı diplomatik girişimler sürüyor; taraflar müzakere masasında ancak kritik konularda uzlaşı sağlanamıyor.',
      source: 'BBC Arabic',
      sourceUrl: 'https://bbc.com/arabic',
      category: "DIPLOMASI",
      publishedAt: new Date('2026-01-15T16:45:00Z'),
    },
    {
      id: 'cna005iransavas2026e',
      title: 'İsfahan Nükleer Tesisi Yakınında Patlama Rapor Edildi',
      slug: 'isfahan-nukleer-tesisi-yakininda-patlama',
      content: `İsfahan şehir merkezinin 30 kilometre kuzeyinde yer alan nükleer araştırma kompleksi yakınlarında şiddetli patlamalar duyulduğu bildirildi. İran Atom Enerjisi Kurumu, tesislerin hasar görmediğini ve radyasyon sızıntısı yaşanmadığını açıkladı. Ancak bölgeden gelen uydu görüntüleri, tesisin kuzeyindeki askeri depo alanında belirgin tahribatı ortaya koydu. Uluslararası Atom Enerjisi Ajansı (UAEA) acil durum komisyonu toplantıya çağırırken, İran nükleer program verilerinin paylaşımını askıya aldı. Batı istihbarat kaynakları, operasyonun sorumluluğunu üstlenen herhangi bir aktörün bulunmadığını, ancak çok sayıda ülkenin operasyonel kapasiteye sahip olduğunu belirtti.`,
      summary: 'İsfahan nükleer tesisi yakınında patlama yaşandı; UAEA acil toplantı çağrısında bulundu.',
      aiSummary: 'Nükleer tesise yakın bölgedeki patlama uluslararası kaygıları tırmandırıyor; İran veri paylaşımını durdurdu.',
      source: 'The Guardian',
      sourceUrl: 'https://theguardian.com',
      category: "ASKERI",
      publishedAt: new Date('2026-01-18T22:00:00Z'),
    },
    {
      id: 'cna006iransavas2026f',
      title: 'İran Riyal\'i Çöktü: Vatandaşlar Döviz Kuyruğunda',
      slug: 'iran-riyali-coktu-vatandaslar-doviz-kuyrugunda',
      content: `İran Riyali, son altı ayda dolar karşısında değerinin yüzde yetmiş ikiyle geriledi. Tahran'daki serbest piyasada bir dolar 980.000 riyale denk gelirken, hükümet resmi kurunu 42.000 riyalde sabit tutmaya çalışıyor. Aradaki derin kur makası karaborsacılığı ve sermaye kaçışını körüklüyor. Yüksek enflasyon ve temel gıda maddelerindeki keskin fiyat artışları nedeniyle halk arasında gerginlik tırmanıyor; Tahran başta olmak üzere büyük şehirlerde spontane protesto gösterileri gözlemleniyor. Ekonomistler, mevcut koşullarda İran ekonomisinin 2026 yılı sonuna kadar yüzde yirmi beş oranında küçülebileceğini öngörüyor.`,
      summary: 'İran Riyali dolar karşısında yüzde 72 değer yitirdi; ekonomik kriz toplumsal huzursuzluğu derinleştiriyor.',
      aiSummary: 'Para birimi çöküşü, yüksek enflasyon ve gıda krizi İran\'da toplumsal gerilimi kritik eşiğe taşıdı.',
      source: 'Bloomberg',
      sourceUrl: 'https://bloomberg.com',
      category: "EKONOMI",
      publishedAt: new Date('2026-01-22T09:00:00Z'),
    },
    {
      id: 'cna007iransavas2026g',
      title: 'Huzistan\'da Mülteci Kampları Kapasite Sınırını Aştı',
      slug: 'huzistan-multeci-kamplari-kapasite-sinirini-asti',
      content: `Irak sınırına yakın Huzistan eyaletinde kurulan mülteci kampları, 340.000'i aşkın yerinden edilmiş kişiyle kapasitelerinin çok üzerinde işliyor. BM Mülteciler Yüksek Komiserliği (UNHCR), acil insancıl yardım için 800 milyon dolar bütçeli bir fon çağrısı yaptı. Kamplarda temiz içme suyu, yeterli gıda ve temel tıbbi malzemelerin temininde ciddi güçlükler yaşandığı bildiriliyor; kolera ve tifo vakalarında artış gözlemleniyor. Türkiye ve Katar, insancıl malzeme taşıyan uçuşlara destek verirken, çatışmanın sürmesi nedeniyle kara güzergahları büyük ölçüde kapanmış durumda. Sağlık görevlileri olası bir salgın hastalık dalgasına karşı uyarıda bulunuyor.`,
      summary: 'Huzistan\'daki mülteci kampları aşırı dolulukla boğuşuyor; salgın hastalık riski yüksek.',
      aiSummary: 'Huzistan\'daki insani kriz büyüyor: 340.000 yerinden edilmiş kişi, kamp kapasitesi aşıldı, salgın uyarıları başladı.',
      source: 'UNHCR',
      sourceUrl: 'https://unhcr.org',
      category: "INSANI_YARDIM",
      publishedAt: new Date('2026-01-28T11:30:00Z'),
    },
    {
      id: 'cna008iransavas2026h',
      title: 'Devrim Muhafızları Irak Sınırı Boyunca Kuvvet Yığdı',
      slug: 'devrim-muhafizlari-irak-siniri-kuvvet-yigdi',
      content: `Uydu görüntüleri ve sahada bulunan muhabirlerin raporları, İran Devrim Muhafızları'nın Irak sınırına paralel konumdaki Kirmanşah ve Huzistan eyaletlerinde yoğun kuvvet konuşlandırdığını ortaya koyuyor. Bölgede 40.000'den fazla personel, çok sayıda zırhlı araç ve kısa menzilli balistik füze sisteminin konuşlandırıldığı değerlendiriliyor. ABD Merkez Kuvvetleri (CENTCOM) bölgedeki keşif ve gözetleme uçuşlarını artırdı. Irak hükümeti bu gelişmeden kaygı duyduğunu ve toprak bütünlüğüne saygı gösterilmesi çağrısını yinelediğini açıkladı.`,
      summary: 'İran, Irak sınırına 40.000\'i aşkın asker ve füze sistemleri konuşlandırdı.',
      aiSummary: 'İran-Irak sınırındaki büyük çaplı kuvvet yığılması, olası bir sınır ötesi harekât riskini belirgin biçimde artırıyor.',
      source: 'Defense News',
      sourceUrl: 'https://defensenews.com',
      category: "ASKERI",
      publishedAt: new Date('2026-02-02T07:45:00Z'),
    },
    {
      id: 'cna009iransavas2026i',
      title: 'Avrupa\'dan İran Petrolü Ambargosu: Türkiye\'ye Baskı',
      slug: 'avrupadan-iran-petrol-ambargosu-turkiyeye-baski',
      content: `Avrupa Birliği, İran menşeli petrol ve petrol ürünlerinin ithalatını tamamen yasaklayan yeni bir yaptırım paketi kabul etti. Bu karar çerçevesinde Türkiye'ye de İran petrol transferlerine aracılık etmemesi yönünde sert bir uyarı iletildi. Ankara, egemen ekonomik kararlarının üçüncü taraflarca dikte edilemeyeceğini vurgulayarak yaptırımlara uymayacağını ima etti. Türkiye-AB ilişkileri yeni bir kırılganlık dönemine girerken, Ankara bağımsız dış politika çizgisini koruduğunu teyit etti. Türkiye, İran doğalgazının Avrupa'ya taşınmasında kritik bir transit merkezi konumunda bulunuyor.`,
      summary: 'AB\'nin İran petrolü ambargosu Türkiye\'yi zor durumda bıraktı; Ankara yaptırımlara uymayacağını ima etti.',
      aiSummary: 'AB\'nin yaptırım genişlemesi Türkiye ile yeni bir gerilim ekseni oluşturuyor; enerji transferinde Ankara kilit konumda.',
      source: 'Euronews',
      sourceUrl: 'https://euronews.com',
      category: "SIYASI",
      publishedAt: new Date('2026-02-05T13:20:00Z'),
    },
    {
      id: 'cna010iransavas2026j',
      title: 'Tebriz\'de Sivil Altyapı Saldırıları: Elektrik Kesildi',
      slug: 'tebriz-sivil-altyapi-saldirilari-elektrik-kesildi',
      content: `Kuzeybatı İran'ın en büyük şehri Tebriz'de enerji altyapısını hedef alan saldırılar sonucunda elektrik ve doğalgaz dağıtım tesisleri ağır hasar gördü. 1,7 milyonu aşkın nüfusuyla İran'ın dördüncü büyük şehri olan Tebriz'in yüzde seksenine elektrik verilemiyor; kış koşullarında ısınma krizi baş gösterdi. İran hükümeti sivil altyapıyı kasıtlı olarak hedef aldığını öne sürdüğü tarafa ait hedeflere yönelik misilleme operasyonu hazırlığında olduğunu açıkladı. Uluslararası İnsancıl Hukuk alanındaki uzmanlar, sivil altyapının tahrip edilmesinin savaş suçu kapsamında değerlendirilebileceğinin altını çizdi.`,
      summary: 'Tebriz\'de altyapı saldırıları 1,7 milyon kişiyi ısınma krizine sürükledi; savaş suçu iddiaları gündeme geldi.',
      aiSummary: 'Tebriz\'deki altyapı tahribatı sivil nüfusu kışın ortasında elektrik ve ısınmadan yoksun bıraktı.',
      source: 'CNN International',
      sourceUrl: 'https://cnn.com',
      category: "INSANI_YARDIM",
      publishedAt: new Date('2026-02-10T18:00:00Z'),
    },
    {
      id: 'cna011iransavas2026k',
      title: 'Katar Arabuluculuğuyla Esir Takası Gerçekleşti',
      slug: 'katar-arabuluculuguyla-esir-takasi-gerceklesti',
      content: `Katar'ın yoğun diplomatik çabaları sonucunda taraflar arasında 120 savaş esirinin karşılıklı serbest bırakıldığı esir takası gerçekleştirildi. Doha'da düzenlenen teslim törenine ICRC temsilcileri de eşlik etti. Serbest bırakılan esirler, Katar'ın başkenti Doha'da tıbbi muayene ve psikolojik destek hizmetlerinden yararlandıktan sonra ülkelerine iade edilecek. Bu esir takası, son iki ay içinde yürütülen müzakerelerin ilk somut meyvesini oluşturdu ve ateşkes süreçlerine ivme kazandırabilecek güven artırıcı bir adım olarak değerlendiriliyor.`,
      summary: 'Katar arabuluculuğuyla 120 savaş esiri karşılıklı olarak serbest bırakıldı; ilk somut diplomatik adım.',
      aiSummary: 'Esir takası iki aylık müzakere sürecinin ilk elle tutulur sonucu; ateşkes umutları yeşerdi.',
      source: 'Al Arabiya',
      sourceUrl: 'https://alarabiya.net',
      category: "DIPLOMASI",
      publishedAt: new Date('2026-02-14T20:30:00Z'),
    },
    {
      id: 'cna012iransavas2026l',
      title: 'Bandar Abbas Liman Kenti Ağır Hasar Altında',
      slug: 'bandar-abbas-liman-kenti-agir-hasar',
      content: `Hürmüz Boğazı'nın girişinde stratejik konumuyla öne çıkan Bandar Abbas, son haftalarda yoğun çatışmaların odak noktası haline geldi. Limandaki konteyner ve petrol depolama tesislerinin yüzde kırkından fazlası işlevsiz durumda. Bölgedeki sivil nüfus büyük çaplı tahliye edilirken, kent merkezinde ağır kentsel çatışma izleri dikkat çekiyor. İran Deniz Kuvvetleri Komutanlığı, Bandar Abbas'ın her koşulda savunulacağını açıkladı. Körfez'de seyreden ticaret gemileri, alternatif güzergah arayışıyla rotalarını giderek daha yüksek maliyetli Ümit Burnu üzerinden çeviriyor.`,
      summary: 'Bandar Abbas liman kenti yoğun çatışmaların ortasında; stratejik liman altyapısının yüzde 40\'ı devre dışı.',
      aiSummary: 'Bandar Abbas\'taki tahribat Körfez ticaretini tehdit ediyor; gemiler pahalı alternatif güzergahlara yöneldi.',
      source: 'Reuters',
      sourceUrl: 'https://reuters.com',
      category: "ASKERI",
      publishedAt: new Date('2026-02-18T06:15:00Z'),
    },
    {
      id: 'cna013iransavas2026m',
      title: 'İran\'da Sağlık Sistemi Çöküş Eşiğinde',
      slug: 'iran-saglik-sistemi-cokus-esiginde',
      content: `Dünya Sağlık Örgütü, İran'daki sağlık sisteminin çöküş eşiğine geldiğini ilan etti. Hastanelerin yüzde altmışı kapasitesinin üzerinde çalışırken, cerrahi müdahale gerektiren yaralıların büyük bölümü tedavi olanağı bulamıyor. İlaç ve tıbbi malzeme stokları kritik düzeyin altına düştü; anestezik maddeler ve antibiyotikler başta olmak üzere temel ilaçlar bulunamıyor. Yabancı sağlık ekiplerinin bölgeye girişine izin verilmediğini açıklayan WHO, acil insani yardım koridoru oluşturulması çağrısında bulundu. İran Sağlık Bakanlığı, diyaliz hastaları dahil on binlerce kronik hastanın hayati riskle karşı karşıya olduğunu doğruladı.`,
      summary: 'DSÖ, İran sağlık sisteminin çöküş noktasına geldiğini açıkladı; ilaç ve malzeme stokları kritik seviyede.',
      aiSummary: 'İran\'da sağlık sistemi krizin eşiğinde; DSÖ acil insani koridor kurulması çağrısında bulundu.',
      source: 'WHO',
      sourceUrl: 'https://who.int',
      category: "INSANI_YARDIM",
      publishedAt: new Date('2026-02-22T09:45:00Z'),
    },
    {
      id: 'cna014iransavas2026n',
      title: 'Rusya ve Çin BM Kararına Veto Uyguladı',
      slug: 'rusya-cin-bm-kararina-veto-uyguladi',
      content: `Rusya ve Çin, BM Güvenlik Konseyi'nde oylamaya sunulan ve İran'a kapsamlı silah ambargosu ile çatışmanın sona erdirilmesini öngören taslak kararı veto etti. ABD, İngiltere ve Fransa tarafından ortak sunulan taslak 10 ret oyu, 3 çekimser ve 2 veto ile reddedildi. Rusya Dışişleri Bakanı, ambargonun sorunu derinleştireceğini ve bölgesel güç dengelerini bozacağını savundu. Çin ise kararın müzakere süreçlerine zarar verebileceğini belirterek vetosunu oylama öncesi bildirdi. Bu gelişme, küresel düzeyde jeopolitik bloklaşmanın belirginleştiğinin yeni bir işareti olarak değerlendirildi.`,
      summary: 'Rusya ve Çin, İran\'a yönelik silah ambargosu içeren BM Güvenlik Konseyi kararını veto etti.',
      aiSummary: 'Çifte veto, BM\'nin etkin müdahale kapasitesini kısıtlarken küresel jeopolitik bölünmeyi de tescilledi.',
      source: 'UN News',
      sourceUrl: 'https://news.un.org',
      category: "SIYASI",
      publishedAt: new Date('2026-02-26T17:00:00Z'),
    },
    {
      id: 'cna015iransavas2026o',
      title: 'Ahvaz\'da Petrol Tesisleri Yangınla Boğuşuyor',
      slug: 'ahvaz-petrol-tesisleri-yanginla-bogusiyor',
      content: `Güneybatı İran'ın petrol zengini kenti Ahvaz'da, Arap Şattularap nehri kıyısındaki dev petrokimya ve ham petrol işleme tesislerini kapsayan devasa bir yangın çıktı. Uluslararası enerji kuruluşlarının verilerine göre yangın, İran'ın günlük toplam ham petrol üretim kapasitesinin yüzde on beşini doğrudan tehdit ediyor. Bölge üzerindeki yoğun dumanı gösteren uydu görüntüleri sosyal medyada hızla yayıldı. İran Ulusal Petrol Şirketi, üretim kayıplarının kısa vadede telafi edilemeyeceğini kabul ederek üçüncü ülkelerdeki alıcılara mücbir sebep bildirimi gönderdi. Yangının kontrolden çıkması durumunda ham petrol fiyatlarının 160 doları aşabileceği öngörülüyor.`,
      summary: 'Ahvaz\'daki petrol tesisi yangını İran\'ın petrol üretim kapasitesinin yüzde 15\'ini tehdit ediyor.',
      aiSummary: 'Ahvaz petrol yangını küresel enerji piyasaları için yeni bir şok dalgası oluşturabilir; fiyatların 160 dolara çıkma riski var.',
      source: 'Bloomberg Energy',
      sourceUrl: 'https://bloomberg.com/energy',
      category: "EKONOMI",
      publishedAt: new Date('2026-03-01T04:30:00Z'),
    },
    {
      id: 'cna016iransavas2026p',
      title: 'Uluslararası Ceza Mahkemesi İran\'da Savaş Suçu Soruşturması Başlattı',
      slug: 'uluslararasi-ceza-mahkemesi-iran-savas-sucu-sorusturmasi',
      content: `Uluslararası Ceza Mahkemesi (ICC) Savcılığı, İran çatışmasında tüm tarafların olası savaş suçlarını soruşturmak üzere resmi bir ön soruşturma açtı. Mahkeme savcısı, sivil altyapının tahrip edilmesini, orantısız güç kullanımını ve insani yardım erişiminin engellenmesini soruşturmanın odak konuları olarak belirledi. İran ve bazı diğer taraflar Roma Statüsü'nün imzacısı değil; ancak Birleşmiş Milletler Güvenlik Konseyi kararıyla dava mahkemeye taşınabilir. Olası suçların belgelenmesi amacıyla Tahran, İsfahan, Tebriz ve Ahvaz başta olmak üzere birden fazla kentten tanıklık toplamak üzere bir soruşturma ekibi bölgeye sevk edildi.`,
      summary: 'ICC, İran\'da sivillere yönelik olası suçları soruşturmak için resmi ön soruşturma başlattı.',
      aiSummary: 'Uluslararası hukuki sorumluluk süreci başladı; ICC soruşturması siyasi baskıyı artırabilir.',
      source: 'ICC',
      sourceUrl: 'https://icc-cpi.int',
      category: "SIYASI",
      publishedAt: new Date('2026-03-03T11:00:00Z'),
    },
  ]

  for (const article of newsArticles) {
    await prisma.newsArticle.upsert({
      where: { id: article.id },
      update: {},
      create: article,
    })
  }
  console.log(`${newsArticles.length} haber makalesi eklendi.`)

  // ---------------------------------------------------------------------------
  // WAR EVENTS
  // ---------------------------------------------------------------------------
  const warEvents = [
    {
      id: 'cwe001iransavas2026a',
      title: 'Hürmüz Boğazı\'nda Deniz Kuvvetleri Çatışması',
      description: 'İran Devrim Muhafızları\'na ait sürat botları ile ABD 5. Filosu\'na bağlı USS Winston S. Churchill destroyeri arasında kısa süreli ateşli çatışma yaşandı. Çatışmada iki İran botu hasar görürken herhangi bir ölü rapor edilmedi.',
      date: new Date('2026-01-03T14:22:00Z'),
      latitude: 26.5667,
      longitude: 56.2500,
      eventType: "DENIZ_OPERASYONU",
      severity: "YUKSEK",
      casualties: 4,
      source: 'CENTCOM',
    },
    {
      id: 'cwe002iransavas2026b',
      title: 'Tahran Çevresi Hava Saldırıları',
      description: 'Tahran\'ın güneydoğu banliyölerindeki savunma sanayi tesislerini ve Devrim Muhafızları komuta merkezlerini hedef alan çok dalgalı hava saldırısı gerçekleştirildi. Saldırılarda S-300 hava savunma sistemlerinin de konuşlu olduğu tesisler büyük hasar gördü.',
      date: new Date('2026-01-07T02:15:00Z'),
      latitude: 35.6892,
      longitude: 51.3890,
      eventType: "HAVA_SALDIRISI",
      severity: "KRITIK",
      casualties: 47,
      source: 'IDF Spokesperson',
    },
    {
      id: 'cwe003iransavas2026c',
      title: 'Kirmanşah Sınır Hattında Kara Çatışması',
      description: 'Irak sınırına yakın Kirmanşah bölgesinde İran Kara Kuvvetleri unsurları ile karşı güçler arasında 18 saat süren yoğun kara muharebesi gerçekleşti. Her iki taraf da topçu ve zırhlı araç desteği kullandı.',
      date: new Date('2026-01-10T09:00:00Z'),
      latitude: 34.3142,
      longitude: 47.0650,
      eventType: "CATISMA",
      severity: "YUKSEK",
      casualties: 89,
      source: 'IRGC Media',
    },
    {
      id: 'cwe004iransavas2026d',
      title: 'Buşehr Nükleer Santrali Yakınında Saldırı',
      description: 'Buşehr Nükleer Santrali\'nin 12 kilometre güneyinde bulunan sahil savunma mevzileri ve radar istasyonları füze saldırısıyla tahrip edildi. İran yetkililerine göre santralin kendisine herhangi bir zarar verilmedi.',
      date: new Date('2026-01-14T23:45:00Z'),
      latitude: 28.9684,
      longitude: 50.8385,
      eventType: "HAVA_SALDIRISI",
      severity: "KRITIK",
      casualties: 12,
      source: 'Reuters',
    },
    {
      id: 'cwe005iransavas2026e',
      title: 'İsfahan Hava Üssü Saldırısı',
      description: 'İran\'ın önde gelen hava üslerinden İsfahan Şahin Şehir Hava Üssü, hassas güdümlü mühimmatla gerçekleştirilen kapsamlı bir saldırıya maruz kaldı. Pist ve uçak hangarlarında ciddi hasarın yanı sıra birden fazla savaş uçağı tahrip edildi ya da tamamen imha edildi.',
      date: new Date('2026-01-19T04:30:00Z'),
      latitude: 32.6546,
      longitude: 51.6680,
      eventType: "HAVA_SALDIRISI",
      severity: "YUKSEK",
      casualties: 23,
      source: 'Jane\'s Defence',
    },
    {
      id: 'cwe006iransavas2026f',
      title: 'Ahvaz Petrol Rafinerisi Yangını',
      description: 'Ahvaz\'daki Abadan Rafinerisi\'nin depolama tanklarına yönelik saldırı sonucu çıkan yangın kontrol altına alınamadı. Fabrika sahası 72 saat boyunca alevler içinde kaldı; yangın bölge çevresinde ciddi çevre kirliliğine neden oldu.',
      date: new Date('2026-01-23T11:00:00Z'),
      latitude: 31.3183,
      longitude: 48.6706,
      eventType: "HAVA_SALDIRISI",
      severity: "YUKSEK",
      casualties: 31,
      source: 'NIOC',
    },
    {
      id: 'cwe007iransavas2026g',
      title: 'Tebriz Şehir Merkezi Topçu Bombardımanı',
      description: 'Kuzeybatı İran\'ın merkezindeki Tebriz\'de şehir merkezine yönelik uzun menzilli topçu atışları gerçekleştirildi. Saldırılar pazarlar, konut alanları ve elektrik altyapısını etkiledi; çok sayıda sivil hayatını kaybetti.',
      date: new Date('2026-01-27T16:30:00Z'),
      latitude: 38.0962,
      longitude: 46.2738,
      eventType: "CATISMA",
      severity: "KRITIK",
      casualties: 156,
      source: 'UN OCHA',
    },
    {
      id: 'cwe008iransavas2026h',
      title: 'Bandar Abbas Liman Çatışması',
      description: 'İran Deniz Kuvvetleri ve karşı deniz güçleri arasında Bandar Abbas açıklarında şiddetli bir deniz savaşı yaşandı. İki İran fırkateyni batarken bir destek gemisi de hasar gördü. Muharebe alanında arama-kurtarma operasyonları sürdürülüyor.',
      date: new Date('2026-02-01T08:45:00Z'),
      latitude: 27.1865,
      longitude: 56.2808,
      eventType: "DENIZ_OPERASYONU",
      severity: "KRITIK",
      casualties: 203,
      source: 'Naval Institute',
    },
    {
      id: 'cwe009iransavas2026i',
      title: 'Irak-İran Sınır Geçidi\'nde İnsani Kriz',
      description: 'Bağdat yakınlarındaki Hanekin-İran sınır kapısında 50.000\'den fazla sivil mahsur kaldı. Çatışmalar nedeniyle kapalı tutulan sınırı geçemeyen kalabalıklar arasında gıda ve su yetersizliği giderek kritik boyutlara ulaşıyor.',
      date: new Date('2026-02-04T12:00:00Z'),
      latitude: 34.3320,
      longitude: 45.8663,
      eventType: "INSANI_KRIZ",
      severity: "YUKSEK",
      casualties: 18,
      source: 'UNHCR',
    },
    {
      id: 'cwe010iransavas2026j',
      title: 'İsfahan\'da Kimyasal Silah İddiası',
      description: 'İsfahan banliyölerindeki bir saldırının ardından kimyasal maddeye maruz kalan hastalar yerel hastanelere başvurdu. OPCW (Kimyasal Silahların Yasaklanması Örgütü) durumu soruşturmak üzere acil bir uzman ekibi bölgeye sevk etti; iddialar hem İran hem de karşı taraf tarafından reddediliyor.',
      date: new Date('2026-02-08T19:20:00Z'),
      latitude: 32.5790,
      longitude: 51.5900,
      eventType: "DIGER",
      severity: "KRITIK",
      casualties: 67,
      source: 'OPCW',
    },
    {
      id: 'cwe011iransavas2026k',
      title: 'Basra Körfezi\'nde Mayın Operasyonu',
      description: 'İran Deniz Kuvvetleri\'ne atfedilen deniz mayını döşeme operasyonunun ardından Basra Körfezi\'ndeki ticari deniz trafiği ciddi ölçüde aksadı. ABD ve İngiliz mayın tarama gemileri bölgede temizleme operasyonu yürütürken bir ticaret gemisi mayına çarparak ağır hasar gördü.',
      date: new Date('2026-02-12T06:30:00Z'),
      latitude: 26.8000,
      longitude: 54.0000,
      eventType: "DENIZ_OPERASYONU",
      severity: "YUKSEK",
      casualties: 8,
      source: 'Lloyd\'s of London',
    },
    {
      id: 'cwe012iransavas2026l',
      title: 'Huzistan\'da Ağır Kara Muharebeleri',
      description: 'Huzistan ovasında zırhlı kuvvetlerin yoğun biçimde kullanıldığı bir dizi kara muharebesi yaşandı. Her iki taraf da önemli kayıplar verirken birden fazla M1 Abrams ve T-72 tankı tahrip edildi ya da imha edildi.',
      date: new Date('2026-02-16T10:15:00Z'),
      latitude: 31.5000,
      longitude: 48.8000,
      eventType: "CATISMA",
      severity: "KRITIK",
      casualties: 284,
      source: 'ISW',
    },
    {
      id: 'cwe013iransavas2026m',
      title: 'Katar Diplomatik Girişim Turu',
      description: 'Katar Dışişleri Bakanı Sheikh Mohammed bin Abdulrahman Al Thani, ateşkes müzakerelerini hızlandırmak amacıyla Tahran, Riyad ve Washington\'ı kapsayan yoğun diplomatik turu tamamladı. Tüm tarafların geri dönülemez sonuçlara yol açmaktan kaçınmak konusunda hemfikir olduğu belirtildi.',
      date: new Date('2026-02-20T14:00:00Z'),
      latitude: 25.2854,
      longitude: 51.5310,
      eventType: "DIPLOMASI",
      severity: "ORTA",
      casualties: 0,
      source: 'Qatari MFA',
    },
    {
      id: 'cwe014iransavas2026n',
      title: 'Tahran\'a Balistik Füze Saldırısı',
      description: 'Tahran\'ın güneybatı banliyölerini hedef alan çok sayıda balistik füze Devrim Muhafızları komuta ve kontrol merkezlerine isabet etti. İran\'ın S-300 sistemi bazı füzeleri düşürmeyi başardı; ancak birkaçı hedeflerine ulaşarak ağır hasar yarattı.',
      date: new Date('2026-02-24T03:00:00Z'),
      latitude: 35.5500,
      longitude: 51.2800,
      eventType: "HAVA_SALDIRISI",
      severity: "KRITIK",
      casualties: 112,
      source: 'IDF',
    },
    {
      id: 'cwe015iransavas2026o',
      title: 'Ahvaz Nehir Köprüsü Çöktürüldü',
      description: 'Ahvaz\'daki Karun Nehri üzerinden geçen ve lojistik açıdan son derece kritik olan ana köprü, hassas füze saldırısıyla tamamen yıkıldı. Köprünün çökmesi hem insani yardım ulaşımını hem de askeri ikmal hatlarını ciddi biçimde engelledi.',
      date: new Date('2026-02-28T11:30:00Z'),
      latitude: 31.3000,
      longitude: 48.7000,
      eventType: "HAVA_SALDIRISI",
      severity: "YUKSEK",
      casualties: 6,
      source: 'Reuters',
    },
    {
      id: 'cwe016iransavas2026p',
      title: 'Ormuz Boğazı Kıyısında İran Füze Bataryaları İmha Edildi',
      description: 'Hürmüz Boğazı\'nın kuzey kıyısında konuşlu İran kıyı savunma füze bataryaları yoğun hava saldırısıyla tahrip edildi. Saldırıda Nour ve Khalij Fars tipi gemisavar füze sistemleri hedef alındı; bu sistemler boğazdaki deniz trafiğine yönelik ciddi bir tehdit oluşturuyordu.',
      date: new Date('2026-03-02T05:45:00Z'),
      latitude: 26.9000,
      longitude: 56.5000,
      eventType: "HAVA_SALDIRISI",
      severity: "YUKSEK",
      casualties: 34,
      source: 'CENTCOM',
    },
    {
      id: 'cwe017iransavas2026q',
      title: 'Bağdat Yakınlarında İranlı Vekil Güçlere Saldırı',
      description: 'Irak\'ın başkenti Bağdat\'ın çevresindeki Ebu Garip bölgesinde konuşlu İranlı vekil milis güçlerine yönelik hava saldırısı düzenlendi. Irak hükümeti, kendi topraklarının üçüncü taraflarca savaş alanına dönüştürülmesini şiddetle kınayan resmi bir protesto notası yayımladı.',
      date: new Date('2026-03-03T22:10:00Z'),
      latitude: 33.3152,
      longitude: 44.3661,
      eventType: "HAVA_SALDIRISI",
      severity: "YUKSEK",
      casualties: 45,
      source: 'Al Monitor',
    },
    {
      id: 'cwe018iransavas2026r',
      title: 'Huzistan\'da İnsani Yardım Konvoyu Vuruldu',
      description: 'BM ve Uluslararası Kızılhaç bayrağı taşıyan insani yardım konvoyu, Huzistan\'da kimliği henüz tespit edilemeyen grupların saldırısına uğradı. Saldırıda 7 insani yardım çalışanı hayatını kaybetti; BM uluslararası insancıl hukukun bu en ağır ihlalini şiddetle kınadı.',
      date: new Date('2026-02-06T13:30:00Z'),
      latitude: 31.1000,
      longitude: 49.2000,
      eventType: "INSANI_KRIZ",
      severity: "KRITIK",
      casualties: 7,
      source: 'UN OCHA',
    },
    {
      id: 'cwe019iransavas2026s',
      title: 'İran Denizaltısı Boğaz\'da Batırıldı',
      description: 'İran Deniz Kuvvetleri\'ne ait Kilo sınıfı bir denizaltı, Hürmüz Boğazı açıklarındaki deniz savaşında USN tarafından operasyonel olarak etkisiz kılındı. Mürettebatın kurtarılmasına yönelik arama operasyonu sürdürülüyor.',
      date: new Date('2026-01-31T07:00:00Z'),
      latitude: 26.6000,
      longitude: 56.9000,
      eventType: "DENIZ_OPERASYONU",
      severity: "KRITIK",
      casualties: 78,
      source: 'Naval News',
    },
    {
      id: 'cwe020iransavas2026t',
      title: 'Tahran\'da Hava Savunma Sistemi Devreye Alındı',
      description: 'İran, başkent Tahran çevresindeki S-300 ve Bavar-373 hava savunma sistemlerini yüksek alarm durumuna geçirdi. Gece boyunca süren hava saldırısı dalgalarında birden fazla hedef füzesi düşürüldü; ancak bazı saldırılar savunmayı aşmayı başardı.',
      date: new Date('2026-01-25T01:00:00Z'),
      latitude: 35.7500,
      longitude: 51.4000,
      eventType: "HAVA_SALDIRISI",
      severity: "KRITIK",
      casualties: 38,
      source: 'IRGC',
    },
  ]

  const createdEvents: Record<string, string> = {}
  for (const event of warEvents) {
    const created = await prisma.warEvent.upsert({
      where: { id: event.id },
      update: {},
      create: event,
    })
    createdEvents[event.id] = created.id
  }
  console.log(`${warEvents.length} savaş olayı eklendi.`)

  // ---------------------------------------------------------------------------
  // CASUALTY REPORTS
  // ---------------------------------------------------------------------------
  const casualtyReports = [
    {
      id: 'ccr001iransavas2026a',
      date: new Date('2026-01-07T00:00:00Z'),
      civilianCasualties: 142,
      militaryCasualties: 89,
      injured: 430,
      displaced: 12500,
      region: 'Tahran ve Çevresi',
      source: 'UN OCHA',
    },
    {
      id: 'ccr002iransavas2026b',
      date: new Date('2026-01-14T00:00:00Z'),
      civilianCasualties: 203,
      militaryCasualties: 156,
      injured: 780,
      displaced: 34200,
      region: 'Huzistan',
      source: 'Iran Red Crescent',
    },
    {
      id: 'ccr003iransavas2026c',
      date: new Date('2026-01-21T00:00:00Z'),
      civilianCasualties: 89,
      militaryCasualties: 234,
      injured: 312,
      displaced: 8900,
      region: 'Kirmanşah',
      source: 'UNHCR',
    },
    {
      id: 'ccr004iransavas2026d',
      date: new Date('2026-01-28T00:00:00Z'),
      civilianCasualties: 312,
      militaryCasualties: 178,
      injured: 920,
      displaced: 67800,
      region: 'Tebriz ve Kuzeybatı İran',
      source: 'WHO',
    },
    {
      id: 'ccr005iransavas2026e',
      date: new Date('2026-02-04T00:00:00Z'),
      civilianCasualties: 178,
      militaryCasualties: 445,
      injured: 560,
      displaced: 89000,
      region: 'Hürmüz Boğazı ve Bandar Abbas',
      source: 'IMO',
    },
    {
      id: 'ccr006iransavas2026f',
      date: new Date('2026-02-11T00:00:00Z'),
      civilianCasualties: 267,
      militaryCasualties: 389,
      injured: 1240,
      displaced: 124000,
      region: 'İsfahan',
      source: 'UN OCHA',
    },
    {
      id: 'ccr007iransavas2026g',
      date: new Date('2026-02-18T00:00:00Z'),
      civilianCasualties: 445,
      militaryCasualties: 512,
      injured: 1680,
      displaced: 180000,
      region: 'Ahvaz ve Güneybatı İran',
      source: 'ICRC',
    },
    {
      id: 'ccr008iransavas2026h',
      date: new Date('2026-02-25T00:00:00Z'),
      civilianCasualties: 389,
      militaryCasualties: 623,
      injured: 1920,
      displaced: 220000,
      region: 'Tahran Büyük İl',
      source: 'Iran Ministry of Health',
    },
    {
      id: 'ccr009iransavas2026i',
      date: new Date('2026-03-03T00:00:00Z'),
      civilianCasualties: 512,
      militaryCasualties: 734,
      injured: 2340,
      displaced: 340000,
      region: 'Genel Ulusal Toplam',
      source: 'UN OCHA',
    },
    {
      id: 'ccr010iransavas2026j',
      date: new Date('2026-01-10T00:00:00Z'),
      civilianCasualties: 34,
      militaryCasualties: 112,
      injured: 78,
      displaced: 4500,
      region: 'Buşehr ve Körfez Kıyısı',
      source: 'Reuters',
    },
    {
      id: 'ccr011iransavas2026k',
      date: new Date('2026-01-17T00:00:00Z'),
      civilianCasualties: 67,
      militaryCasualties: 43,
      injured: 145,
      displaced: 15600,
      region: 'Irak Sınır Bölgesi',
      source: 'UNHCR',
    },
    {
      id: 'ccr012iransavas2026l',
      date: new Date('2026-02-07T00:00:00Z'),
      civilianCasualties: 7,
      militaryCasualties: 0,
      injured: 12,
      displaced: 0,
      region: 'İnsani Yardım Koridorları',
      source: 'UN OCHA',
    },
  ]

  for (const report of casualtyReports) {
    await prisma.casualtyReport.upsert({
      where: { id: report.id },
      update: {},
      create: report,
    })
  }
  console.log(`${casualtyReports.length} kayıp raporu eklendi.`)

  // ---------------------------------------------------------------------------
  // TIMELINE ENTRIES
  // ---------------------------------------------------------------------------
  const timelineEntries = [
    {
      id: 'ctl001iransavas2026a',
      title: 'Hürmüz Boğazı\'nda İlk Deniz Çatışması',
      description: 'İran Devrim Muhafızları sürat botları ile ABD destroyeri arasındaki çatışmayla çatışma resmen başladı. Uluslararası kamuoyu teyakkuza geçti.',
      date: new Date('2026-01-03T14:22:00Z'),
      category: 'Askeri',
      importance: "CRITICAL",
      relatedEventId: 'cwe001iransavas2026a',
    },
    {
      id: 'ctl002iransavas2026b',
      title: 'BM Güvenlik Konseyi Acil Toplantıya Çağrıldı',
      description: 'ABD talebiyle BM Güvenlik Konseyi acil olağanüstü toplantı düzenledi; ancak Rusya ve Çin\'in muhalefeti herhangi bir karar alınmasını engelledi.',
      date: new Date('2026-01-04T18:00:00Z'),
      category: 'Diplomasi',
      importance: "HIGH",
      relatedEventId: null,
    },
    {
      id: 'ctl003iransavas2026c',
      title: 'Tahran\'a İlk Hava Saldırıları',
      description: 'İran başkentinin güneydoğu banliyölerindeki askeri tesisler hava saldırısıyla vuruldu. İran misilleme tehdidinde bulundu.',
      date: new Date('2026-01-07T02:15:00Z'),
      category: 'Askeri',
      importance: "CRITICAL",
      relatedEventId: 'cwe002iransavas2026b',
    },
    {
      id: 'ctl004iransavas2026d',
      title: 'Küresel Petrol Piyasaları Sarsıldı',
      description: 'Hürmüz Boğazı\'ndaki tıkanıklık ve çatışmalar nedeniyle Brent petrol fiyatı 125 dolarla 4 yılın zirvesine fırladı.',
      date: new Date('2026-01-08T09:00:00Z'),
      category: 'Ekonomi',
      importance: "HIGH",
      relatedEventId: null,
    },
    {
      id: 'ctl005iransavas2026e',
      title: 'Buşehr Nükleer Santrali Yakınında Saldırı',
      description: 'Buşehr Nükleer Santrali yakınına yönelik saldırı uluslararası kamuoyunda büyük şok yarattı; UAEA acil toplanmaya çağrıldı.',
      date: new Date('2026-01-14T23:45:00Z'),
      category: 'Nükleer',
      importance: "CRITICAL",
      relatedEventId: 'cwe004iransavas2026d',
    },
    {
      id: 'ctl006iransavas2026f',
      title: 'İran Riyali Tarihi Değer Kaybına Uğradı',
      description: 'Çatışmanın başlamasının ardından 2 hafta içinde İran para birimi dolar karşısında yüzde 40 değer kaybetti; piyasalarda panik başladı.',
      date: new Date('2026-01-17T00:00:00Z'),
      category: 'Ekonomi',
      importance: "HIGH",
      relatedEventId: null,
    },
    {
      id: 'ctl007iransavas2026g',
      title: 'İsfahan Nükleer Tesisi Yakınında Patlama',
      description: 'İsfahan yakınlarındaki askeri alandaki patlama, çatışmanın nükleer boyut kazanma ihtimali konusunda ülkeleri yüksek alarm durumuna geçirdi.',
      date: new Date('2026-01-18T22:00:00Z'),
      category: 'Nükleer',
      importance: "CRITICAL",
      relatedEventId: 'cwe005iransavas2026e',
    },
    {
      id: 'ctl008iransavas2026h',
      title: 'Tebriz\'de Sivil Katliamı',
      description: 'Tebriz\'e yönelik topçu saldırısında 156 sivil hayatını kaybetti. Uluslararası toplumdan yoğun kınama mesajları geldi.',
      date: new Date('2026-01-27T16:30:00Z'),
      category: 'İnsani Kriz',
      importance: "CRITICAL",
      relatedEventId: 'cwe007iransavas2026g',
    },
    {
      id: 'ctl009iransavas2026i',
      title: 'İran Denizaltısı Batırıldı',
      description: 'İran\'a ait Kilo sınıfı denizaltının batırılması çatışmanın en kritik deniz muharebelerinden birini simgeledi.',
      date: new Date('2026-01-31T07:00:00Z'),
      category: 'Askeri',
      importance: "HIGH",
      relatedEventId: 'cwe019iransavas2026s',
    },
    {
      id: 'ctl010iransavas2026j',
      title: 'Bağdat\'ta Ateşkes Görüşmeleri Başladı',
      description: 'Irak arabuluculuğuyla başlatılan diplomatik sürecin ilk görüşme turu Bağdat\'ta yapıldı; ancak taraflar arasındaki derin uçurum nedeniyle somut ilerleme kaydedilemedi.',
      date: new Date('2026-01-15T16:45:00Z'),
      category: 'Diplomasi',
      importance: "HIGH",
      relatedEventId: null,
    },
    {
      id: 'ctl011iransavas2026k',
      title: 'Huzistan\'da İnsani Kriz İlanı',
      description: 'BM ve uluslararası insancıl yardım kuruluşları, 340.000 kişinin yerinden edildiği Huzistan için resmi insani kriz ilanında bulundu.',
      date: new Date('2026-01-28T11:30:00Z'),
      category: 'İnsani Kriz',
      importance: "HIGH",
      relatedEventId: null,
    },
    {
      id: 'ctl012iransavas2026l',
      title: 'İran İnsani Yardım Konvoyuna Saldırı',
      description: 'BM bayraklı insani yardım konvoyunun vurulması ve 7 yardım çalışanının hayatını kaybetmesi, çatışmada yaşandığı ileri sürülen en ağır insancıl hukuk ihlali olarak tarihe geçti.',
      date: new Date('2026-02-06T13:30:00Z'),
      category: 'İnsani Kriz',
      importance: "CRITICAL",
      relatedEventId: 'cwe018iransavas2026r',
    },
    {
      id: 'ctl013iransavas2026m',
      title: 'Katar Arabuluculuğuyla Esir Takası',
      description: '120 savaş esirinin karşılıklı serbest bırakıldığı esir takası, çatışma başladığından bu yana kaydedilen ilk somut diplomatik kazanım oldu.',
      date: new Date('2026-02-14T20:30:00Z'),
      category: 'Diplomasi',
      importance: "HIGH",
      relatedEventId: null,
    },
    {
      id: 'ctl014iransavas2026n',
      title: 'Rusya ve Çin BM Kararını Veto Etti',
      description: 'Rusya ve Çin\'in çifte vetosu uluslararası bir müdahale veya yaptırım olasılığını fiilen kapattı; krizin uzun süreceğine dair kaygılar yoğunlaştı.',
      date: new Date('2026-02-26T17:00:00Z'),
      category: 'Diplomasi',
      importance: "CRITICAL",
      relatedEventId: null,
    },
    {
      id: 'ctl015iransavas2026o',
      title: 'ICC Savaş Suçu Soruşturması Açıldı',
      description: 'Uluslararası Ceza Mahkemesi\'nin resmi soruşturma başlatması, olayların uluslararası yargıya taşınması ve bireylerin hesap vermesi açısından tarihî bir adım oldu.',
      date: new Date('2026-03-03T11:00:00Z'),
      category: 'Hukuk',
      importance: "HIGH",
      relatedEventId: null,
    },
    {
      id: 'ctl016iransavas2026p',
      title: 'Ahvaz Petrol Yangını: Küresel Enerji Krizi',
      description: 'Ahvaz\'daki petrol tesisi yangını İran\'ın üretim kapasitesini yüzde 15 oranında düşürdü; küresel enerji piyasalarında korkuyla şekillenen fiyatlamalar başladı.',
      date: new Date('2026-03-01T04:30:00Z'),
      category: 'Ekonomi',
      importance: "CRITICAL",
      relatedEventId: null,
    },
  ]

  for (const entry of timelineEntries) {
    await prisma.timelineEntry.upsert({
      where: { id: entry.id },
      update: {},
      create: entry,
    })
  }
  console.log(`${timelineEntries.length} zaman çizelgesi girişi eklendi.`)

  // ---------------------------------------------------------------------------
  // REPORTS
  // ---------------------------------------------------------------------------
  const reports = [
    {
      id: 'crp001iransavas2026a',
      title: 'İran Çatışması Haftalık Durum Raporu – 1. Hafta',
      type: "HAFTALIK",
      content: `## Yürütücü Özet

Çatışmanın birinci haftası (3–9 Ocak 2026), Hürmüz Boğazı'ndaki deniz çatışması ve Tahran'ın güneydoğu banliyölerine yönelik ilk hava saldırılarıyla açıldı.

## Askeri Durum

İran Devrim Muhafızları deniz kuvvetleri ve ABD 5. Filosu arasındaki deniz kuvvetleri etkileşimi, çatışmanın fitilini ateşledi. Tahran'daki hava saldırıları Devrim Muhafızları'nın komuta altyapısını ciddi ölçüde zayıflattı. İran, savunma kapasitesini muhafaza etmekle birlikte ilk darbelerle önemli kayıplar verdi.

## İnsani Durum

İlk haftada 434 kayıp (sivil ve asker) ve 430 yaralı rapor edildi. 47.600 kişinin yerinden edilmesiyle insani kriz hızla tırmanıyor.

## Ekonomik Etkiler

Petrol fiyatları varil başına 125 dolara fırladı. İran Riyali yüzde 40 değer kaybetti. Hürmüz Boğazı'ndan geçen deniz trafiği yüzde 40 oranında düştü.

## Diplomatik Gelişmeler

BM Güvenlik Konseyi Rusya ve Çin'in vetolarıyla kilitlendi. Bölgesel güçler ateşkes için acil çağrıda bulunuyor ancak taraflar müzakere masasına oturmayı henüz kabul etmedi.

## Önümüzdeki Hafta Beklentileri

Çatışmanın güney İran'a doğru yayılması ve deniz operasyonlarının tırmanması öngörülüyor. İnsani durum kritik eşiğe yaklaşıyor.`,
      summary: 'İlk hafta Hürmüz\'de başlayan deniz çatışması ve Tahran hava saldırılarıyla geçti; 434 kayıp, petrol 125 dolara yükseldi.',
      period: '3–9 Ocak 2026',
      publishedAt: new Date('2026-01-09T12:00:00Z'),
    },
    {
      id: 'crp002iransavas2026b',
      title: 'İran Çatışması Haftalık Durum Raporu – 4. Hafta',
      type: "HAFTALIK",
      content: `## Yürütücü Özet

Çatışmanın dördüncü haftası (24–30 Ocak 2026), insani krizin doruk noktasına ulaşmasıyla karakterize edildi. Tebriz saldırıları ve Huzistan'daki çarpışmalar şiddetini korurken çatışma coğrafi olarak genişledi.

## Askeri Durum

Tebriz'deki topçu atışları 156 sivil kayba neden oldu. İran Kara Kuvvetleri Kirmanşah'ta büyük çaplı karşı saldırı düzenledi. Deniz savaşları Bandar Abbas açıklarına kaydı; İran Deniz Kuvvetleri iki fırkateyn kaybetti.

## İnsani Durum

Kümülatif kayıp sayısı 1.400'ü geçti; 270.000'den fazla kişi yerinden edildi. Huzistan'da mülteci kampları kapasitelerinin 3 katında işliyor; salgın hastalık uyarıları çıkarıldı.

## Ekonomik Etkiler

Petrol 142 dolar seviyesini gördü. Japonya ve Güney Kore stratejik rezervlerini serbest bıraktı. İran'ın SWIFT'e erişimi tamamen kesildi.

## Diplomatik Gelişmeler

Bağdat görüşmeleri somut ilerleme kaydedilemeden tamamlandı. Katar'ın arabuluculuk girişimleri devam ediyor. Türkiye AB yaptırımlarını tanımayacağını açıkladı.

## Önümüzdeki Hafta Beklentileri

Katar'ın kolaylaştırdığı müzakere turu Muscat'ta toplanacak. İran'ın vekil güçleri aracılığıyla bölgede daha geniş bir cephe açması riski ciddiyet kazandı.`,
      summary: 'Dördüncü hafta insani krizin doruğuyla geçti; kümülatif kayıp 1.400, petrol 142 dolar, Tebriz\'de 156 sivil hayatını kaybetti.',
      period: '24–30 Ocak 2026',
      publishedAt: new Date('2026-01-30T12:00:00Z'),
    },
    {
      id: 'crp003iransavas2026c',
      title: 'İran Çatışması Ocak 2026 Aylık Analizi',
      type: "AYLIK",
      content: `## Aylık Kapsamlı Değerlendirme – Ocak 2026

### Genel Bakış

Ocak 2026, İran çatışmasının patlak verdiği ve hızla uluslararası bir krize dönüştüğü kritik bir ay oldu. Çatışma, Hürmüz Boğazı'ndaki deniz olayıyla başlayıp aylık süre zarfında çok cepheli bir savaşa evrildi.

### Kayıp İstatistikleri (Ocak Sonu İtibariyle)
- Toplam Sivil Kayıp: 813
- Toplam Askeri Kayıp: 1.012
- Toplam Yaralı: 2.100+
- Toplam Yerinden Edilmiş: 270.000+

### Askeri Denge

İran Hava Kuvvetleri'nin etkinliği ciddi biçimde sınırlandırıldı; savaş uçakları filosunun yaklaşık yüzde kırkı ya tahrip edildi ya da kullanılamaz hale geldi. İran Kara Kuvvetleri ise Kirmanşah'ta direncini sürdürüyor. Deniz güçleri taktik savunmaya çekildi.

### İnsani Göstergeler

BM insani yardım erişimi kısıtlı kalmaya devam ediyor; insani yardım talebi karşılanamıyor. Salgın hastalık riskleri uyarıcı eşiklere ulaştı. Altyapı tahribatı ciddi boyutlara ulaştı.

### Ekonomik Göstergeler

Brent petrol fiyatı +%73 artışla 125 dolar seviyesinde. İran Riyali dolar karşısında -%72 değer kaybında. İran'ın günlük petrol üretiminde %35 düşüş yaşandı.

### Jeopolitik Etkiler

ABD-Rusya ilişkileri en düşük seviyeye geriledi. Türkiye bağımsız pozisyonunu koruyor. Körfez ülkeleri aralarında derin bölünmeler yaşıyor.

### Şubat 2026 Tahmini

Çatışmanın yüksek yoğunlukta sürmesi ve insani krizin daha da derinleşmesi bekleniyor. Katar aracılığıyla sürdürülen diplomatik temas önem kazanıyor; ancak taraflar arasındaki amaç farklılıkları köklü biçimde devam ediyor.`,
      summary: 'Ocak 2026: Başlangıçtan aylık değerlendirme — 1.825 kayıp, 270.000 yerinden edilme, petrolde %73 artış, İran üretiminde %35 düşüş.',
      period: 'Ocak 2026',
      publishedAt: new Date('2026-02-01T08:00:00Z'),
    },
    {
      id: 'crp004iransavas2026d',
      title: 'Hürmüz Boğazı\'nda Deniz Güvenliği: Özel Değerlendirme',
      type: "OZEL",
      content: `## Hürmüz Boğazı Deniz Güvenliği Özel Raporu

### Giriş

Bu özel rapor, İran çatışmasının Hürmüz Boğazı üzerindeki etkilerini ve buna bağlı küresel denizcilik güvenliği açısından ortaya çıkan sonuçları kapsamlı biçimde analiz etmektedir.

### Güncel Operasyonel Durum

Boğazdan geçen ticaret trafiği normale kıyasla %60 oranında düştü. Navtex bildirimleri kapsamında tanımlanmış tehlike bölgeleri oluşturuldu. Pek çok büyük denizcilik şirketi boğazdan geçişleri geçici olarak askıya aldı.

### Tehdit Ortamı

**Mayın Tehdidi:** İran Deniz Kuvvetleri boğaz girişinde deniz mayınları döşedi. Bu tehdit, güzergahı doğal bir mayın bariyerine dönüştürme potansiyeli taşıyor.

**Sürat Botu Saldırıları:** Devrim Muhafızları sürat botları sürü taktikleriyle hareket ederek ticaret gemilerini tehdit ediyor.

**Füze Sistemleri:** Kuzey kıyıdaki kıyı savunma bataryaları tüm geçiş trafiğine ciddi bir tehdit oluşturuyor.

### Ekonomik Etkiler

Dünya petrol ticaretinin yaklaşık %20'si Hürmüz Boğazı'ndan geçmektedir. Boğazdaki mevcut aksaklık günde tahminen 2,1 milyar dolarlık ekonomik kayba neden olmaktadır.

### Tavsiyeler

Boğazdan geçişlerin askeri eskort eşliğinde sürdürülmesi kritik önem taşıyor. Ümit Burnu üzerinden geçen alternatif güzergahlar stratejik öncelik olarak değerlendirilmeli. Boğaz yakınlarındaki limanlar için kapsamlı acil durum planları hazırlanmalıdır.`,
      summary: 'Hürmüz Boğazı\'nda deniz trafiği %60 düşerken günlük 2,1 milyar dolarlık ekonomik kayıp yaşanıyor; mayın ve füze tehditleri kritik.',
      period: 'Ocak–Şubat 2026',
      publishedAt: new Date('2026-02-15T10:00:00Z'),
    },
    {
      id: 'crp005iransavas2026e',
      title: 'İran Çatışması Şubat 2026 Aylık Analizi',
      type: "AYLIK",
      content: `## Aylık Kapsamlı Değerlendirme – Şubat 2026

### Genel Bakış

Şubat 2026, çatışmanın en ağır insani bedelin ödendiği ay oldu. Katar'ın arabuluculuğuyla gerçekleştirilen esir takası ise diplomasi cephesindeki tek olumlu gelişme olarak tarihe geçti.

### Kayıp İstatistikleri (Şubat Sonu İtibariyle)
- Aylık Sivil Kayıp: 1.798
- Aylık Askeri Kayıp: 2.703
- Yeni Yaralı: 7.694
- Yeni Yerinden Edilmiş: 250.000+
- Kümülatif Toplam (2 Aylık): 4.200+ hayat kaybı, 520.000+ yerinden edilmiş

### Askeri Durum

Tahran'a yönelik balistik füze saldırıları çatışmanın en yoğun noktasına ulaştığını gösterdi. Huzistan'daki kara muharebelerinde her iki taraf da büyük çaplı zırhlı kuvvet kayıpları yaşadı. Bandar Abbas'taki çatışmalar stratejik liman altyapısını fiilen çökme noktasına getirdi.

### Diplomatik Dönüm Noktaları

Katar arabuluculuğuyla 120 savaş esiri serbest bırakıldı. Rusya ve Çin'in çifte vetosu, uluslararası toplumun kolektif eyleme geçme kapasitesini fiilen kilitledi. Muscat müzakereleri başladı ancak somut bir ilerleme kaydedilemedi.

### İnsani Kriz

Kümülatif yerinden edilmiş sayısı 520.000'i geçti. DSÖ, İran sağlık sisteminin çöküş eşiğine geldiğini resmen ilan etti. Bağımsız bir insani yardım çalışanları grubuna yönelik saldırı uluslararası tepkileri tırmandırdı.

### Mart 2026 Beklentisi

ICC soruşturması siyasi atmosferi değiştirebilir. Ahvaz petrol yangını küresel enerji güvenliği krizini yeni bir boyuta taşıdı.`,
      summary: 'Şubat 2026: Çatışmanın en yoğun ayı — kümülatif 4.200+ kayıp, 520.000+ yerinden edilme, tek olumlu gelişme Katar arabuluculuğuyla esir takası.',
      period: 'Şubat 2026',
      publishedAt: new Date('2026-03-01T08:00:00Z'),
    },
  ]

  for (const report of reports) {
    await prisma.report.upsert({
      where: { id: report.id },
      update: {},
      create: report,
    })
  }
  console.log(`${reports.length} rapor eklendi.`)

  // ---------------------------------------------------------------------------
  // EXTRA DATA
  // ---------------------------------------------------------------------------
  for (const article of extraNewsArticles) {
    await prisma.newsArticle.upsert({
      where: { id: article.id },
      update: {},
      create: article,
    })
  }
  console.log(`${extraNewsArticles.length} ek haber makalesi eklendi.`)

  for (const event of extraWarEvents) {
    await prisma.warEvent.upsert({
      where: { id: event.id },
      update: {},
      create: event,
    })
  }
  console.log(`${extraWarEvents.length} ek savaş olayı eklendi.`)

  for (const report of extraCasualtyReports) {
    await prisma.casualtyReport.upsert({
      where: { id: report.id },
      update: {},
      create: report,
    })
  }
  console.log(`${extraCasualtyReports.length} ek kayıp raporu eklendi.`)

  for (const entry of extraTimelineEntries) {
    await prisma.timelineEntry.upsert({
      where: { id: entry.id },
      update: {},
      create: entry,
    })
  }
  console.log(`${extraTimelineEntries.length} ek zaman çizelgesi girişi eklendi.`)

  for (const report of extraReports) {
    await prisma.report.upsert({
      where: { id: report.id },
      update: {},
      create: report,
    })
  }
  console.log(`${extraReports.length} ek rapor eklendi.`)

  console.log('Seed tamamlandı.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
