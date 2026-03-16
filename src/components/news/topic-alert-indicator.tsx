"use client";

import { useState, useEffect } from "react";
import { getTopicPrefs } from "./topic-subscribe";

// Map topic IDs to article category keywords for matching
const TOPIC_CATEGORY_MAP: Record<string, string[]> = {
  nukleer: ["NUKLEER", "nükleer", "nuclear", "uranyum", "zenginleştirme", "natanz"],
  "hava-saldirisi": ["HAVA_SALDIRISI", "hava saldırısı", "air strike", "bombardıman", "hava operasyonu"],
  "deniz-operasyonu": ["DENIZ_OPERASYONU", "deniz", "donanma", "naval", "hürmüz", "basra körfezi"],
  diplomasi: ["DIPLOMASI", "diplomasi", "diplomacy", "müzakere", "anlaşma", "görüşme"],
  siber: ["SIBER", "siber", "cyber", "hack", "siber saldırı"],
  ekonomi: ["EKONOMI", "ekonomi", "economy", "yaptırım", "sanction", "petrol", "ticaret"],
  "insani-kriz": ["INSANI_KRIZ", "insani", "humanitarian", "mülteci", "sivil", "yardım"],
};

interface Article {
  category: string;
  title?: string;
}

interface TopicAlertIndicatorProps {
  articles: Article[];
}

export function TopicAlertIndicator({ articles }: TopicAlertIndicatorProps) {
  const [prefs, setPrefs] = useState<string[]>([]);
  const [matchCount, setMatchCount] = useState(0);

  useEffect(() => {
    setPrefs(getTopicPrefs());

    const handleChange = () => setPrefs(getTopicPrefs());
    window.addEventListener("topic-prefs-changed", handleChange);
    return () => window.removeEventListener("topic-prefs-changed", handleChange);
  }, []);

  useEffect(() => {
    if (prefs.length === 0 || articles.length === 0) {
      setMatchCount(0);
      return;
    }

    // Collect all keywords from selected topics
    const keywords: string[] = [];
    for (const topicId of prefs) {
      const mapped = TOPIC_CATEGORY_MAP[topicId];
      if (mapped) keywords.push(...mapped);
    }

    // Check how many articles match any keyword
    const matches = articles.filter((article) => {
      const text = `${article.category} ${article.title || ""}`.toLowerCase();
      return keywords.some((kw) => text.includes(kw.toLowerCase()));
    });

    setMatchCount(matches.length);
  }, [prefs, articles]);

  if (prefs.length === 0 || matchCount === 0) return null;

  return (
    <div className="mb-4 rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-2.5 flex items-center gap-2">
      <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse shrink-0" />
      <span className="text-sm text-blue-400">
        <span className="font-medium">{matchCount} yeni haber</span>{" "}
        ilgi alaninizda
      </span>
    </div>
  );
}
