"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "@/components/home/hero-section";
import { LiveStats } from "@/components/home/live-stats";
import { WarExplainer } from "@/components/home/war-explainer";
import { LatestNews } from "@/components/home/latest-news";
import { FlightRadar } from "@/components/home/flight-radar";
import { MiniMapPreview } from "@/components/home/mini-map-preview";

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
      <HeroSection />
      <LiveStats />
      <WarExplainer />
      <LatestNews articles={articles} />
      <FlightRadar />
      <MiniMapPreview />
    </div>
  );
}
