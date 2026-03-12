"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, ChevronUp, ChevronDown, BarChart3 } from "lucide-react";

interface MarketItem {
  name: string;
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  positive: boolean;
}

const marketData: MarketItem[] = [
  { name: "West Texas Petrol", symbol: "WTI", price: "128.40", change: "+8.12", changePercent: "+6.74%", positive: true },
  { name: "Brent Ham Petrol", symbol: "BRENT", price: "134.85", change: "+9.45", changePercent: "+7.53%", positive: true },
  { name: "Altin", symbol: "XAU", price: "2,847", change: "+62.30", changePercent: "+2.24%", positive: true },
  { name: "S&P 500", symbol: "SPX", price: "4,892", change: "-204.50", changePercent: "-4.01%", positive: false },
  { name: "Bitcoin", symbol: "BTC", price: "67,420", change: "-2,180", changePercent: "-3.13%", positive: false },
  { name: "EUR/USD", symbol: "EUR", price: "1.0634", change: "-0.0087", changePercent: "-0.81%", positive: false },
  { name: "Dogal Gaz", symbol: "NG", price: "4.82", change: "+0.34", changePercent: "+7.59%", positive: true },
  { name: "Gumus", symbol: "XAG", price: "33.45", change: "+1.12", changePercent: "+3.47%", positive: true },
  { name: "NASDAQ", symbol: "NDX", price: "16,740", change: "-580", changePercent: "-3.35%", positive: false },
];

export function MarketSnapshot() {
  const [expanded, setExpanded] = useState(true);

  return (
    <section id="markets" className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <BarChart3 className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">Piyasa Gorunumu</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-600 text-white uppercase tracking-wider">
                  Markets
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Iran catismasindan etkilenen kuresel piyasalar</p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label={expanded ? "Piyasa panelini kapat" : "Piyasa panelini ac"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-border hover:bg-muted transition-colors text-muted-foreground"
          >
            {expanded ? "Kapat" : "Ac"}
            {expanded ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
          </button>
        </div>

        {expanded && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
              {marketData.map((m) => (
                <div
                  key={m.symbol}
                  className={`rounded-lg border p-3 transition-all ${
                    m.positive
                      ? "border-green-500/20 bg-green-500/5"
                      : "border-red-500/20 bg-red-500/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{m.symbol}</p>
                      <p className="text-xs text-muted-foreground">{m.name}</p>
                    </div>
                    {m.positive ? (
                      <TrendingUp size={16} className="text-green-500" />
                    ) : (
                      <TrendingDown size={16} className="text-red-500" />
                    )}
                  </div>
                  <p className="text-xl font-black text-foreground">${m.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-bold ${m.positive ? "text-green-400" : "text-red-400"}`}>
                      {m.change}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      m.positive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {m.changePercent}
                    </span>
                  </div>
                  {/* Mini sparkline */}
                  <div className="flex items-end gap-[1px] mt-2 h-4">
                    {Array.from({ length: 20 }).map((_, i) => {
                      const h = Math.max(2, Math.random() * 16);
                      return (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm ${m.positive ? "bg-green-500/40" : "bg-red-500/40"}`}
                          style={{ height: `${h}px` }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-zinc-600 mt-3">
              Piyasa verileri gosterge amaclidir — gercek zamanli fiyatlar icin finansal platformlari kullanin. Kaynak: Glint Trade, Yahoo Finance
            </p>
          </>
        )}
      </div>
    </section>
  );
}
