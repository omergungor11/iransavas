export interface NewsSource {
  id: string;
  name: string;
  type: "rss" | "newsapi" | "scrape";
  url: string;
  language: string;
  category: string;
  enabled: boolean;
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
  },
  {
    id: "bbc-world",
    name: "BBC News",
    type: "rss",
    url: "http://feeds.bbci.co.uk/news/world/middle_east/rss.xml",
    language: "en",
    category: "GENEL",
    enabled: true,
  },
  {
    id: "aljazeera",
    name: "Al Jazeera",
    type: "rss",
    url: "https://www.aljazeera.com/xml/rss/all.xml",
    language: "en",
    category: "GENEL",
    enabled: true,
  },
  {
    id: "anadolu-ajans",
    name: "Anadolu Ajansi",
    type: "rss",
    url: "https://www.aa.com.tr/tr/rss/default?cat=guncel",
    language: "tr",
    category: "GENEL",
    enabled: true,
  },
  {
    id: "trt-haber",
    name: "TRT Haber",
    type: "rss",
    url: "https://www.trthaber.com/dunya_articles.rss",
    language: "tr",
    category: "GENEL",
    enabled: true,
  },
  {
    id: "hurriyet",
    name: "Hurriyet",
    type: "rss",
    url: "https://www.hurriyet.com.tr/rss/dunya",
    language: "tr",
    category: "GENEL",
    enabled: true,
  },
  {
    id: "iran-intl",
    name: "Iran International",
    type: "rss",
    url: "https://www.iranintl.com/en/feed",
    language: "en",
    category: "SIYASI",
    enabled: true,
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
  },
  {
    id: "crisis-group",
    name: "International Crisis Group",
    type: "scrape",
    url: "https://www.crisisgroup.org/middle-east-north-africa/gulf-and-arabian-peninsula/iran",
    language: "en",
    category: "DIPLOMASI",
    enabled: false, // 403 blocked, disabled until alternative found
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
