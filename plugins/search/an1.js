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

import { getAssetBuffer } from "../../src/lib/rimuru-asset-manager.js";
import axios from "axios";
import config from "../../config.js";
import fs from "fs";
import { getDatabase } from "../../src/lib/rimuru-database.js";
import te from "../../src/lib/rimuru-error.js";
const pluginConfig = {
  name: "an1",
  category: "search",
  description: "Cari dan download APK MOD dari Android1",
  usage: ".android1 <query>",
  example: ".android1 Subway Surfer",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

const NEOXR_APIKEY = config.APIkey?.neoxr || "Milik-Bot-RimuruMD";

async function handler(m, { sock }) {
  const db = getDatabase();
  const args = m.args || [];
  const text = m.text?.trim();

  if (!text) {
    return m.reply(
      `📱 *ᴀɴᴅʀᴏɪᴅ1 sᴇᴀʀᴄʜ*\n\n` +
        `╭┈┈⬡「 📋 *ᴄᴀʀᴀ ᴘᴀᴋᴀɪ* 」\n` +
        `┃ 🔍 \`${m.prefix}android1 <query>\` - Cari APK\n` +
        `╰┈┈⬡\n\n` +
        `> Contoh:\n` +
        `\`${m.prefix}android1 Subway Surfer\``,
    );
  }

  m.react("🔍");

  try {
    const { data } = await axios.get(
      `https://api.neoxr.eu/api/an1?q=${encodeURIComponent(text)}&apikey=${NEOXR_APIKEY}`,
      {
        timeout: 30000,
      },
    );

    if (!data?.status || !data?.data?.length) {
      m.react("❌");
      return m.reply(`❌ Tidak ditemukan hasil untuk: \`${text}\``);
    }

    const apps = data.data.slice(0, 10);

    if (!db.db.data.sessions) db.db.data.sessions = {};
    const sessionKey = `an1_${m.sender}`;
    db.db.data.sessions[sessionKey] = {
      results: apps,
      query: text,
      timestamp: Date.now(),
    };
    db.save();

    const saluranId = config.saluran?.id || "120363380765405182@newsletter";
    const saluranName = config.saluran?.name || config.bot?.name || "Rimuru-AI";

    let caption = `📱 Hasil dari pencarian apk mod *${text}*\n`;
    caption += `*${apps.length}* aplikasi ditemukan\n\n`;

    apps.forEach((app, i) => {
      caption += `*${i + 1}.* ${app.name}\n`;
      caption += `   ├ 👤 ${app.developer}\n`;
      caption += `   └ ⭐ ${app.rating}/5\n\n`;
    });

    caption += `> Pilih angka untuk download langsung`;

    const buttons = apps.slice(0, 10).map((app, i) => ({
      title: `${i + 1}. ${app.name.substring(0, 20)}`,
      description: `${app.developer} • ⭐${app.rating}`,
      id: `${m.prefix}android1-get ${app.url}`,
    }));

    m.react("✅");
    await sock.sendButton(
      m.chat,
      config.assets?.["rimuru"],
      caption,
      m,
      {
        buttons: [
          {
            name: "single_select",
            buttonParamsJson: JSON.stringify({
              title: "Pilih APK",
              sections: [
                {
                  title: "APK nya",
                  rows: buttons,
                },
              ],
            }),
          },
        ],
        footer: "📱 Android1 Search",
      },
    );
  } catch (err) {
    m.react("☢");
    return m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
