/**
 * NASA FIRMS (Fire Information for Resource Management System)
 * Free API - detects thermal hotspots/fires from satellite data
 * This is the SAME upstream source that bamqam.com /api/fires uses
 * 
 * Docs: https://firms.modaps.eosdis.nasa.gov/api/
 * No API key needed for CSV endpoint (limited rate)
 * For higher limits, get free MAP_KEY from NASA Earthdata
 */

export interface FirmsHotspot {
  latitude: number;
  longitude: number;
  brightness: number;
  confidence: string;
  acqDate: string;
  acqTime: string;
  frp: number; // Fire Radiative Power
}

// Iran + surrounding region bounding box
const IRAN_BBOX = "40,20,65,45"; // west,south,east,north

export async function fetchNasaFirms(days: number = 2): Promise<FirmsHotspot[]> {
  const hotspots: FirmsHotspot[] = [];

  try {
    console.log(`[NASA FIRMS] Fetching last ${days} days of hotspot data...`);

    const mapKey = process.env.NASA_FIRMS_KEY || "OPEN";
    // VIIRS SNPP satellite - Near Real-Time data
    const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${mapKey}/VIIRS_SNPP_NRT/${IRAN_BBOX}/${days}`;

    const res = await fetch(url, {
      headers: { "User-Agent": "IranSavas-Monitor/1.0" },
    });

    if (!res.ok) {
      console.error(`[NASA FIRMS] HTTP ${res.status}`);
      return [];
    }

    const csvText = await res.text();
    const lines = csvText.split("\n");

    if (lines.length < 2) {
      console.log("[NASA FIRMS] No data returned");
      return [];
    }

    // Parse CSV header
    const headers = lines[0].split(",").map((h) => h.trim());
    const latIdx = headers.indexOf("latitude");
    const lngIdx = headers.indexOf("longitude");
    const brightIdx = headers.indexOf("bright_ti4");
    const confIdx = headers.indexOf("confidence");
    const dateIdx = headers.indexOf("acq_date");
    const timeIdx = headers.indexOf("acq_time");
    const frpIdx = headers.indexOf("frp");

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(",");
      if (cols.length < 5) continue;

      const lat = parseFloat(cols[latIdx]);
      const lng = parseFloat(cols[lngIdx]);
      if (isNaN(lat) || isNaN(lng)) continue;

      // Filter: only significant hotspots (FRP > 5 or high confidence)
      const frp = parseFloat(cols[frpIdx]) || 0;
      const confidence = cols[confIdx]?.trim() || "nominal";
      if (frp < 5 && confidence === "low") continue;

      hotspots.push({
        latitude: lat,
        longitude: lng,
        brightness: parseFloat(cols[brightIdx]) || 0,
        confidence,
        acqDate: cols[dateIdx]?.trim() || "",
        acqTime: cols[timeIdx]?.trim() || "",
        frp,
      });
    }

    console.log(`[NASA FIRMS] ${hotspots.length} significant hotspots found`);
  } catch (error) {
    console.error("[NASA FIRMS] Error:", error instanceof Error ? error.message : error);
  }

  return hotspots;
}
