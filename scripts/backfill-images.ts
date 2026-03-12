import { backfillOgImages } from "../src/lib/fetchers/og-image-fetcher";

async function main() {
  console.log("Starting OG image backfill...");
  const updated = await backfillOgImages(50);
  console.log(`Done. Updated ${updated} articles with og:image.`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
