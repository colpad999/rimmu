//

// Compatibility bridge: fitur port Yalena wajib berjalan di atas core Yalena.
import { getDatabase } from "./yalena-database.js";
import { f as httpRequest } from "./yalena-http.js";
import { fetchJson, randomInt, md5 } from "./yalena-utils.js";
import { sendText } from "./yalena-message.js";
import { yalenaApiManager } from "./yalena-apimanager.js";
import config from "../../config.js";

export { getDatabase, httpRequest, fetchJson, randomInt, md5, sendText, yalenaApiManager, config };

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
