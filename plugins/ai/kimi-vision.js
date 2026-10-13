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
  name: "kimi-vision",
  category: "ai",
  description: "Analisis gambar memakai Kimi Vision",
  usage: ".kimi-vision <pertanyaan> (reply gambar)",
  example: ".kimi-vision jelaskan gambar ini",
  isPremium: false,
  cooldown: 15,
  energi: 2,
  isEnabled: true,
};

async function uploadToAlice(buffer, mimetype = "image/jpeg") {
  const form = new FormData();
  form.append("cdnFile", buffer, {
    filename: `kimi-${Date.now()}.jpg`,
    contentType: mimetype,
  });
  const res = await axios.post("https://aliceecdn.vercel.app/upload", form, {
    headers: form.getHeaders(),
    timeout: 60000,
  });
  if (!res.data?.url) throw new Error("Upload gambar gagal");
  return res.data.url;
}

async function handler(m) {
  const key = config.aquaApi?.freeRestApiKey || "";
  if (!key) return m.reply("❌ API key Aqua belum diisi di config.js (aquaApi.freeRestApiKey).");

  const quoted = m.quoted;
  const isImage = /image\//i.test(String(quoted?.mimetype || m.mimetype || ""));
  let imageUrl = "";
  let prompt = m.args?.join(" ").trim() || "jelaskan gambar ini";

  try {
    if (isImage) {
      const buffer = await quoted.download();
      imageUrl = await uploadToAlice(buffer, quoted.mimetype);
    } else {
      const match = prompt.match(/https?:\/\/\S+/i);
      if (match) {
        imageUrl = match[0];
        prompt = prompt.replace(match[0], "").trim() || "jelaskan gambar ini";
      }
    }

    if (!imageUrl) {
      return m.reply(`🖼️ Reply/kirim gambar dengan caption *${m.prefix}${m.command} pertanyaan* atau berikan URL gambar.`);
    }

    await m.react("🕕");
    const { data } = await axios.get("https://free-restapi.biz.id/api/kimi-vision", {
      params: { url: imageUrl, prompt, apikey: key },
      timeout: 60000,
    });
    const result = data?.result || data?.data?.result;
    if (!result) throw new Error("API Kimi Vision gagal");

    await m.react("✅");
    return m.reply(String(result).slice(0, 12000));
  } catch (e) {
    console.error("[AQUA-KIMI-VISION]", e?.message || e);
    await m.react("❌").catch(() => {});
    return m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
