"use client";

import { ErrorBoundary } from "@/components/error-boundary";
import { HeroSection } from "@/components/home/hero-section";
import { TensionIndex } from "@/components/home/tension-index";
import { StrategicMap } from "@/components/home/strategic-map";
import { OfficialStatements } from "@/components/home/official-statements";
import { LiveGlobe } from "@/components/home/live-globe";
import { FlightTracker } from "@/components/home/flight-tracker";
import { MarineTracker } from "@/components/home/marine-tracker";
import { MarketSnapshot } from "@/components/home/market-snapshot";
import { XTopicVolume } from "@/components/home/x-topic-volume";
import { WarExplainer } from "@/components/home/war-explainer";

export function InteractiveSections() {
  return (
    <>
      <ErrorBoundary fallbackTitle="Hero bolumu yuklenemedi">
        <HeroSection />
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="Gerilim Endeksi yuklenemedi">
        <TensionIndex />
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="Stratejik Harita yuklenemedi">
        <section id="situation">
          <StrategicMap />
        </section>
      </ErrorBoundary>
    </>
  );
}

export function BottomSections() {
  return (
    <>
      <ErrorBoundary fallbackTitle="Resmi Aciklamalar yuklenemedi">
        <OfficialStatements />
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="Canli Globe yuklenemedi">
        <section id="osint">
          <LiveGlobe />
        </section>
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="Ucus Takip yuklenemedi">
        <FlightTracker />
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="Deniz Takip yuklenemedi">
        <MarineTracker />
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="Piyasa Gorunumu yuklenemedi">
        <MarketSnapshot />
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="X Konu Hacmi yuklenemedi">
        <XTopicVolume />
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="Savas Aciklayici yuklenemedi">
        <WarExplainer />
      </ErrorBoundary>
    </>
  );
}
