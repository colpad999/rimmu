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
  name: "an1get",
  category: "search",
  description: "Download APK dari Android1",
  usage: ".android1-get <url>",
  example: ".android1-get https://an1.com/xxx",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 15,
  energi: 1,
  isEnabled: true,
};

const NEOXR_APIKEY = config.APIkey?.neoxr || "Milik-Bot-RimuruMD";

async function handler(m, { sock }) {
  const url = m.text?.trim();

  if (!url || !url.includes("an1.com")) {
    return m.reply(`❌ URL tidak valid! Harus URL dari an1.com`);
  }

  m.react("🕕");

  try {
    const { data } = await axios.get(
      `https://api.neoxr.eu/api/an1-get?url=${encodeURIComponent(url)}&apikey=${NEOXR_APIKEY}`,
      {
        timeout: 60000,
      },
    );

    if (!data?.status || !data?.data) {
      throw new Error("Gagal mengambil detail APK");
    }

    const app = data.data;
    const saluranId = config.saluran?.id || "120363380765405182@newsletter";
    const saluranName = config.saluran?.name || config.bot?.name || "Rimuru-AI";
    if (app.url) {
      await sock.sendMessage(
        m.chat,
        {
          document: { url: app.url },
          fileName: app.name,
          mimetype: "application/vnd.android.package-archive",
          contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
          },
        },
        { quoted: m },
      );

      m.react("✅");
    } else {
      let caption = `> ⚠️ Download URL tidak tersedia`;

      await sock.sendMessage(
        m.chat,
        {
          text: caption,
          contextInfo: {
            forwardingScore: 9999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: saluranId,
              newsletterName: saluranName,
              serverMessageId: 127,
            },
          },
          interactiveButtons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 Buka di Browser",
                url: url,
              }),
            },
          ],
        },
        { quoted: m },
      );

      m.react("⚠️");
    }
  } catch (err) {
    console.log(err);
    m.react("☢");
    return m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
