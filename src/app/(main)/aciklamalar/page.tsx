"use client";

import {
  Anchor,
  Shield,
  Atom,
  Flag,
  Swords,
  Users,
  Fuel,
  Wifi,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ExplainerTopic {
  title: string;
  description: string;
  icon: typeof Anchor;
  slug: string;
}

const TOPICS: ExplainerTopic[] = [
  {
    title: "Hurmuz Bogazi Nedir?",
    description:
      "Dunya petrol ticaretinin yuzde 20'sinin gectigi stratejik gecit. Iran'in kontrol saglama cabalari ve bolgede yasanan gerilimler.",
    icon: Anchor,
    slug: "hurmuz-bogazi",
  },
  {
    title: "IRGC (Devrim Muhafizlari) Kimdir?",
    description:
      "Iran Islam Devrim Muhafizlari Ordusu'nun yapisi, guc alanlari, dis operasyonlari ve bolgesel etkisi hakkinda kapsamli bilgi.",
    icon: Shield,
    slug: "irgc-devrim-muhafizlari",
  },
  {
    title: "Iran Nukleer Programi",
    description:
      "Iran'in nukleer programinin tarihcesi, zenginlestirme kapasitesi, JCPOA anlasmasi ve guncel durum degerlendirmesi.",
    icon: Atom,
    slug: "iran-nukleer-programi",
  },
  {
    title: "ABD-Iran Iliskileri Tarihi",
    description:
      "1953 darbesinden gunumuze ABD-Iran iliskilerinin tarihsel seyri, kriz noktalari ve diplomasi surecleri.",
    icon: Flag,
    slug: "abd-iran-iliskileri",
  },
  {
    title: "Israil-Iran Golge Savasi",
    description:
      "Israil ve Iran arasindaki dogrudan olmayan catisma, siber saldirilari, suikastler ve vekalet cephelerindeki mucadele.",
    icon: Swords,
    slug: "israil-iran-golge-savasi",
  },
  {
    title: "Bolgesel Vekalet Savaslari",
    description:
      "Hizbullah, Hamas, Husiler ve Irak'taki milisler: Iran'in bolgedeki vekalet gucleri ve etki alanlari.",
    icon: Users,
    slug: "bolgesel-vekalet-savaslari",
  },
  {
    title: "Petrol ve Enerji Etkisi",
    description:
      "Iran geriliminin kuresel petrol fiyatlarina, enerji arz guvenligine ve ekonomiye etkileri.",
    icon: Fuel,
    slug: "petrol-enerji-etkisi",
  },
  {
    title: "Siber Savas Boyutu",
    description:
      "Iran'in siber yetenekleri, Stuxnet'ten gunumuze siber operasyonlar ve dijital cephede yasanan gelismeler.",
    icon: Wifi,
    slug: "siber-savas-boyutu",
  },
];

export default function AciklamalarPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Aciklamalar</h1>
        <p className="text-muted-foreground">
          Iran savasi ve bolgesel dinamikleri anlamak icin temel konularin kapsamli aciklamalari.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TOPICS.map((topic) => {
          const Icon = topic.icon;
          return (
            <Card
              key={topic.slug}
              className="group cursor-pointer transition-all duration-200 hover:border-red-500/40 hover:bg-white/[0.02] hover:shadow-lg hover:shadow-red-500/5"
            >
              <CardHeader className="pb-3">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-red-600/10 text-red-400 group-hover:bg-red-600/20 transition-colors">
                  <Icon size={20} />
                </div>
                <CardTitle className="text-base leading-snug">{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {topic.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
