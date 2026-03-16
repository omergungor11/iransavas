interface EmailArticle {
  title: string;
  slug: string;
  summary: string | null;
  aiSummary: string | null;
  source: string;
  category: string;
  publishedAt: Date | string;
}

interface TensionData {
  tensionScore: number;
  tensionLevel: string;
}

/**
 * Generate styled HTML email for the weekly summary
 */
export function generateWeeklySummaryHtml(
  articles: EmailArticle[],
  tension: TensionData,
  siteUrl: string = "https://iransavas.vercel.app",
): string {
  const tensionColor =
    tension.tensionLevel === "SEVERE" ? "#dc2626" :
    tension.tensionLevel === "HIGH" ? "#ea580c" :
    tension.tensionLevel === "ELEVATED" ? "#d97706" : "#16a34a";

  const tensionLabel =
    tension.tensionLevel === "SEVERE" ? "Ciddi" :
    tension.tensionLevel === "HIGH" ? "Yuksek" :
    tension.tensionLevel === "ELEVATED" ? "Yukseliste" : "Dusuk";

  const articleRows = articles
    .map((a, i) => {
      const summary = a.aiSummary || a.summary || "";
      const date = new Date(a.publishedAt);
      const dateStr = date.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
      });

      return `
        <tr>
          <td style="padding: 16px 0; border-bottom: 1px solid #2a2a2a;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="width: 32px; vertical-align: top; padding-right: 12px;">
                  <div style="width: 28px; height: 28px; border-radius: 50%; background: #1e1e1e; color: #ef4444; font-weight: bold; font-size: 14px; line-height: 28px; text-align: center;">
                    ${i + 1}
                  </div>
                </td>
                <td>
                  <a href="${siteUrl}/haberler/${a.slug}" style="color: #f5f5f5; text-decoration: none; font-weight: 600; font-size: 15px; line-height: 1.4;">
                    ${escapeHtml(a.title)}
                  </a>
                  <div style="margin-top: 4px; color: #a3a3a3; font-size: 13px; line-height: 1.5;">
                    ${escapeHtml(summary.slice(0, 150))}
                  </div>
                  <div style="margin-top: 6px; font-size: 12px; color: #737373;">
                    ${escapeHtml(a.source)} &middot; ${dateStr} &middot; ${escapeHtml(a.category)}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iran Savasi - Haftalik Ozet</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%;">
          <!-- Header -->
          <tr>
            <td style="padding: 24px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="margin: 0 0 8px; color: #ef4444; font-size: 24px; font-weight: 700;">
                Iran Savasi
              </h1>
              <p style="margin: 0; color: #a3a3a3; font-size: 14px;">
                Haftalik Haber Ozeti
              </p>
            </td>
          </tr>

          <!-- Tension Score -->
          <tr>
            <td style="padding: 20px 24px; background-color: #141414; border-left: 1px solid #2a2a2a; border-right: 1px solid #2a2a2a;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 16px; background-color: #1a1a1a; border-radius: 8px; border: 1px solid #2a2a2a;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <div style="color: #a3a3a3; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Gerilim Skoru</div>
                          <div style="margin-top: 4px;">
                            <span style="color: ${tensionColor}; font-size: 32px; font-weight: 700;">${tension.tensionScore}</span>
                            <span style="color: ${tensionColor}; font-size: 14px; margin-left: 4px;">/100</span>
                          </div>
                          <div style="margin-top: 2px; color: ${tensionColor}; font-size: 13px; font-weight: 600;">
                            ${tensionLabel}
                          </div>
                        </td>
                        <td style="text-align: right; vertical-align: middle;">
                          <a href="${siteUrl}/analiz" style="display: inline-block; padding: 8px 16px; background-color: #1e1e1e; color: #ef4444; text-decoration: none; border-radius: 6px; font-size: 13px; border: 1px solid #333;">
                            Detayli Analiz &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Top Stories -->
          <tr>
            <td style="padding: 0 24px 20px; background-color: #141414; border-left: 1px solid #2a2a2a; border-right: 1px solid #2a2a2a;">
              <h2 style="margin: 0 0 12px; color: #f5f5f5; font-size: 18px; font-weight: 600;">
                Haftanin One Cikan Haberleri
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${articleRows}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 20px 24px; background-color: #141414; text-align: center; border-left: 1px solid #2a2a2a; border-right: 1px solid #2a2a2a;">
              <a href="${siteUrl}/haberler" style="display: inline-block; padding: 12px 32px; background-color: #ef4444; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
                Tum Haberleri Gor
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px; background-color: #0f0f0f; border-radius: 0 0 12px 12px; border: 1px solid #2a2a2a; border-top: none; text-align: center;">
              <p style="margin: 0 0 8px; color: #737373; font-size: 12px;">
                Bu e-posta iransavas.com haftalik ozet aboneligi kapsaminda gonderilmistir.
              </p>
              <p style="margin: 0; color: #525252; font-size: 12px;">
                <a href="${siteUrl}/abonelik-iptal" style="color: #525252; text-decoration: underline;">Aboneligi iptal et</a>
                &nbsp;&middot;&nbsp;
                <a href="${siteUrl}" style="color: #525252; text-decoration: underline;">iransavas.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
