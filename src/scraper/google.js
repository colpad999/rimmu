/*
╔══════════════════════════════════════════════╗
║       👑  𝑹𝑰𝑴𝑼𝑹𝑼 𝑴𝑫 〽️                        ║
╚══════════════════════════════════════════════╝

🪽 𝑵𝒐𝒕𝒆 :
Rimuru MD adalah SC hasil rename dari SC Ourin MD.

╭─────────────「 🜲 𝑰𝑵𝑭𝑶 𝑶𝑼𝑹𝑰𝑵 」─────────────╮
│ 👤 Developer : 𝑯𝒚𝒖𝒖 / 𝒁𝒂𝒏𝒏
│ 🎵 TikTok    : https://tiktok.com/@ourinmd
│ 📢 WhatsApp  : https://whatsapp.com/channel/0029VbB37bgBfxoAmAlsgE0t
╰─────────────────────────────────────────────╯

╭────────────「 ✦ 𝑰𝑵𝑭𝑶 𝑹𝑰𝑴𝑼𝑹𝑼 ✦ 」────────────╮
│ 👤 Developer Pihak Ketiga : 𝑨𝒏𝒊𝒕𝒂 𝑷𝒖𝒕𝒓𝒊 𝑨𝒛𝒛𝒂𝒉𝒓𝒂
│ 🎵 TikTok                 : https://tiktok.com/@anita.putri.azzah1
│ 📸 Instagram              : anit_aputriazzahrah
│ 📢 Saluran                : https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P
│ ▶️ YouTube                : https://youtube.com/@rimurumd
╰─────────────────────────────────────────────╯

        ⚠️ 𝑫𝑶 𝑵𝑶𝑻 𝑹𝑬𝑴𝑶𝑽𝑬 𝑪𝑹𝑬𝑫𝑰𝑻 ⚠️
              ❖ 𝐉𝐚𝐧𝐠𝐚𝐧 𝐡𝐚𝐩𝐮𝐬 𝐜𝐫𝐞𝐝𝐢𝐭 ❖

                 「 👑 𝑹𝑰𝑴𝑼𝑹𝑼 𝑴𝑫 👑 」
*/

import * as cheerio from "cheerio";
import axios from "axios";

const ENGINE_CONFIG = Object.freeze({
  TARGET_HOST: "bmV3cy5nb29nbGUuY29t",
  DEFAULT_LANG: "id",
  DEFAULT_REGION: "ID",
  NETWORK_TIMEOUT: 8500,
  UA_POOL:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
});

class EngineException extends Error {
  constructor(message, coreCode) {
    super(message);
    this.name = "EngineException";
    this.coreCode = coreCode;
    this.timestamp = Date.now();
  }
}

class GoogleScraperKernel {
  constructor() {
    this.resolverHost = Buffer.from(
      ENGINE_CONFIG.TARGET_HOST,
      "base64",
    ).toString("utf-8");
  }

  $extractCipherPayload(sourceUrl) {
    if (!sourceUrl || typeof sourceUrl !== "string") return null;
    const pointer = sourceUrl.indexOf("articles/");
    if (pointer === -1) return null;
    return sourceUrl.substring(pointer + 9).split("?")[0];
  }

  $transformSerialization(cipherText) {
    let serialized = cipherText.replace(/-/g, "+").replace(/_/g, "/");
    const padMetric = serialized.length % 4;
    if (padMetric > 0) {
      serialized += "=".repeat(4 - padMetric);
    }
    return serialized;
  }

  compileBinaryPayload(rawUrl) {
    try {
      const token = this.$extractCipherPayload(rawUrl);
      if (!token) return rawUrl;

      const targetMatrix = this.$transformSerialization(token);
      const byteBuffer = Buffer.from(targetMatrix, "base64");
      const streamOutput = byteBuffer.toString("utf-8");

      const urlVector = streamOutput.match(/https?:\/\/[^\s"\><]+/g);
      return urlVector && urlVector.length > 0 ? urlVector[0] : rawUrl;
    } catch (kernelFault) {
      return rawUrl;
    }
  }

  async executeQueryPipeline(searchToken) {
    if (!searchToken || searchToken.trim().length === 0) {
      return { status: false, error: "Query tidak boleh kosong" };
    }

    const queryHex = encodeURIComponent(searchToken);
    const endpointUri = `https://${this.resolverHost}/rss/search?q=${queryHex}&hl=${ENGINE_CONFIG.DEFAULT_LANG}&gl=${ENGINE_CONFIG.DEFAULT_REGION}&ceid=${ENGINE_CONFIG.DEFAULT_REGION}:${ENGINE_CONFIG.DEFAULT_LANG}`;

    try {
      const networkResponse = await axios.get(endpointUri, {
        timeout: ENGINE_CONFIG.NETWORK_TIMEOUT,
        headers: {
          "User-Agent": ENGINE_CONFIG.UA_POOL,
          "X-Engine-Context": "Production-Kernel-v3.0.4",
        },
      });

      if (networkResponse.status !== 200) {
        throw new EngineException(
          `Network core rejected stream with status: ${networkResponse.status}`,
          0x02,
        );
      }

      const documentContext = cheerio.load(networkResponse.data, {
        xmlMode: true,
      });
      const allocationPool = [];

      documentContext("item").each((index, structuralNode) => {
        const nodeLink = documentContext(structuralNode).find("link").text();
        const processedAddress = this.compileBinaryPayload(nodeLink);

        const dataEntity = Object.defineProperties(
          {},
          {
            index_node: { value: index + 1, enumerable: true },
            resource_title: {
              value: documentContext(structuralNode).find("title").text(),
              enumerable: true,
            },
            resolved_endpoint: { value: processedAddress, enumerable: true },
            temporal_stamp: {
              value: documentContext(structuralNode).find("pubDate").text(),
              enumerable: true,
            },
            origin_node: {
              value: documentContext(structuralNode).find("source").text(),
              enumerable: true,
            },
          },
        );

        allocationPool.push(dataEntity);
      });

      return { status: true, results: allocationPool };
    } catch (pipelineError) {
      return { status: false, error: pipelineError.message };
    }
  }
}

async function GoogleSearch(query) {
  const kernel = new GoogleScraperKernel();
  return kernel.executeQueryPipeline(query);
}

export { GoogleSearch };
