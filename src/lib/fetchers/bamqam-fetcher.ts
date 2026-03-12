import * as cheerio from "cheerio";

export interface BamqamEvent {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  eventType: string;
  severity: string;
  date: Date;
  source: string;
}

/**
 * Fetches war event data from bamqam.com
 * The site uses Leaflet maps and loads data dynamically.
 * We try multiple strategies to extract event data.
 */
export async function fetchFromBamqam(): Promise<BamqamEvent[]> {
  const events: BamqamEvent[] = [];

  try {
    console.log("[Bamqam] Fetching event data...");

    // Strategy 1: Try known API patterns
    const apiPaths = [
      "/api/events",
      "/api/fires",
      "/api/markers",
      "/api/incidents",
      "/api/data",
    ];

    for (const path of apiPaths) {
      try {
        const res = await fetch(`https://bamqam.com${path}`, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept: "application/json",
          },
          signal: AbortSignal.timeout(10_000),
        });

        if (res.ok) {
          const data = await res.json();
          // data found at path

          if (Array.isArray(data)) {
            for (const item of data) {
              const event = parseBamqamItem(item);
              if (event) events.push(event);
            }
          } else if (data?.data && Array.isArray(data.data)) {
            for (const item of data.data) {
              const event = parseBamqamItem(item);
              if (event) events.push(event);
            }
          } else if (data?.events && Array.isArray(data.events)) {
            for (const item of data.events) {
              const event = parseBamqamItem(item);
              if (event) events.push(event);
            }
          }

          if (events.length > 0) break;
        }
      } catch {
        // Try next path
      }
    }

    // Strategy 2: Scrape the page for embedded data
    if (events.length === 0) {
      try {
        const res = await fetch("https://bamqam.com/", {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept: "text/html",
          },
          signal: AbortSignal.timeout(15_000),
        });

        if (res.ok) {
          const html = await res.text();
          const $ = cheerio.load(html);

          // Look for __NEXT_DATA__ which might contain initial props
          const nextDataScript = $('script#__NEXT_DATA__').html();
          if (nextDataScript) {
            try {
              const nextData = JSON.parse(nextDataScript);
              const pageProps = nextData?.props?.pageProps;
              if (pageProps) {
                // found __NEXT_DATA__ with pageProps
                // Extract any event-like data from pageProps
                extractEventsFromObject(pageProps, events);
              }
            } catch {
              // Not valid JSON
            }
          }

          // Look for inline script data (common pattern for map data)
          $("script").each((_, script) => {
            const text = $(script).html() || "";
            // Look for coordinate patterns like [lat, lng] or {lat: x, lng: y}
            if (text.includes("L.marker") || text.includes("L.circleMarker") || text.includes("addTo(map)")) {
              const coordPattern = /\[(-?\d+\.?\d*),\s*(-?\d+\.?\d*)\]/g;
              let match;
              while ((match = coordPattern.exec(text)) !== null) {
                const lat = parseFloat(match[1]);
                const lng = parseFloat(match[2]);
                // Filter for Middle East region
                if (lat >= 20 && lat <= 45 && lng >= 40 && lng <= 65) {
                  events.push({
                    title: "Bamqam Event",
                    description: "Event detected from bamqam.com map data",
                    latitude: lat,
                    longitude: lng,
                    eventType: "DIGER",
                    severity: "ORTA",
                    date: new Date(),
                    source: "bamqam.com",
                  });
                }
              }
            }
          });
        }
      } catch (error) {
        console.error("[Bamqam] Scrape error:", error instanceof Error ? error.message : error);
      }
    }

    console.log(`[Bamqam] Total events extracted: ${events.length}`);
  } catch (error) {
    console.error("[Bamqam] Error:", error instanceof Error ? error.message : error);
  }

  return events;
}

function parseBamqamItem(item: Record<string, unknown>): BamqamEvent | null {
  // Try various common field name patterns
  const lat = Number(item.lat || item.latitude || item.y || item.Lat);
  const lng = Number(item.lng || item.longitude || item.lon || item.x || item.Lng);

  if (isNaN(lat) || isNaN(lng)) return null;
  // Filter for Middle East region
  if (lat < 20 || lat > 45 || lng < 40 || lng > 65) return null;

  const title = String(item.title || item.name || item.label || item.description || "Unknown Event");
  const description = String(item.description || item.desc || item.details || item.content || "");
  const dateStr = String(item.date || item.time || item.timestamp || item.created_at || "");
  const date = dateStr ? new Date(dateStr) : new Date();

  // Map severity
  let severity = "ORTA";
  const typeStr = String(item.type || item.category || item.eventType || "").toLowerCase();
  if (typeStr.includes("critical") || typeStr.includes("major") || typeStr.includes("fire")) severity = "YUKSEK";
  if (typeStr.includes("strike") || typeStr.includes("attack") || typeStr.includes("explosion")) severity = "KRITIK";

  // Map event type
  let eventType = "DIGER";
  if (typeStr.includes("air") || typeStr.includes("strike") || typeStr.includes("fire")) eventType = "HAVA_SALDIRISI";
  if (typeStr.includes("sea") || typeStr.includes("naval") || typeStr.includes("marine")) eventType = "DENIZ_OPERASYONU";
  if (typeStr.includes("ground") || typeStr.includes("combat") || typeStr.includes("clash")) eventType = "CATISMA";

  return {
    title: title.slice(0, 300),
    description: description.slice(0, 2000),
    latitude: lat,
    longitude: lng,
    eventType,
    severity,
    date: isNaN(date.getTime()) ? new Date() : date,
    source: "bamqam.com",
  };
}

function extractEventsFromObject(obj: Record<string, unknown>, events: BamqamEvent[], depth = 0): void {
  if (!obj || typeof obj !== "object" || depth > 5) return;

  if (("lat" in obj || "latitude" in obj) && ("lng" in obj || "longitude" in obj)) {
    const event = parseBamqamItem(obj);
    if (event) events.push(event);
    return;
  }

  for (const value of Object.values(obj)) {
    if (Array.isArray(value)) {
      for (const item of value.slice(0, 200)) {
        if (item && typeof item === "object") {
          extractEventsFromObject(item as Record<string, unknown>, events, depth + 1);
        }
      }
    } else if (value && typeof value === "object") {
      extractEventsFromObject(value as Record<string, unknown>, events, depth + 1);
    }
  }
}
