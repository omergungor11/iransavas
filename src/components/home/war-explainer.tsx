"use client";

import { useState } from "react";
import { BookOpen, Swords, Shield, Droplets, Users, Atom, Network, Globe, ChevronUp, ChevronDown } from "lucide-react";

interface ExplainerCard {
  icon: React.ElementType;
  iconColor: string;
  title: string;
  stat: string;
  statLabel: string;
  statColor: string;
  description: string;
  details?: string[];
  highlight?: string;
  footer?: string;
}

const cards: ExplainerCard[] = [
  {
    icon: Swords,
    iconColor: "text-red-500",
    title: "İran vs İsrail",
    stat: "45+",
    statLabel: "YIL DÜŞMANLIĞI",
    statColor: "text-red-400",
    description: "1979 İslam Devrimi'nden bu yana 45 yılı aşkın düşmanlık — suikastlar, vekâlet savaşları ve varoluşsal tehditler.",
    details: [
      "İran, Hizbullah ve Hamas'a askerî destek sağlıyor",
      "İsrail, İran nükleer tesislerine saldırı planlıyor",
      "2024'te karşılıklı füze saldırıları",
    ],
  },
  {
    icon: Shield,
    iconColor: "text-blue-500",
    title: "ABD vs İran",
    stat: "~45,000",
    statLabel: "ABD ASKERİ BÖLGEDE",
    statColor: "text-blue-400",
    description: "1979 rehine krizinden yaptırımlara, vekâlet savaşlarından doğrudan çatışmaya — 45 yıllık sıfır güven.",
    highlight: "1979'dan beri rakipler — yaptırımlar, vekâlet savaşları, sıfır güven.",
    details: [
      "1979: İranlı öğrenciler 52 ABD diplomatını 444 gün rehin tuttu",
      "ABD, dünyanın en ağır ekonomik yaptırımlarını İran'a uyguladı",
      "İran destekli milisler Ekim 2023'ten beri Irak ve Suriye'deki ABD üslerine 170+ saldırı düzenledi",
      "ABD, İsrail ve Körfez müttefiklerini destekliyor — İran bunu bölgesel hâkimiyet olarak görüyor",
    ],
    footer: "2020 — ABD, İran'ın en üst komutanı General Kasım Süleymani'yi öldürdü",
  },
  {
    icon: Droplets,
    iconColor: "text-cyan-500",
    title: "Petrol & Hürmüz Boğazı",
    stat: "21M bbl",
    statLabel: "GÜNLÜK PETROL AKIŞI",
    statColor: "text-cyan-400",
    description: "Dünya petrolünün %20'si İran'ın kontrol ettiği 33 km genişliğindeki boğazdan geçiyor. Bir abluka = küresel kriz.",
    details: [
      "Hürmüz Boğazı dünya enerji arz zincirinin en kritik noktası",
      "İran defalarca boğazı kapatmakla tehdit etti",
      "Herhangi bir kapatma petrol fiyatlarını 2-3 katına çıkarabilir",
    ],
  },
  {
    icon: Users,
    iconColor: "text-purple-500",
    title: "Sünnî vs Şiî Ayrımı",
    stat: "1,400 yıl",
    statLabel: "AYRILIK YAŞI",
    statColor: "text-purple-400",
    description: "1.400 yıllık dinî kırılma bugün hâlâ vekâlet savaşlarını, ittifakları ve güç mücadelelerini besliyor.",
    details: [
      "İran (Şiî) vs Suudi Arabistan (Sünnî) bölgesel liderlik mücadelesi",
      "Yemen, Irak, Suriye, Lübnan'da mezhepsel çatışmalar",
      "Bölgedeki ittifaklar büyük ölçüde mezhep hatlarına göre şekilleniyor",
    ],
  },
  {
    icon: Atom,
    iconColor: "text-green-500",
    title: "Nükleer Silah Yarışı",
    stat: "%60",
    statLabel: "ZENGİNLEŞTİRME SAFLIĞI",
    statColor: "text-green-400",
    description: "İran uranyumu silah sınıfına yakın ölçüde zenginleştiriyor. İsrail ve ABD bunu gerekirse güçle durduracaklarını söylüyor.",
    details: [
      "İran %60 saflıktaki uranyum zenginleştirmeye ulaştı",
      "Silah sınıfı için %90 gerekiyor — teknik olarak çok yakın",
      "2015 nükleer anlaşması (JCPOA) ABD'nin çekilmesiyle çöktü",
    ],
  },
  {
    icon: Network,
    iconColor: "text-orange-500",
    title: "Vekâlet Savaşları & Güç",
    stat: "12+",
    statLabel: "FİNANSE EDİLEN GRUP",
    statColor: "text-orange-400",
    description: "İran'ın 'Direniş Ekseni' vs ABD-İsrail-Suudi ittifakı — Orta Doğu genelinde bir vekâlet grupları ağı.",
    details: [
      "Hizbullah (Lübnan), Hamas (Gazze), Husiler (Yemen)",
      "Irak'taki Şiî milisleri, Suriye'deki gruplar",
      "Her iki taraf da doğrudan savaş yerine vekiller üzerinden mücadele ediyor",
    ],
  },
];

