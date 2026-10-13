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
import te from "../../src/lib/rimuru-error.js";

const pluginConfig = {
  name: "badminton",
  category: "canvas",
  description: "Membuat sertifikat Juara Badminton kustom",
  usage: ".juarabadminton <nama>",
  example: ".juarabadminton Alex",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

// 🔑 API Key Theresav
const THERESAV_KEY = "4ZtwE";

async function handler(m, { sock }) {
  const fullText = (m.text || m.body || "").trim();
  const prefix = m.prefix || ".";

  // Parsing nama dari argumen
  const inputName = fullText.replace(/^[\/.!#]?(juarabadminton|sertifikatbadminton|badmintoncert|badminton)\s*/i, "").trim();

  if (!inputName) {
    return m.reply(
      `🏸 *ᴊᴜᴀʀᴀ ʙᴀᴅᴍɪɴᴛᴏɴ ᴄᴇʀᴛɪғɪᴄᴀᴛᴇ*\n\n` +
      `> *Penggunaan:* \`${prefix}juarabadminton <Nama>\`\n` +
      `> *Contoh:* \`${prefix}juarabadminton Alex\``
    );
  }

  await m.react("🏸");

  try {
    const targetUrl = `https://api.theresav.biz.id/canvas/cbadminton`;

    const res = await axios.get(targetUrl, {
      params: {
        text: inputName,
        apikey: THERESAV_KEY
      },
      responseType: "arraybuffer",
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      timeout: 20000
    });

    const imageBuffer = Buffer.from(res.data);

    await m.react("✅");

    // Kirim gambar polosan
    return await sock.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `🏸 *Certificate of Badminton* for *${inputName}*`
    }, { quoted: m });

  } catch (error) {
    console.error("[Juara Badminton Error]:", error?.message);
    await m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
