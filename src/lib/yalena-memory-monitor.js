//

import { logger } from "./yalena-logger.js";
const RSS_LIMIT = 500 * 1024 * 1024;
const CHECK_INTERVAL = 5 * 60 * 1000;

let monitorTimer = null;

function formatMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(1) + "MB";
}

function startMemoryMonitor() {
  if (monitorTimer) return;

  monitorTimer = setInterval(() => {
    if (global.gc) global.gc();
    const mem = process.memoryUsage();

    logger.system(
      "memory",
      `rss ${formatMB(mem.rss)} · heap ${formatMB(mem.heapUsed)}/${formatMB(mem.heapTotal)}`,
    );
    if (mem.rss > RSS_LIMIT) {
      logger.warn("memory", `RSS melewati target ${formatMB(RSS_LIMIT)}`);
    }
  }, CHECK_INTERVAL);

  if (monitorTimer.unref) monitorTimer.unref();
  logger.success(
    "memory",
    `Pantau RAM aktif, target ${formatMB(RSS_LIMIT)}, cek tiap ${CHECK_INTERVAL / 60000} menit`,
  );
}

function stopMemoryMonitor() {
  if (monitorTimer) {
    clearInterval(monitorTimer);
    monitorTimer = null;
  }
}

export { startMemoryMonitor, stopMemoryMonitor };
