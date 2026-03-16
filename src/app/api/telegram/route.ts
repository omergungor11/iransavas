import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage, escapeMarkdownV2 } from "@/lib/telegram-bot";

interface TelegramUpdate {
  message?: {
    chat: { id: number };
    text?: string;
    from?: { first_name?: string };
  };
}

interface NewsArticle {
  title: string;
  slug: string;
  source: string;
  publishedAt: string;
}

interface StatsData {
  tensionScore: number;
  tensionLevel: string;
  totalNews: number;
  totalEvents: number;
  totalCasualties: number;
  recentNewsCount: number;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://iransavas.vercel.app";

async function fetchInternalApi<T>(path: string): Promise<T | null> {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : SITE_URL;
    const res = await fetch(`${baseUrl}${path}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as T;
  } catch (error) {
    console.error(`[Telegram] Failed to fetch ${path}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

function getTensionEmoji(level: string): string {
  switch (level) {
    case "SEVERE": return "\\u{1F534}";
    case "HIGH": return "\\u{1F7E0}";
    case "ELEVATED": return "\\u{1F7E1}";
    default: return "\\u{1F7E2}";
  }
}

function getTensionLabel(level: string): string {
  switch (level) {
    case "SEVERE": return "Ciddi";
    case "HIGH": return "Yuksek";
    case "ELEVATED": return "Yukseliste";
    default: return "Dusuk";
  }
}

async function handleBugunCommand(chatId: number): Promise<void> {
  const articles = await fetchInternalApi<NewsArticle[]>("/api/news?pageSize=5&sort=newest");

  if (!articles || articles.length === 0) {
    await sendTelegramMessage(chatId, escapeMarkdownV2("Bugun icin haber bulunamadi."));
    return;
  }

  const lines = [
    `*${escapeMarkdownV2("Bugunun One Cikan Haberleri")}*`,
    "",
  ];

  articles.forEach((article, i) => {
    const title = escapeMarkdownV2(article.title);
    const source = escapeMarkdownV2(article.source);
    const url = `${SITE_URL}/haberler/${article.slug}`;
    lines.push(`${i + 1}\\. [${title}](${escapeMarkdownV2(url)})`);
    lines.push(`   _${source}_`);
    lines.push("");
  });

  lines.push(`[${escapeMarkdownV2("Tum haberleri gor")}](${escapeMarkdownV2(SITE_URL + "/haberler")})`);

  await sendTelegramMessage(chatId, lines.join("\n"));
}

async function handleGerilimCommand(chatId: number): Promise<void> {
  const stats = await fetchInternalApi<StatsData>("/api/stats");

  if (!stats) {
    await sendTelegramMessage(chatId, escapeMarkdownV2("Gerilim verileri alinamadi."));
    return;
  }

  const emoji = getTensionEmoji(stats.tensionLevel);
  const label = getTensionLabel(stats.tensionLevel);

  const lines = [
    `*${escapeMarkdownV2("Gerilim Durumu")}*`,
    "",
    `${emoji} Skor: *${escapeMarkdownV2(String(stats.tensionScore))}*/100`,
    `Seviye: *${escapeMarkdownV2(label)}*`,
    "",
    `Toplam haber: ${escapeMarkdownV2(String(stats.totalNews))}`,
    `Son 24 saat: ${escapeMarkdownV2(String(stats.recentNewsCount))} haber`,
    `Toplam olay: ${escapeMarkdownV2(String(stats.totalEvents))}`,
    "",
    `[${escapeMarkdownV2("Detayli analiz")}](${escapeMarkdownV2(SITE_URL + "/analiz")})`,
  ];

  await sendTelegramMessage(chatId, lines.join("\n"));
}

async function handleSonCommand(chatId: number): Promise<void> {
  const articles = await fetchInternalApi<NewsArticle[]>("/api/news?pageSize=1&sort=newest");

  if (!articles || articles.length === 0) {
    await sendTelegramMessage(chatId, escapeMarkdownV2("Son dakika haberi bulunamadi."));
    return;
  }

  const article = articles[0];
  const title = escapeMarkdownV2(article.title);
  const source = escapeMarkdownV2(article.source);
  const url = `${SITE_URL}/haberler/${article.slug}`;

  const lines = [
    `*${escapeMarkdownV2("Son Dakika")}*`,
    "",
    `[${title}](${escapeMarkdownV2(url)})`,
    `_${source}_`,
    "",
    `[${escapeMarkdownV2("Tum haberleri gor")}](${escapeMarkdownV2(SITE_URL + "/haberler")})`,
  ];

  await sendTelegramMessage(chatId, lines.join("\n"));
}

export async function POST(request: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    // No bot token configured, silently return 200
    return NextResponse.json({ ok: true });
  }

  try {
    const update: TelegramUpdate = await request.json();
    const message = update.message;

    if (!message?.text || !message.chat?.id) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const command = message.text.trim().toLowerCase().split(/\s+/)[0];

    switch (command) {
      case "/bugun":
        await handleBugunCommand(chatId);
        break;
      case "/gerilim":
        await handleGerilimCommand(chatId);
        break;
      case "/son":
        await handleSonCommand(chatId);
        break;
      case "/start":
        await sendTelegramMessage(
          chatId,
          [
            `*${escapeMarkdownV2("Iran Savasi Bot")}*`,
            "",
            escapeMarkdownV2("Kullanilabilir komutlar:"),
            escapeMarkdownV2("/bugun - Bugunun one cikan haberleri"),
            escapeMarkdownV2("/gerilim - Guncel gerilim skoru"),
            escapeMarkdownV2("/son - Son dakika haberi"),
          ].join("\n"),
        );
        break;
      default:
        // Unknown command, ignore silently
        break;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Telegram Webhook] Error:", error instanceof Error ? error.message : error);
    // Always return 200 to avoid Telegram retries
    return NextResponse.json({ ok: true });
  }
}
