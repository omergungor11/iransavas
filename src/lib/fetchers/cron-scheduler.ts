import cron from "node-cron";
import { runFetchAll } from "./fetch-orchestrator";

let cronTask: ReturnType<typeof cron.schedule> | null = null;
let isRunning = false;

export function startCron(interval: string = "*/15 * * * *"): boolean {
  if (cronTask) {
    console.log("[Cron] Already running, stopping old task first");
    cronTask.stop();
  }

  try {
    cronTask = cron.schedule(interval, async () => {
      if (isRunning) {
        console.log("[Cron] Previous fetch still running, skipping");
        return;
      }

      isRunning = true;
      console.log(`[Cron] Starting fetch at ${new Date().toISOString()}`);

      try {
        const summary = await runFetchAll();
        console.log(`[Cron] Completed: ${summary.totalSaved} new articles, ${summary.totalDuplicates} duplicates, ${summary.totalMapEvents} map events (${summary.durationMs}ms)`);
      } catch (error) {
        console.error("[Cron] Fetch error:", error instanceof Error ? error.message : error);
      } finally {
        isRunning = false;
      }
    });

    console.log(`[Cron] Scheduled: ${interval}`);
    return true;
  } catch (error) {
    console.error("[Cron] Schedule error:", error);
    return false;
  }
}

export function stopCron(): boolean {
  if (cronTask) {
    cronTask.stop();
    cronTask = null;
    console.log("[Cron] Stopped");
    return true;
  }
  return false;
}

export function getCronStatus(): { running: boolean; scheduled: boolean } {
  return {
    running: isRunning,
    scheduled: cronTask !== null,
  };
}
