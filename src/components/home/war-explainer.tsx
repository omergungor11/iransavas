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
    title: "Iran vs Israel",
    stat: "45+",
    statLabel: "YIL DUSMANLIGI",
    statColor: "text-red-400",
    description: "1979 Islam Devrimi'nden bu yana 45 yili askin dusmanlk — suikastlar, vekalet savaslari ve varolussa tehditler.",
    details: [
      "Iran, Hizbullah ve Hamas'a askeri destek sagliyor",
      "Israel, Iran nukleer tesislerine saldiri planliyor",
      "2024'te karsilikli fuze saldirilari",
    ],
  },
  {
    icon: Shield,
    iconColor: "text-blue-500",
    title: "ABD vs Iran",
    stat: "~45,000",
    statLabel: "ABD ASKERI BOLGEDE",
    statColor: "text-blue-400",
    description: "1979 rehine krizinden yaptirimlara, vekalet savalarindan dogrudan catismaya — 45 yillik sifir guven.",
    highlight: "1979'dan beri rakipler — yaptriimlar, vekalet savaslari, sifir guven.",
    details: [
      "1979: Iranli ogrenciler 52 ABD diplomatini 444 gun rehin tuttu",
      "ABD, dunyanin en agir ekonomik yaptrimlarini Iran'a uyguladi",
      "Iran destekli milisler Ekim 2023'ten beri Irak ve Suriye'deki ABD uslerine 170+ saldiri duzenledi",
      "ABD, Israel ve Korfez muttefiklerini destekliyor — Iran bunu bolgesel hakimiyet olarak goruyor",
    ],
    footer: "2020 — ABD, Iran'in en ust komutani General Kasim Suleymani'yi oldurdu",
  },
  {
    icon: Droplets,
    iconColor: "text-cyan-500",
    title: "Petrol & Hurmuz Bogazi",
    stat: "21M bbl",
    statLabel: "GUNLUK PETROL AKISI",
    statColor: "text-cyan-400",
    description: "Dunya petrolunun %20'si Iran'in kontrol ettigi 33 km genisligindeki bogazdan geciyor. Bir abluka = kuresel kriz.",
    details: [
      "Hurmuz Bogazi dunya enerji arz zincirinin en kritik noktasi",
      "Iran defalarca bogazi kapatmakla tehdit etti",
      "Herhangi bir kapatma petrol fiyatlarini 2-3 katina cikarabilir",
    ],
  },
  {
    icon: Users,
    iconColor: "text-purple-500",
    title: "Sunni vs Sia Ayrimi",
    stat: "1,400 yil",
    statLabel: "AYRILIK YASI",
    statColor: "text-purple-400",
    description: "1.400 yillik dini kirilma bugun hala vekalet savaslarini, ittifaklari ve guc mucadelelerini besliyor.",
    details: [
      "Iran (Sia) vs Suudi Arabistan (Sunni) bolgesel liderlik mucadelesi",
      "Yemen, Irak, Suriye, Lubnan'da mezhepsel catismalar",
      "Bolgedeki ittifaklar buyuk olcude mezhep hatlarina gore sekilleniyor",
    ],
  },
  {
    icon: Atom,
    iconColor: "text-green-500",
    title: "Nukleer Silah Yarisi",
    stat: "%60",
    statLabel: "ZENGINLESTIRME SAFLIĞI",
    statColor: "text-green-400",
    description: "Iran uranyumu silah sinifina yakin olcude zenginlestiriyor. Israel ve ABD bunu gerekirse gucle durduracaklarini soyluyor.",
    details: [
      "Iran %60 safliktaki uranyum zenginlestirmeye ulasti",
      "Silah sinifi icin %90 gerekiyor — teknik olarak cok yakin",
      "2015 nukleer anlasmasi (JCPOA) ABD'nin cekilmesiyle cokerdi",
    ],
  },
  {
    icon: Network,
    iconColor: "text-orange-500",
    title: "Vekalet Savaslari & Guc",
    stat: "12+",
    statLabel: "FINANSE EDILEN GRUP",
    statColor: "text-orange-400",
    description: "Iran'in 'Direnis Ekseni' vs ABD-Israel-Suudi ittifaki — Orta Dogu genelinde bir vekalet gruplari agi.",
    details: [
      "Hizbullah (Lubnan), Hamas (Gazze), Husiler (Yemen)",
      "Irak'taki Sia milisleri, Suriye'deki gruplar",
      "Her iki taraf da dogrudan savas yerine vekiller uzerinden mucadele ediyor",
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
                <h2 className="text-lg font-bold text-foreground">Bu savas neden yasaniyor?</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white uppercase tracking-wider">
                  Aciklayici
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Catismanin arkasindaki 6 temel neden — detay icin kartlara tiklayin</p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label={expanded ? "Aciklayici panelini kapat" : "Aciklayici panelini ac"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-border hover:bg-muted transition-colors text-muted-foreground"
          >
            {expanded ? "Kapat" : "Ac"}
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
                        &rsaquo; Devamini oku
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Source attribution */}
            <p className="text-[10px] text-zinc-600 mt-4">
              Anlasilirlik icin sadelestirmistir — jeopolitik karisik ve cok katmanlidir. Kaynaklar: CFR, BBC, Al Jazeera, Reuters
            </p>
          </>
        )}
      </div>
    </section>
  );
}
