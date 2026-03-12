"use client";

import { ErrorBoundary } from "@/components/error-boundary";
import { HeroSection } from "@/components/home/hero-section";
import { TensionIndex } from "@/components/home/tension-index";
import { StrategicMap } from "@/components/home/strategic-map";
import { OfficialStatements } from "@/components/home/official-statements";
import { LiveGlobe } from "@/components/home/live-globe";
import { FlightTracker } from "@/components/home/flight-tracker";
import { MarineTracker } from "@/components/home/marine-tracker";
import { LiveStreamsSection } from "@/components/home/live-streams-section";
import { MarketSnapshot } from "@/components/home/market-snapshot";
import { XTopicVolume } from "@/components/home/x-topic-volume";
import { WarExplainer } from "@/components/home/war-explainer";

export function InteractiveSections() {
  return (
    <>
      <ErrorBoundary fallbackTitle="Hero bölümü yüklenemedi">
        <HeroSection />
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="Gerilim Endeksi yüklenemedi">
        <TensionIndex />
      </ErrorBoundary>
    </>
  );
}

export function BottomSections() {
  return (
    <>
      <ErrorBoundary fallbackTitle="Stratejik Harita yüklenemedi">
        <section id="situation">
          <StrategicMap />
        </section>
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="Canlı Yayınlar yüklenemedi">
        <LiveStreamsSection />
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="Uçuş Takip yüklenemedi">
        <section id="military">
          <FlightTracker />
        </section>
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="Deniz Takip yüklenemedi">
        <MarineTracker />
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="Canlı Globe yüklenemedi">
        <section id="osint">
          <LiveGlobe />
        </section>
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="Piyasa Görünümü yüklenemedi">
        <section id="markets">
          <MarketSnapshot />
        </section>
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="Resmî Açıklamalar yüklenemedi">
        <OfficialStatements />
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="X Konu Hacmi yüklenemedi">
        <XTopicVolume />
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="Savaş Açıklayıcı yüklenemedi">
        <WarExplainer />
      </ErrorBoundary>
    </>
  );
}
