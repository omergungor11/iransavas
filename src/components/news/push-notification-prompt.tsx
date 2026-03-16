"use client";

import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const DISMISSED_KEY = "iransavas-push-dismissed";

export function PushNotificationPrompt() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) return;
    if (Notification.permission !== "default") return;

    try {
      const dismissed = localStorage.getItem(DISMISSED_KEY);
      if (dismissed === "true") return;
    } catch {
      return;
    }

    setVisible(true);
  }, []);

  const handleAllow = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        new Notification("Iran Savas", {
          body: "Son dakika bildirimleri aktif edildi.",
          icon: "/favicon.ico",
        });
      }
    } catch (err) {
      console.error("Notification permission error:", err);
    }
    setVisible(false);
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem(DISMISSED_KEY, "true");
    } catch {
      // silent
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-blue-500/30 bg-blue-500/5 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600/20">
          <Bell size={16} className="text-blue-400" />
        </div>
        <p className="text-sm text-blue-300">
          Son dakika bildirimlerini acin — onemli gelismeleri aninda ogrenmek icin.
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button
          size="sm"
          variant="outline"
          onClick={handleAllow}
          className="text-xs border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
        >
          Izin Ver
        </Button>
        <button
          type="button"
          onClick={handleDismiss}
          className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors"
          aria-label="Bildirimleri kapat"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
