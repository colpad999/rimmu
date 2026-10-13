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
import rimuruApi from "../../src/lib/rimuru-apimanager.js";
const pluginConfig = {
  name: "carigambar",
  category: "search",
  description: "Cari artwork di Pixiv",
  usage: ".carigambar <query>",
  example: ".carigambar rem",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 2,
  isEnabled: true,
};

async function handler(m, { sock }) {
  try {
    const query = m.text;

    if (!query) {
      return m.reply(
        `❌ *Masukkan kata kunci pencarian!*\n\n> Contoh: ${m.prefix}carigambar rem`,
      );
    }

    await m.react("🔍");

    const apikey = config.APIkey?.neoxr || "Milik-Bot-RimuruMD";
    const data = await rimuruApi.apiFaa.get(
      "/faa/google-image",
      {
        query,
        apikey,
      },
      { timeout: 30000 },
    );

    if (!data.status) {
      await m.react("❌");
      return m.reply(`❌ *Tidak ditemukan hasil untuk:* ${query}`);
    }
    const results = data.result;
    const album = await Promise.all(
      results.map(async (url) => {
        const res = await axios.get(url, { responseType: "arraybuffer" });
        return {
          image: Buffer.from(res.data),
        };
      }),
    );
    await sock.sendMessage(
      m.chat,
      {
        albumMessage: album,
      },
      { quoted: m },
    );
  } catch (error) {
    console.log(error);
    await m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
