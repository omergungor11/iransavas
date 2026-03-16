export type SanctionCategory =
  | "Nükleer"
  | "Petrol/Enerji"
  | "Finans"
  | "Silah"
  | "Bireysel"
  | "Teknoloji";

export type SanctionImposedBy = "ABD" | "AB" | "BM" | "Diğer";

export type SanctionStatus = "Aktif" | "Askıya Alındı" | "Kaldırıldı";

export interface Sanction {
  id: string;
  title: string;
  imposedBy: SanctionImposedBy;
  date: string;
  category: SanctionCategory;
  description: string;
  status: SanctionStatus;
}

export const SANCTION_CATEGORIES: SanctionCategory[] = [
  "Nükleer",
  "Petrol/Enerji",
  "Finans",
  "Silah",
  "Bireysel",
  "Teknoloji",
];

export const SANCTION_IMPOSERS: SanctionImposedBy[] = ["ABD", "AB", "BM", "Diğer"];

export const sanctions: Sanction[] = [
  {
    id: "s-1",
    title: "İran Nükleer Programına Kapsamlı Yaptırımlar",
    imposedBy: "BM",
    date: "2006-12-23",
    category: "Nükleer",
    description:
      "BM Güvenlik Konseyi 1737 sayılı karar ile İran'ın uranyum zenginleştirme faaliyetlerini kısıtlayan yaptırımları kabul etti. Nükleer ve balistik füze programlarına katkıda bulunan kuruluşların varlıkları donduruldu.",
    status: "Aktif",
  },
  {
    id: "s-2",
    title: "İran Petrol İhracatına Ambargo",
    imposedBy: "ABD",
    date: "2012-03-01",
    category: "Petrol/Enerji",
    description:
      "ABD, İran'dan petrol ithal eden ülkelerin bankalarına yaptırım uygulama yetkisi getirdi. Bu yaptırım İran'ın petrol gelirlerini önemli ölçüde düşürdü ve ekonomik baskı oluşturdu.",
    status: "Aktif",
  },
  {
    id: "s-3",
    title: "İran Merkez Bankası Yaptırımları",
    imposedBy: "ABD",
    date: "2011-12-31",
    category: "Finans",
    description:
      "İran Merkez Bankası'nın uluslararası finansal sisteme erişimini engelleyen yaptırımlar. SWIFT sistemi üzerinden işlem yapma kabiliyetini kısıtladı.",
    status: "Aktif",
  },
  {
    id: "s-4",
    title: "AB İran Petrol Ambargosu",
    imposedBy: "AB",
    date: "2012-07-01",
    category: "Petrol/Enerji",
    description:
      "Avrupa Birliği, İran'dan ham petrol, petrol ürünleri ve petrokimya ürünlerinin ithalatını yasakladı. İran'ın en büyük petrol müşterilerinden birini kaybetmesine neden oldu.",
    status: "Aktif",
  },
  {
    id: "s-5",
    title: "Silah Ambargosu",
    imposedBy: "BM",
    date: "2007-03-24",
    category: "Silah",
    description:
      "BM Güvenlik Konseyi 1747 sayılı karar ile İran'a silah satışını yasakladı. İran'ın konvansiyonel silah tedarik zincirini kısıtlamayı amaçladı.",
    status: "Aktif",
  },
  {
    id: "s-6",
    title: "Devrim Muhafızları Komutanlarına Bireysel Yaptırımlar",
    imposedBy: "ABD",
    date: "2019-04-08",
    category: "Bireysel",
    description:
      "ABD, İran İslam Devrim Muhafızları Ordusu'nu (IRGC) yabancı terör örgütü olarak tanıdı. Üst düzey komutanların varlıkları donduruldu ve seyahat yasağı uygulandı.",
    status: "Aktif",
  },
  {
    id: "s-7",
    title: "Maksimum Baskı Yaptırımları",
    imposedBy: "ABD",
    date: "2018-11-05",
    category: "Finans",
    description:
      "ABD'nin JCPOA'dan çekilmesinin ardından uygulamaya koyduğu kapsamlı ekonomik yaptırımlar. Bankacılık, enerji, denizcilik ve sigorta sektörlerini hedef aldı.",
    status: "Aktif",
  },
  {
    id: "s-8",
    title: "İran Metal Sektörü Yaptırımları",
    imposedBy: "ABD",
    date: "2019-05-08",
    category: "Teknoloji",
    description:
      "İran'ın demir, çelik, alüminyum ve bakır sektörlerine yönelik yaptırımlar. Bu sektörlerin İran devlet gelirlerine katkısını engellemek için uygulandı.",
    status: "Aktif",
  },
  {
    id: "s-9",
    title: "AB İran İnsan Hakları Yaptırımları",
    imposedBy: "AB",
    date: "2023-01-23",
    category: "Bireysel",
    description:
      "Mahsa Amini protestolarının bastırılmasıyla bağlantılı İranlı yetkililere yönelik seyahat yasağı ve varlık dondurma kararları. 30'dan fazla kişi ve kuruluşu hedef aldı.",
    status: "Aktif",
  },
  {
    id: "s-10",
    title: "İran İHA ve Füze Teknolojisi Yaptırımları",
    imposedBy: "ABD",
    date: "2023-03-09",
    category: "Teknoloji",
    description:
      "İran'ın insansız hava aracı (İHA) ve balistik füze programlarına katkıda bulunan şirketlere ve kişilere yönelik yaptırımlar. Rusya'ya İHA tedariki nedeniyle genişletildi.",
    status: "Aktif",
  },
  {
    id: "s-11",
    title: "JCPOA Kapsamında Yaptırım Hafifletmesi",
    imposedBy: "BM",
    date: "2016-01-16",
    category: "Nükleer",
    description:
      "İran nükleer anlaşması kapsamında bazı BM, AB ve ABD yaptırımları askıya alındı. İran'ın nükleer faaliyetlerini sınırlandırması karşılığında ekonomik rahatlama sağlandı.",
    status: "Kaldırıldı",
  },
  {
    id: "s-12",
    title: "İran Siber Operasyonları Yaptırımları",
    imposedBy: "ABD",
    date: "2022-09-14",
    category: "Teknoloji",
    description:
      "İran'ın siber saldırı kapasitesine katkıda bulunan kuruluşlara ve bireylere yönelik yaptırımlar. İran İstihbarat Bakanlığı ile bağlantılı grupları hedef aldı.",
    status: "Aktif",
  },
];
