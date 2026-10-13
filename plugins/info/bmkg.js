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
import { saluranCtx } from "../../src/lib/rimuru-context.js";

const pluginConfig = {
  name: "bmkg",
  category: "info",
  description: "Info gempa terkini dari BMKG",
  usage: ".gempa",
  example: ".gempa",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  await m.react("🕕");

  try {
    const response = await axios.get(
      "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json",
      { timeout: 15000 },
    );

    const g = response.data.Infogempa.gempa;
    const shakemapUrl = g.Shakemap
      ? `https://data.bmkg.go.id/DataMKG/TEWS/${g.Shakemap}`
      : null;

    const text =
      `🌍 *Info Gempa Terkini — BMKG*\n\n` +
      `> 📅 Tanggal: *${g.Tanggal}*\n` +
      `> 🕐 Jam: *${g.Jam}*\n` +
      `> 📐 Koordinat: *${g.Coordinates}*\n` +
      `> 📍 Lintang: *${g.Lintang}*\n` +
      `> 📍 Bujur: *${g.Bujur}*\n` +
      `> 💥 Magnitude: *${g.Magnitude}*\n` +
      `> 🔽 Kedalaman: *${g.Kedalaman}*\n` +
      `> 🗺️ Wilayah: *${g.Wilayah}*\n` +
      `> ⚠️ Potensi: *${g.Potensi}*\n` +
      `> 🏠 Dirasakan: *${g.Dirasakan}*\n\n` +
      `_Sumber: BMKG Indonesia_`;

    await m.react("✅");

    if (shakemapUrl) {
      try {
        const imgRes = await axios.get(shakemapUrl, {
          responseType: "arraybuffer",
          timeout: 15000,
        });
        await sock.sendMedia(m.chat, Buffer.from(imgRes.data), text, m, {
          type: "image",
        });
      } catch {
        await m.reply(text, { contextInfo: saluranCtx() });
      }
    } else {
      await m.reply(text, { contextInfo: saluranCtx() });
    }
  } catch (e) {
    await m.react("☢");
    await m.reply(
      `❌ *Gagal mengambil data gempa*\n\n> ${e.message || "Coba lagi nanti"}`,
    );
  }
}

export { pluginConfig as config, handler };
