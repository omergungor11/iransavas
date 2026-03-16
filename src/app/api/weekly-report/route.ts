export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const FALLBACK_REPORT = {
  id: "fallback-weekly-001",
  weekStart: new Date("2026-03-09T00:00:00Z").toISOString(),
  weekEnd: new Date("2026-03-15T00:00:00Z").toISOString(),
  summary:
    "Bu hafta İran-İsrail gerilimi yeni bir boyut kazandı. Hürmüz Boğazı'ndaki deniz hareketliliği artarken, diplomatik kanallar yoğun şekilde çalışmaya devam etti. ABD'nin bölgeye ek savaş gemileri konuşlandırması gerginliği tırmandırdı. İran, nükleer tesislerinde denetim izni vermeyi reddederek uluslararası toplumun tepkisini çekti. Bölgedeki vekalet güçleri arasında çatışmalar sürdü.",
  keyEvents: JSON.stringify([
    "Hürmüz Boğazı'nda İran donanması tatbikat başlattı",
    "ABD, USS Eisenhower uçak gemisini Basra Körfezi'ne sevk etti",
    "İsrail, Suriye'deki İran destekli mevzileri vurdu",
    "IAEA, İran'ın uranyum zenginleştirme oranını artırdığını açıkladı",
    "Irak'taki ABD üslerine drone saldırısı gerçekleşti",
    "BM Güvenlik Konseyi acil toplantı çağrısı yaptı",
  ]),
  tensionTrend: "rising",
  tensionScore: 78,
  totalIncidents: 23,
  totalCasualties: 47,
  outlook:
    "Önümüzdeki hafta IAEA'nın İran raporu yayınlanacak. Bu rapor, uluslararası yaptırımların seyri açısından belirleyici olabilir. Hürmüz Boğazı'ndaki tatbikatın sona ermesiyle birlikte deniz trafiğinin normale dönüp dönmeyeceği takip edilmeli. İsrail-İran arasındaki dolaylı çatışma yeni cephelere yayılma riski taşıyor.",
  publishedAt: new Date("2026-03-15T18:00:00Z").toISOString(),
  createdAt: new Date("2026-03-15T18:00:00Z").toISOString(),
};

export async function GET() {
  try {
    const report = await prisma.weeklyReport.findFirst({
      orderBy: { weekStart: "desc" },
    });

    if (report) {
      return NextResponse.json({ data: report });
    }

    return NextResponse.json({ data: FALLBACK_REPORT, meta: { fallback: true } });
  } catch (error) {
    console.error("[API /weekly-report]", error);
    return NextResponse.json({ data: FALLBACK_REPORT, meta: { fallback: true } });
  }
}
