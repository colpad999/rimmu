//

// Compatibility bridge: fitur port Rimuru wajib berjalan di atas core Rimuru.
import { getDatabase } from "./rimuru-database.js";
import { f as httpRequest } from "./rimuru-http.js";
import { fetchJson, randomInt, md5 } from "./rimuru-utils.js";
import { sendText } from "./rimuru-message.js";
import { rimuruApiManager } from "./rimuru-apimanager.js";
import config from "../../config.js";

export { getDatabase, httpRequest, fetchJson, randomInt, md5, sendText, rimuruApiManager, config };

export async function riooJson(url, options = {}) {
  const { method = "GET", headers = {}, body = null, timeout } = options;
  if (timeout) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
        signal: controller.signal,
      });
      return await response.json();
    } finally {
      clearTimeout(timer);
    }
  }
  return fetchJson(url, options.fetchOptions || {});
}
