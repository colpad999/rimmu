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
import FormData from "form-data";
import config from "../../config.js";
import te from "../../src/lib/rimuru-error.js";

const pluginConfig = {
  name: "gptimg2img",
  category: "ai",
  description: "Image-to-image memakai GPT2Image",
  usage: ".gpt2image <prompt> (reply gambar)",
  example: ".gpt2image ubah jadi style anime",
  isPremium: true,
  cooldown: 60,
  energi: 3,
  isEnabled: true,
};

async function upload(buffer, mimetype) {
  const form = new FormData();
  form.append("cdnFile", buffer, { filename: `gpt2img-${Date.now()}.jpg`, contentType: mimetype || "image/jpeg" });
  const res = await axios.post("https://aliceecdn.vercel.app/upload", form, { headers: form.getHeaders(), timeout: 60000 });
  if (!res.data?.url) throw new Error("Upload gagal");
  return res.data.url;
}

async function handler(m, { sock }) {
  if (!m.quoted || !/image\//i.test(String(m.quoted.mimetype || ""))) {
    return m.reply(`🖼️ Reply gambar dengan *${m.prefix}${m.command} prompt*.`);
  }
  const prompt = m.args?.join(" ").trim();
  if (!prompt) return m.reply("Masukkan prompt.");
  const key = config.aquaApi?.freeRestApiKey || "";
  if (!key) return m.reply("❌ API key Aqua belum diisi di config.js (aquaApi.freeRestApiKey).");

  await m.react("🕕");
  try {
    const buffer = await m.quoted.download();
    const url = await upload(buffer, m.quoted.mimetype);
    const { data } = await axios.get("https://free-restapi.biz.id/api/gpt2image", {
      params: { url, prompt, apikey: key },
      timeout: 180000,
    });
    const imageUrl = data?.result?.url || data?.result?.image || data?.url || data?.image;
    if (!imageUrl) throw new Error("API tidak mengembalikan URL gambar");
    await sock.sendMessage(m.chat, { image: { url: imageUrl }, caption: `✨ GPT2Image\nPrompt: ${prompt}` }, { quoted: m });
    await m.react("✅");
  } catch (e) {
    console.error("[AQUA-GPT2IMAGE]", e?.message || e);
    await m.react("❌").catch(() => {});
    return m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
