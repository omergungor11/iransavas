"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "@/components/home/hero-section";
import { TensionIndex } from "@/components/home/tension-index";
import { StrategicMap } from "@/components/home/strategic-map";
import { LatestNews } from "@/components/home/latest-news";
import { OfficialStatements } from "@/components/home/official-statements";
import { LiveGlobe } from "@/components/home/live-globe";
import { FlightTracker } from "@/components/home/flight-tracker";
import { MarineTracker } from "@/components/home/marine-tracker";
import { MarketSnapshot } from "@/components/home/market-snapshot";
import { XTopicVolume } from "@/components/home/x-topic-volume";
import { WarExplainer } from "@/components/home/war-explainer";

interface Article {
  id: string;
  title: string;
  summary: string | null;
  aiSummary: string | null;
  source: string;
  category: string;
  publishedAt: string;
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/api/news?pageSize=6")
      .then((r) => r.json())
      .then((json) => setArticles(json.data || []))
      .catch(console.error);
  }, []);

  return (
    <div>
      {/* 1. Cinematic Hero + Breaking News */}
      <HeroSection />

      {/* 2. Global Tension Index */}
      <TensionIndex />

      {/* 3. Strategic Intelligence Map */}
      <section id="situation">
        <StrategicMap />
      </section>

      {/* 4. Latest Analysis & News */}
      <LatestNews articles={articles} />

      {/* 5. Official Statements & Force Posture */}
      <OfficialStatements />

      {/* 6. Live Globe — Glint.trade */}
      <section id="osint">
        <LiveGlobe />
      </section>

      {/* 7. Flight Tracker — ADS-B + FR24 */}
      <FlightTracker />

      {/* 8. Marine Traffic — Ship Tracking */}
      <MarineTracker />

      {/* 9. Market Snapshot */}
      <MarketSnapshot />

      {/* 10. X Topic Volume */}
      <XTopicVolume />

      {/* 11. War Explainer */}
      <WarExplainer />
    </div>
  );
}
