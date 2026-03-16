// ── Nuclear Program Data ──────────────────────────────────────────────

export interface NuclearFacility {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  status: "aktif" | "hasarli" | "kapali";
  description: string;
  type: string;
}

export interface EnrichmentData {
  currentLevel: number;
  weaponsGradeThreshold: number;
  unit: string;
  lastUpdated: string;
}

export interface BreakoutEstimate {
  minWeeks: number;
  maxWeeks: number;
  confidence: string;
  lastUpdated: string;
  description: string;
}

export interface IAEAStatus {
  inspectionStatus: string;
  lastInspectionDate: string;
  cooperationLevel: "tam" | "sinirli" | "yok";
  notes: string;
}

export interface NuclearTimelineEvent {
  year: number;
  month?: number;
  title: string;
  description: string;
  significance: "high" | "medium" | "low";
}

export const ENRICHMENT_DATA: EnrichmentData = {
  currentLevel: 60,
  weaponsGradeThreshold: 90,
  unit: "%",
  lastUpdated: "2026-03-10",
};

export const BREAKOUT_ESTIMATE: BreakoutEstimate = {
  minWeeks: 2,
  maxWeeks: 3,
  confidence: "Yuksek",
  lastUpdated: "2026-03-01",
  description:
    "Yeterli fisil malzeme uretimi icin tahmini sure. Bu tahmin mevcut santrifuj kapasitesi ve zenginlestirme hizina dayanmaktadir.",
};

export const NUCLEAR_FACILITIES: NuclearFacility[] = [
  {
    id: "natanz",
    name: "Natanz",
    location: "Isfahan ili, Natanz",
    lat: 33.7225,
    lng: 51.7275,
    status: "aktif",
    description:
      "Iran'in en buyuk uranyum zenginlestirme tesisi. Yer altinda binlerce santrifuj barindirmaktadir. 2020 ve 2021 sabotaj saldirilarina ragmen uretim devam etmektedir.",
    type: "Uranyum Zenginlestirme",
  },
  {
    id: "fordow",
    name: "Fordow",
    location: "Kum ili, Fordow",
    lat: 34.884,
    lng: 50.979,
    status: "aktif",
    description:
      "Dag icine insa edilmis tahkimli zenginlestirme tesisi. Hava saldirilarina karsi direncli tasarimi ile stratejik oneme sahiptir. %60 zenginlestirme burada yapilmaktadir.",
    type: "Uranyum Zenginlestirme",
  },
  {
    id: "isfahan",
    name: "Isfahan (UCF)",
    location: "Isfahan",
    lat: 32.6546,
    lng: 51.668,
    status: "hasarli",
    description:
      "Uranyum donusum tesisi. Sari pasta (yellowcake) uranyum heksafloride (UF6) donusturulmektedir. Son hava operasyonlarinda hasar aldigi raporlanmistir.",
    type: "Uranyum Donusum",
  },
  {
    id: "arak",
    name: "Arak (IR-40)",
    location: "Markazi ili, Arak",
    lat: 34.0954,
    lng: 49.245,
    status: "kapali",
    description:
      "Agir su reaktoru. JCPOA kapsaminda yeniden tasarlandi. Plutonyum uretim kapasitesi sinirlandirildi. Su anda aktif degildir.",
    type: "Agir Su Reaktoru",
  },
];

export const IAEA_STATUS: IAEAStatus = {
  inspectionStatus: "Kisitli erisim",
  lastInspectionDate: "2026-02-15",
  cooperationLevel: "sinirli",
  notes:
    "Iran, bazi tesislere IAEA mufettislerinin erisimini sinirlandirmistir. Kamera sistemleri kismen devre disidir. Tam dogrulama mumkun degildir.",
};

export const NUCLEAR_TIMELINE: NuclearTimelineEvent[] = [
  {
    year: 2002,
    title: "Nukleer Program Ifsa Edildi",
    description:
      "Muhalefet grubu, Natanz ve Arak'taki gizli nukleer tesisleri dunya kamuoyuna acikladi.",
    significance: "high",
  },
  {
    year: 2006,
    title: "BM Yaptirimlari Basladi",
    description:
      "BM Guvenlik Konseyi, Iran'in zenginlestirme faaliyetlerini durdurmamasinin ardindan ilk yaptirimlari uygulamaya koydu.",
    significance: "medium",
  },
  {
    year: 2010,
    title: "Stuxnet Siber Saldirisi",
    description:
      "ABD-Israil ortak operasyonu ile Natanz santrifujleri sabote edildi. Nukleer program yavaslatildi.",
    significance: "high",
  },
  {
    year: 2015,
    month: 7,
    title: "JCPOA Imzalandi",
    description:
      "Iran ile P5+1 arasinda nukleer anlasmasi imzalandi. Zenginlestirme %3.67 ile sinirlandirildi.",
    significance: "high",
  },
  {
    year: 2018,
    month: 5,
    title: "ABD JCPOA'dan Cekildi",
    description:
      "Trump yonetimi tek tarafli olarak anlasmayi terk etti ve maksimum baski politikasini baslatti.",
    significance: "high",
  },
  {
    year: 2019,
    title: "Zenginlestirme Tirmandirmasi",
    description:
      "Iran, JCPOA sinirlarini asmaya basladi. Zenginlestirme seviyesi kademeli olarak arttirildi.",
    significance: "medium",
  },
  {
    year: 2021,
    title: "%60 Zenginlestirme Basladi",
    description:
      "Iran, silah seviyesine yakin %60 uranyum zenginlestirmeye basladigini duyurdu.",
    significance: "high",
  },
  {
    year: 2023,
    title: "IAEA Kameralari Devre Disi",
    description:
      "Iran, IAEA gozetim kameralarinin buyuk bolumunu devre disi birakti.",
    significance: "medium",
  },
  {
    year: 2025,
    title: "Isfahan Operasyonu",
    description:
      "Koalisyon kuvvetleri Isfahan donusum tesisine hava operasyonu duzenledi.",
    significance: "high",
  },
  {
    year: 2026,
    month: 1,
    title: "Fordow Faaliyetleri Yogunlasti",
    description:
      "Uydu goruntuleri Fordow tesisinde artan aktiviteyi ortaya koydu. Zenginlestirme hizi artti.",
    significance: "high",
  },
];
