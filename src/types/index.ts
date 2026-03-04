export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string | null;
  aiSummary: string | null;
  source: string;
  sourceUrl: string | null;
  imageUrl: string | null;
  category: NewsCategory;
  publishedAt: Date;
  createdAt: Date;
}

export type NewsCategory = "GENEL" | "ASKERI" | "SIYASI" | "EKONOMI" | "INSANI_YARDIM" | "DIPLOMASI";

export interface WarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  latitude: number;
  longitude: number;
  eventType: EventType;
  severity: Severity;
  casualties: number | null;
  source: string | null;
}

export type EventType = "CATISMA" | "HAVA_SALDIRISI" | "DENIZ_OPERASYONU" | "DIPLOMASI" | "INSANI_KRIZ" | "DIGER";
export type Severity = "DUSUK" | "ORTA" | "YUKSEK" | "KRITIK";

export interface CasualtyReport {
  id: string;
  date: Date;
  civilianCasualties: number;
  militaryCasualties: number;
  injured: number;
  displaced: number;
  region: string;
  source: string | null;
}

export interface TimelineEntry {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: string;
  importance: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  relatedEventId: string | null;
}

export interface DashboardStats {
  totalEvents: number;
  totalCasualties: number;
  totalDisplaced: number;
  totalNews: number;
  recentEvents: WarEvent[];
  casualtyTrend: { date: string; civilian: number; military: number }[];
  eventsByType: { type: string; count: number }[];
  eventsBySeverity: { severity: string; count: number }[];
}

export interface Report {
  id: string;
  title: string;
  type: "HAFTALIK" | "AYLIK" | "OZEL";
  content: string;
  summary: string;
  period: string;
  publishedAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    pageSize: number;
  };
}

export interface ApiError {
  error: {
    statusCode: number;
    code: string;
    message: string;
  };
}
