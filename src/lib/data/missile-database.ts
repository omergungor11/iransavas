export interface MissileSystem {
  name: string;
  type: "ballistic" | "cruise" | "drone";
  range_km: number;
  warhead_kg: number;
  origin_lat: number;
  origin_lng: number;
  description: string;
  status: "active" | "development";
}

export const MISSILE_SYSTEMS: MissileSystem[] = [
  {
    name: "Shahab-3",
    type: "ballistic",
    range_km: 1300,
    warhead_kg: 760,
    origin_lat: 35.2350,
    origin_lng: 53.9210,
    description:
      "Iran'in orta menzilli balistik fuzesi. Israil dahil bolgedeki pek cok hedefe ulasabilir. Sivi yakit kullanan fuze, Kuzey Kore Nodong teknolojisine dayanir.",
    status: "active",
  },
  {
    name: "Fateh-110",
    type: "ballistic",
    range_km: 300,
    warhead_kg: 650,
    origin_lat: 33.4940,
    origin_lng: 48.3530,
    description:
      "Kisa menzilli kati yakitli balistik fuze. Yuksek isabetle taktik hedeflere karsi kullanilir. GPS gudumlu versiyonlari mevcuttur.",
    status: "active",
  },
  {
    name: "Emad",
    type: "ballistic",
    range_km: 1700,
    warhead_kg: 750,
    origin_lat: 34.7680,
    origin_lng: 50.8170,
    description:
      "Shahab-3'un gelistirilmis versiyonu. Gudumlu savas basi ile daha yuksek isabet oranina sahiptir. Iran'in ilk hassas gudumlu balistik fuzesi.",
    status: "active",
  },
  {
    name: "Sejjil",
    type: "ballistic",
    range_km: 2000,
    warhead_kg: 750,
    origin_lat: 35.6892,
    origin_lng: 51.3890,
    description:
      "Iki kademeli kati yakitli orta menzilli balistik fuze. Hizli firlatilabildigi icin savunma sistemlerini atlatma kapasitesi yuksektir.",
    status: "active",
  },
  {
    name: "Khorramshahr",
    type: "ballistic",
    range_km: 2000,
    warhead_kg: 1500,
    origin_lat: 36.2605,
    origin_lng: 59.6168,
    description:
      "Iran'in en agir savas basli balistik fuzesi. Coklu savas basi tasima kapasitesine sahip oldugu iddia edilmektedir.",
    status: "active",
  },
  {
    name: "Shahed-136",
    type: "drone",
    range_km: 2500,
    warhead_kg: 40,
    origin_lat: 32.6539,
    origin_lng: 51.6660,
    description:
      "Tek kullanimlik kamikaze insansiz hava araci. Ucuz ve seri uretim kapasitesiyle dikkatleri cekmektedir. Ukrayna savasinda da kullanilmistir.",
    status: "active",
  },
  {
    name: "Soumar",
    type: "cruise",
    range_km: 2500,
    warhead_kg: 450,
    origin_lat: 34.3277,
    origin_lng: 47.0778,
    description:
      "Uzun menzilli seyir fuzesi. Sovyet Kh-55 fuzesinden turetildigi degerlendirilmektedir. Alcak irtifadan ucarak radar sistemlerini atlatabilir.",
    status: "active",
  },
  {
    name: "Zolfaghar",
    type: "ballistic",
    range_km: 700,
    warhead_kg: 580,
    origin_lat: 33.8869,
    origin_lng: 46.2653,
    description:
      "Kisa-orta menzilli kati yakitli balistik fuze. Fateh ailesinin uzun menzilli uyesi. Suriye'deki ISID hedeflerine karsi operasyonel olarak kullanilmistir.",
    status: "active",
  },
];
