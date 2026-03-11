import cron from "node-cron";
import { runFetchAll, type FetchSummary } from "./fetch-orchestrator";

let cronTask: ReturnType<typeof cron.schedule> | null = null;
let isRunning = false;
let currentInterval = "";

// ============ RUN HISTORY ============

interface CronRun {
  startedAt: string;
  completedAt: string;
  durationMs: number;
  status: "success" | "error";
  totalSaved: number;
  totalFetched: number;
  error?: string;
}

const MAX_HISTORY = 20;
const runHistory: CronRun[] = [];
let consecutiveErrors = 0;

function recordRun(run: CronRun) {
  runHistory.unshift(run);
  if (runHistory.length > MAX_HISTORY) {
    runHistory.length = MAX_HISTORY;
  }
}

// ============ RETRY LOGIC ============

const RETRY_CONFIG = {
  maxRetries: 2,
  delayMs: 30_000, // 30 seconds between retries
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(): Promise<FetchSummary> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= RETRY_CONFIG.maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`[Cron] Retry ${attempt}/${RETRY_CONFIG.maxRetries} after ${RETRY_CONFIG.delayMs}ms`);
        await sleep(RETRY_CONFIG.delayMs);
      }
      return await runFetchAll();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`[Cron] Attempt ${attempt + 1} failed:`, lastError.message);
    }
  }

  throw lastError;
}

// ============ CRON MANAGEMENT ============

export function startCron(interval: string = "*/30 * * * *"): boolean {
  if (cronTask) {
    console.log("[Cron] Already running, stopping old task first");
    cronTask.stop();
  }

  try {
    currentInterval = interval;
    cronTask = cron.schedule(interval, async () => {
      if (isRunning) {
        console.log("[Cron] Previous fetch still running, skipping");
        return;
      }

      isRunning = true;
      const startedAt = new Date();
      console.log(`[Cron] Starting fetch at ${startedAt.toISOString()}`);

      try {
        const summary = await fetchWithRetry();
        const completedAt = new Date();

        consecutiveErrors = 0;
        recordRun({
          startedAt: startedAt.toISOString(),
          completedAt: completedAt.toISOString(),
          durationMs: completedAt.getTime() - startedAt.getTime(),
          status: "success",
          totalSaved: summary.totalSaved,
          totalFetched: summary.totalFetched,
        });

        console.log(`[Cron] Completed: ${summary.totalSaved} saved, ${summary.totalDuplicates} dupes, ${summary.totalMapEvents} map (${summary.durationMs}ms)`);
      } catch (error) {
        const completedAt = new Date();
        consecutiveErrors++;

        recordRun({
          startedAt: startedAt.toISOString(),
          completedAt: completedAt.toISOString(),
          durationMs: completedAt.getTime() - startedAt.getTime(),
          status: "error",
          totalSaved: 0,
          totalFetched: 0,
          error: error instanceof Error ? error.message : String(error),
        });

        console.error(`[Cron] Failed after retries (consecutive: ${consecutiveErrors}):`, error instanceof Error ? error.message : error);
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
    currentInterval = "";
    console.log("[Cron] Stopped");
    return true;
  }
  return false;
}

export interface CronStatus {
  running: boolean;
  scheduled: boolean;
  interval: string;
  consecutiveErrors: number;
  lastRun: CronRun | null;
  recentHistory: CronRun[];
}

export function getCronStatus(): CronStatus {
  return {
    running: isRunning,
    scheduled: cronTask !== null,
    interval: currentInterval,
    consecutiveErrors,
    lastRun: runHistory[0] ?? null,
    recentHistory: runHistory.slice(0, 5),
  };
}
