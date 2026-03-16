export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateWeeklySummaryHtml } from "@/lib/email-templates";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://iransavas.vercel.app";

export async function GET(request: NextRequest) {
  // Verify cron secret
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Invalid cron secret" } },
      { status: 401 },
    );
  }

  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Fetch top 10 news from the past week
    const articles = await prisma.newsArticle.findMany({
      where: {
        publishedAt: { gte: sevenDaysAgo },
      },
      orderBy: [
        { viewCount: "desc" },
        { publishedAt: "desc" },
      ],
      take: 10,
      select: {
        title: true,
        slug: true,
        summary: true,
        aiSummary: true,
        source: true,
        category: true,
        publishedAt: true,
      },
    });

    // Fetch tension data from stats
    let tensionData = { tensionScore: 0, tensionLevel: "LOW" };
    try {
      const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : SITE_URL;
      const statsRes = await fetch(`${baseUrl}/api/stats`);
      if (statsRes.ok) {
        const statsJson = await statsRes.json();
        tensionData = {
          tensionScore: statsJson.data?.tensionScore ?? 0,
          tensionLevel: statsJson.data?.tensionLevel ?? "LOW",
        };
      }
    } catch (error) {
      console.error("[Weekly Email] Failed to fetch tension data:", error instanceof Error ? error.message : error);
    }

    // Generate email HTML
    const html = generateWeeklySummaryHtml(articles, tensionData, SITE_URL);

    // Try sending via Resend if API key is available
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const fromEmail = process.env.EMAIL_FROM || "Iran Savasi <noreply@iransavas.com>";
        const toList = process.env.EMAIL_WEEKLY_RECIPIENTS
          ? process.env.EMAIL_WEEKLY_RECIPIENTS.split(",").map((e) => e.trim())
          : [];

        const subject = `Iran Savasi - Haftalik Ozet (Gerilim: ${tensionData.tensionScore}/100)`;

        // Send via Resend REST API directly (no SDK dependency needed)
        const sendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: toList,
            subject,
            html,
          }),
        });

        if (toList.length === 0) {
          console.log("[Weekly Email] No recipients configured (EMAIL_WEEKLY_RECIPIENTS)");
          return NextResponse.json({
            data: {
              status: "no_recipients",
              articlesCount: articles.length,
              tensionScore: tensionData.tensionScore,
            },
          });
        }

        if (!sendRes.ok) {
          const errText = await sendRes.text();
          console.error("[Weekly Email] Resend API error:", errText);
        } else {
          const result = await sendRes.json();
          console.log("[Weekly Email] Sent successfully:", result);

          return NextResponse.json({
            data: {
              status: "sent",
              recipients: toList.length,
              articlesCount: articles.length,
              tensionScore: tensionData.tensionScore,
            },
          });
        }
      } catch (error) {
        console.error("[Weekly Email] Resend error:", error instanceof Error ? error.message : error);
        // Fall through to logging
      }
    }

    // Fallback: log the email content
    console.log("[Weekly Email] No RESEND_API_KEY configured. Email content preview:");
    console.log(`[Weekly Email] Subject: Iran Savasi - Haftalik Ozet (Gerilim: ${tensionData.tensionScore}/100)`);
    console.log(`[Weekly Email] Articles: ${articles.length}`);
    console.log(`[Weekly Email] HTML length: ${html.length} chars`);

    return NextResponse.json({
      data: {
        status: "logged",
        articlesCount: articles.length,
        tensionScore: tensionData.tensionScore,
        htmlLength: html.length,
      },
    });
  } catch (error) {
    console.error("[Weekly Email] Error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Haftalik e-posta gonderilemedi" } },
      { status: 500 },
    );
  }
}