export function WarExplainer() {
  const [expanded, setExpanded] = useState(true);
  const [activeCard, setActiveCard] = useState<number | null>(1); // USA vs Iran default

  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
              <BookOpen className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">Bu savaş neden yaşanıyor?</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white uppercase tracking-wider">
                  Açıklayıcı
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Çatışmanın arkasındaki 6 temel neden — detay için kartlara tıklayın</p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label={expanded ? "Açıklayıcı panelini kapat" : "Açıklayıcı panelini aç"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-border hover:bg-muted transition-colors text-muted-foreground"
          >
            {expanded ? "Kapat" : "Aç"}
            {expanded ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
          </button>
        </div>

        {/* Cards */}
        {expanded && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cards.map((card, idx) => {
                const Icon = card.icon;
                const isActive = activeCard === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveCard(isActive ? null : idx)}
                    className={`text-left rounded-lg border p-4 transition-all ${
                      isActive
                        ? "border-blue-500/50 bg-card ring-1 ring-blue-500/20"
                        : "border-border bg-card/50 hover:border-border"
                    }`}
                  >
                    {/* Card header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <Icon className={`h-5 w-5 ${card.iconColor}`} />
                        <h3 className={`text-sm font-bold ${card.iconColor}`}>{card.title}</h3>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className={`text-lg font-black leading-none ${card.statColor}`}>{card.stat}</p>
                        <p className="text-[9px] text-muted-foreground uppercase tracking-wider mt-0.5">{card.statLabel}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>

                    {/* Expanded details */}
                    {isActive && (
                      <div className="mt-3 space-y-2">
                        {card.highlight && (
                          <div className="rounded bg-muted/80 border border-border/50 px-3 py-2">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold mb-0.5">TL;DR</p>
                            <p className="text-xs text-yellow-400/90">{card.highlight}</p>
                          </div>
                        )}
                        {card.details && (
                          <ul className="space-y-1.5">
                            {card.details.map((d, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                                <span className="text-zinc-600 mt-0.5">—</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {card.footer && (
                          <div className="flex items-center gap-2 pt-1.5 border-t border-border">
                            <Globe size={12} className="text-muted-foreground" />
                            <p className="text-[11px] text-muted-foreground">{card.footer}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Read more hint */}
                    {!isActive && (
                      <p className="text-[11px] text-red-500 font-medium mt-2">
                        &rsaquo; Devamını oku
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Source attribution */}
            <p className="text-[10px] text-zinc-600 mt-4">
              Anlaşılırlık için sadeleştirilmiştir — jeopolitik karışık ve çok katmanlıdır. Kaynaklar: CFR, BBC, Al Jazeera, Reuters
            </p>
          </>
        )}
      </div>
    </section>
  );
}
