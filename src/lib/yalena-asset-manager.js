//

import fs from 'fs';
import path from 'path';
import { logger } from './yalena-logger.js';
import { LRUCache } from 'lru-cache';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { createHash } from 'crypto';

const ASSET_CACHE_DIR = path.join(process.cwd(), 'storage', 'assets');
const assetPaths = new Map();
const assetCache = new LRUCache({
  max: 8,
  maxSize: 32 * 1024 * 1024,
  maxEntrySize: 16 * 1024 * 1024,
  sizeCalculation: (buffer) => buffer.byteLength,
});

function getRemoteAssetPath(key, url) {
  const extension = path.extname(new URL(url).pathname).slice(0, 12) || '.asset';
  const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, '_');
  const urlHash = createHash('sha1').update(url).digest('hex').slice(0, 12);
  return path.join(ASSET_CACHE_DIR, `${safeKey}-${urlHash}${extension}`);
}

/**
 * Download configured assets to disk without retaining all buffers in memory.
 * @param {Object} configAssets - botConfig.assets or config.assets object
 */
export async function preloadAssets(configAssets) {
  if (!configAssets) return;

  const entries = Object.entries(configAssets);
  let nextEntry = 0;
  const workerCount = Math.min(2, entries.length);

  await Promise.all(
    Array.from({ length: workerCount }, async () => {
      while (nextEntry < entries.length) {
        const [key, filepath] = entries[nextEntry++];
        try {
          if (typeof filepath !== "string") continue;

          if (
            filepath.startsWith("http://") ||
            filepath.startsWith("https://")
          ) {
            const cachePath = getRemoteAssetPath(key, filepath);
            if (fs.existsSync(cachePath) && fs.statSync(cachePath).size > 0) {
              assetPaths.set(key, cachePath);
              logger.system("CACHE", `Loaded: ${key}`);
              continue;
            }

            const temporaryPath = `${cachePath}.tmp`;
            try {
              const response = await fetch(filepath, {
                headers: { "User-Agent": "Mozilla/5.0" },
                signal: AbortSignal.timeout(15000),
              });
              if (!response.ok) throw new Error(`HTTP ${response.status}`);
              if (!response.body) throw new Error("Empty response body");
              fs.mkdirSync(ASSET_CACHE_DIR, { recursive: true });
              await pipeline(
                Readable.fromWeb(response.body),
                fs.createWriteStream(temporaryPath),
              );
              fs.renameSync(temporaryPath, cachePath);
              assetPaths.set(key, cachePath);
              logger.system("CACHE", `Loaded: ${key}`);
              continue;
            } catch (remoteError) {
              try {
                fs.unlinkSync(temporaryPath);
              } catch { }
              try {
                fs.unlinkSync(cachePath);
              } catch { }
              // Keep a local fallback when the remote asset cannot be reached.
              const filename = path.basename(new URL(filepath).pathname);
              const fallbackPath = path.resolve(
                process.cwd(),
                "assets",
                "image",
                filename,
              );
              if (fs.existsSync(fallbackPath)) {
                assetPaths.set(key, fallbackPath);
                logger.warn(
                  "CACHE",
                  `Remote unavailable for ${key}, using local fallback`,
                );
              } else {
                logger.warn(
                  "CACHE",
                  `Failed to load ${key}: ${remoteError.message}`,
                );
              }
              continue;
            }
          }

          const fullPath = path.resolve(process.cwd(), filepath);
          if (fs.existsSync(fullPath)) {
            assetPaths.set(key, fullPath);
            logger.system("CACHE", `Loaded: ${key}`);
          } else {
            logger.warn("CACHE", `File not found: ${fullPath}`);
          }
        } catch (e) {
          logger.error("CACHE", `Failed to load ${key}: ${e.message}`);
        }
      }
    }),
  );
}

import config from '../../config.js';

/**
 * Get the cached asset buffer by key (e.g. 'yalena', 'yalena2').
 * If not in memory but available on disk, loads it synchronously into the LRU.
 * 
 * @param {string} key - The asset key defined in config.assets
 * @param {Object} [configAssets] - Optional config.assets reference for fallback
 * @returns {Buffer | null} The asset as a Buffer, or null if missing.
 */
export function getAssetBuffer(key, configAssets = null) {
  const cached = assetCache.get(key);
  if (cached) return cached;
  
  const assets = configAssets || config?.assets;
  const filepath = assetPaths.get(key) || assets?.[key];
  if (filepath && !filepath.startsWith('http')) {
    try {
      const fullPath = path.resolve(process.cwd(), filepath);
      if (fs.existsSync(fullPath)) {
        const buf = fs.readFileSync(fullPath);
        assetCache.set(key, buf);
        return buf;
      }
    } catch (e) {
      console.error(`  ✖  ERR   Failed to read ${key} from disk:`, e.message);
    }
  }
  
  return null;
}

/**
 * Update an asset buffer in memory and save it to disk (useful for owner commands that change assets).
 * 
 * @param {string} key - Asset key
 * @param {Buffer} buffer - New asset buffer
 * @param {string} filepath - The path where it should be saved
 */
export function updateAssetAndSave(key, buffer, filepath) {
  assetCache.set(key, buffer);
  if (filepath && !filepath.startsWith('http')) {
    try {
      const fullPath = path.resolve(process.cwd(), filepath);
      fs.writeFileSync(fullPath, buffer);
      assetPaths.set(key, fullPath);
    } catch (e) {
      console.error(`  ✖  ERR   Failed to write updated asset ${key} to disk:`, e.message);
    }
  }
}
