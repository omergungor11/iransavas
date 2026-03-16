const TELEGRAM_API_BASE = "https://api.telegram.org/bot";

function getBotToken(): string | null {
  return process.env.TELEGRAM_BOT_TOKEN || null;
}

/**
 * Send a message via Telegram Bot API
 */
export async function sendTelegramMessage(
  chatId: number | string,
  text: string,
  parseMode: "MarkdownV2" | "HTML" = "MarkdownV2",
): Promise<boolean> {
  const token = getBotToken();
  if (!token) {
    console.warn("[Telegram] No bot token configured");
    return false;
  }

  try {
    const res = await fetch(`${TELEGRAM_API_BASE}${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: parseMode,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[Telegram] sendMessage failed:", err);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Telegram] sendMessage error:", error instanceof Error ? error.message : error);
    return false;
  }
}

/**
 * Set the webhook URL for the Telegram bot
 */
export async function setTelegramWebhook(webhookUrl: string): Promise<boolean> {
  const token = getBotToken();
  if (!token) {
    console.error("[Telegram] No bot token configured");
    return false;
  }

  try {
    const res = await fetch(`${TELEGRAM_API_BASE}${token}/setWebhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: webhookUrl }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[Telegram] setWebhook failed:", err);
      return false;
    }

    const data = await res.json();
    console.log("[Telegram] Webhook set:", data);
    return true;
  } catch (error) {
    console.error("[Telegram] setWebhook error:", error instanceof Error ? error.message : error);
    return false;
  }
}

/**
 * Delete the current webhook
 */
export async function deleteTelegramWebhook(): Promise<boolean> {
  const token = getBotToken();
  if (!token) return false;

  try {
    const res = await fetch(`${TELEGRAM_API_BASE}${token}/deleteWebhook`, {
      method: "POST",
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Escape special characters for Telegram MarkdownV2
 */
export function escapeMarkdownV2(text: string): string {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}
