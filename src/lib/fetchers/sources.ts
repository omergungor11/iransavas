export type Perspective = "Türk Medyası" | "Batı Medyası" | "İran Resmî" | "İsrail Medyası" | "Bağımsız";

export interface NewsSource {
  id: string;
  name: string;
  type: "rss" | "newsapi" | "scrape";
  url: string;
  language: string;
  category: string;
  enabled: boolean;
  perspective: Perspective;
  /** CSS selectors for scraping */
  selectors?: {
    articleList: string;
    title: string;
    link: string;
    summary?: string;
    date?: string;
    image?: string;
  };
  /** NewsAPI specific */
  newsApiQuery?: string;
}

export const NEWS_SOURCES: NewsSource[] = [
  // ============ RSS FEEDS ============
  {
    id: "reuters-world",
    name: "Reuters",
    type: "rss",
    url: "https://cdn.feedcontrol.net/8/1115-TvWAhu4G064WT.xml",
    language: "en",
    category: "GENEL",
    enabled: true,
    perspective: "Batı Medyası",
  },
  {
    id: "bbc-world",
    name: "BBC News",
    type: "rss",
    url: "http://feeds.bbci.co.uk/news/world/middle_east/rss.xml",
    language: "en",
    category: "GENEL",
    enabled: true,
    perspective: "Batı Medyası",
  },
  {
    id: "aljazeera",
    name: "Al Jazeera",
    type: "rss",
    url: "https://www.aljazeera.com/xml/rss/all.xml",
    language: "en",
    category: "GENEL",
    enabled: true,
    perspective: "Bağımsız",
  },
  {
    id: "anadolu-ajans",
    name: "Anadolu Ajansı",
    type: "rss",
    url: "https://www.aa.com.tr/tr/rss/default?cat=guncel",
    language: "tr",
    category: "GENEL",
    enabled: true,
    perspective: "Türk Medyası",
  },
  {
    id: "trt-haber",
    name: "TRT Haber",
    type: "rss",
    url: "https://www.trthaber.com/dunya_articles.rss",
    language: "tr",
    category: "GENEL",
    enabled: true,
    perspective: "Türk Medyası",
  },
  {
    id: "hurriyet",
    name: "Hürriyet",
    type: "rss",
    url: "https://www.hurriyet.com.tr/rss/dunya",
    language: "tr",
    category: "GENEL",
    enabled: true,
    perspective: "Türk Medyası",
  },
  {
    id: "iran-intl",
    name: "Iran International",
    type: "rss",
    url: "https://www.iranintl.com/en/feed",
    language: "en",
    category: "SIYASI",
    enabled: true,
    perspective: "Bağımsız",
  },

  // ============ NEW RSS FEEDS ============
  {
    id: "bbc-turkce",
    name: "BBC Türkçe",
    type: "rss",
    url: "https://feeds.bbci.co.uk/turkce/rss.xml",
    language: "tr",
    category: "GENEL",
    enabled: true,
    perspective: "Batı Medyası",
  },
  {
    id: "middle-east-eye",
    name: "Middle East Eye",
    type: "rss",
    url: "https://www.middleeasteye.net/rss",
    language: "en",
    category: "GENEL",
    enabled: true,
    perspective: "Bağımsız",
  },
  {
    id: "irna",
    name: "IRNA",
    type: "rss",
    url: "https://en.irna.ir/rss",
    language: "en",
    category: "SIYASI",
    enabled: true,
    perspective: "İran Resmî",
  },
  {
    id: "times-of-israel",
    name: "Times of Israel",
    type: "rss",
    url: "https://www.timesofisrael.com/feed/",
    language: "en",
    category: "GENEL",
    enabled: true,
    perspective: "İsrail Medyası",
  },
  {
    id: "dw-turkce",
    name: "DW Türkçe",
    type: "rss",
    url: "https://rss.dw.com/xml/rss-tur-all",
    language: "tr",
    category: "GENEL",
    enabled: true,
    perspective: "Batı Medyası",
  },

  // ============ NEWSAPI ============
  {
    id: "newsapi-iran-war",
    name: "NewsAPI - Iran War",
    type: "newsapi",
    url: "https://newsapi.org/v2/everything",
    language: "en",
    category: "ASKERI",
    enabled: true,
    perspective: "Batı Medyası",
    newsApiQuery: "Iran war OR Iran military OR Iran conflict OR Iran strike",
  },
  {
    id: "newsapi-iran-tr",
    name: "NewsAPI - Iran TR",
    type: "newsapi",
    url: "https://newsapi.org/v2/everything",
    language: "tr",
    category: "GENEL",
    enabled: true,
    perspective: "Türk Medyası",
    newsApiQuery: "İran savaş OR İran çatışma OR İran askeri",
  },
  {
    id: "newsapi-middle-east",
    name: "NewsAPI - Middle East",
    type: "newsapi",
    url: "https://newsapi.org/v2/everything",
    language: "en",
    category: "DIPLOMASI",
    enabled: true,
    perspective: "Batı Medyası",
    newsApiQuery: "Middle East Iran diplomacy OR Iran sanctions OR Iran nuclear",
  },

  // ============ RSS (ex-scrape, converted) ============
  {
    id: "defense-news",
    name: "Defense News",
    type: "rss",
    url: "https://www.defensenews.com/arc/outboundfeeds/rss/category/global/mideast-africa/?outputType=xml",
    language: "en",
    category: "ASKERI",
    enabled: true,
    perspective: "Batı Medyası",
  },
  {
    id: "crisis-group",
    name: "International Crisis Group",
    type: "scrape",
    url: "https://www.crisisgroup.org/middle-east-north-africa/gulf-and-arabian-peninsula/iran",
    language: "en",
    category: "DIPLOMASI",
    enabled: false, // 403 blocked, disabled until alternative found
    perspective: "Bağımsız",
    selectors: {
      articleList: ".field--name-field-icg-eck-ct-card",
      title: "h3 a, .title a",
      link: "h3 a, .title a",
      summary: ".field--name-field-icg-summary",
      date: ".date",
    },
  },
];

export function getEnabledSources(): NewsSource[] {
  return NEWS_SOURCES.filter((s) => s.enabled);
}

export function getSourcesByType(type: NewsSource["type"]): NewsSource[] {
  return NEWS_SOURCES.filter((s) => s.enabled && s.type === type);
}

/** Get perspective for a source name (used for fallback/DB articles) */
export function getPerspectiveBySourceName(sourceName: string): Perspective {
  const source = NEWS_SOURCES.find(
    (s) => s.name.toLowerCase() === sourceName.toLowerCase()
  );
  if (source) return source.perspective;

  // Heuristic fallback based on common source names
  const name = sourceName.toLowerCase();
  if (name.includes("trt") || name.includes("anadolu") || name.includes("hürriyet") || name.includes("hurriyet") || name.includes("sabah")) return "Türk Medyası";
  if (name.includes("irna") || name.includes("press tv") || name.includes("fars")) return "İran Resmî";
  if (name.includes("times of israel") || name.includes("jerusalem post") || name.includes("haaretz")) return "İsrail Medyası";
  if (name.includes("reuters") || name.includes("bbc") || name.includes("cnn") || name.includes("guardian") || name.includes("ap") || name.includes("dw") || name.includes("financial times")) return "Batı Medyası";
  return "Bağımsız";
}
