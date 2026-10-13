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

import axios from "axios";
import config from "../../config.js";
import te from "../../src/lib/rimuru-error.js";

const pluginConfig = {
  name: "claude-45",
  category: "ai",
  description: "Model AI tambahan yang dipindahkan dari Aqua",
  usage: ".webpilot <pertanyaan>",
  example: ".webpilot apa berita terbaru tentang teknologi",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 2,
  isEnabled: true,
};

const MODELS = {
  webpilot: {
    label: "WebPilot",
    url: "https://free-restapi.biz.id/api/ai/webpilot",
    param: "prompt",
  },
  "gpt-oss2b": {
    label: "GPT-OSS 2B",
    url: "https://free-restapi.biz.id/api/gpt-oss2b",
    param: "prompt",
  },
  glm47: {
    label: "GLM 4.7",
    url: "https://free-restapi.biz.id/api/glm47",
    param: "prompt",
  },
  "meta-ai": {
    label: "Meta AI",
    url: "https://free-restapi.biz.id/api/meta-ai",
    param: "prompt",
  },
  "deepseek-pro": {
    label: "DeepSeek Pro",
    url: "https://free-restapi.biz.id/api/deepseek-pro",
    param: "prompt",
  },
  "claude-45": {
    label: "Claude 4.5",
    url: "https://free-restapi.biz.id/api/claude-4-5",
    param: "prompt",
  },
};

function getText(data) {
  if (typeof data === "string") return data;
  return data?.result ?? data?.data?.result ?? data?.answer ?? data?.data?.answer ?? null;
}

async function handler(m) {
  const model = MODELS[m.command?.toLowerCase()];
  if (!model) return;

  const text = m.args?.join(" ").trim();
  if (!text) {
    return m.reply(
      `🤖 *${model.label}*\n\n` +
      `Gunakan: *${m.prefix}${m.command} <pertanyaan>*\n` +
      `Contoh: *${m.prefix}${m.command} jelaskan kecerdasan buatan*`
    );
  }

  const key = config.aquaApi?.freeRestApiKey || "";
  if (!key) return m.reply("❌ API key Aqua belum diisi di config.js (aquaApi.freeRestApiKey).");

  await m.react("🕕");
  try {
    const params = { [model.param]: text, apikey: key };
    const { data } = await axios.get(model.url, { params, timeout: 60000 });
    const result = getText(data);
    if (!result) throw new Error(data?.message || "API tidak mengembalikan hasil");

    await m.react("✅");
    return m.reply(String(result).slice(0, 12000));
  } catch (e) {
    console.error(`[AQUA-${m.command}]`, e?.message || e);
    await m.react("❌").catch(() => {});
    return m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
