"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  X,
  Coffee,
  CreditCard,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

const POPUP_DELAY_MS = 45_000; // 45 saniye sonra goster
const DISMISS_KEY = "donation_dismissed";
const DISMISS_DAYS = 3; // 3 gun boyunca tekrar gosterme

interface PaymentMethod {
  id: string;
  label: string;
  icon: typeof Coffee;
  color: string;
  type: "link" | "copy";
  value: string;
  displayValue?: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "buymeacoffee",
    label: "Buy Me a Coffee",
    icon: Coffee,
    color: "bg-yellow-500 hover:bg-yellow-400 text-black",
    type: "link",
    value: "https://buymeacoffee.com/iransavas",
  },
  {
    id: "papara",
    label: "Papara ile Gönder",
    icon: CreditCard,
    color: "bg-purple-600 hover:bg-purple-500 text-white",
    type: "copy",
    value: "1234567890",
    displayValue: "Papara No: 1234567890",
  },
  {
    id: "iban",
    label: "Banka Havalesi (IBAN)",
    icon: CreditCard,
    color: "bg-blue-600 hover:bg-blue-500 text-white",
    type: "copy",
    value: "TR00 0000 0000 0000 0000 0000 00",
    displayValue: "TR00 0000 0000 0000 0000 0000 00",
  },
];

export function DonationPopup() {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10);
      const daysPassed =
        (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
      if (daysPassed < DISMISS_DAYS) return;
    }

    const timer = setTimeout(() => setVisible(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
  };

  const handleCopy = async (method: PaymentMethod) => {
    try {
      await navigator.clipboard.writeText(method.value);
      setCopied(method.id);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-zinc-950 shadow-2xl animate-in zoom-in-95 fade-in duration-300">
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Kapat"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-600/20 border border-red-500/30 mb-4">
            <Heart size={28} className="text-red-500" fill="currentColor" />
          </div>
          <h2 className="text-xl font-black text-white mb-1.5">
            Bizi Destekleyin
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
            Bağımsız ve tarafsız haberciliğe destek olun. Küçük katkılarınız
            büyük fark yaratır.
          </p>
        </div>

        {/* Payment methods */}
        <div className="px-6 pb-2 space-y-2.5">
          {paymentMethods.map((method) => (
            <div key={method.id}>
              {method.type === "link" ? (
                <a
                  href={method.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2.5 w-full px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${method.color}`}
                >
                  <method.icon size={18} />
                  {method.label}
                  <ExternalLink size={14} className="opacity-60" />
                </a>
              ) : (
                <button
                  onClick={() => handleCopy(method)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${method.color}`}
                >
                  <div className="flex items-center gap-2.5">
                    <method.icon size={18} />
                    {method.label}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium opacity-80">
                    {copied === method.id ? (
                      <>
                        <Check size={14} />
                        Kopyalandı
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Kopyala
                      </>
                    )}
                  </div>
                </button>
              )}
              {method.displayValue && (
                <p className="text-[11px] text-zinc-500 text-center mt-1 font-mono">
                  {method.displayValue}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pt-3 pb-5">
          <button
            onClick={dismiss}
            className="w-full text-center text-xs text-zinc-600 hover:text-zinc-400 transition-colors py-2"
          >
            Şimdi değil, teşekkürler
          </button>
        </div>
      </div>
    </div>
  );
}
