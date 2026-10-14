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
import te from "../../src/lib/rimuru-error.js";
const pluginConfig = {
  name: "modapk2",
  category: "search",
  description: "Cari dan download APK MOD Premium",
  usage: ".apkmod <query>",
  example: ".apkmod vpn",
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
  const text = m.text?.trim();

  if (!text) {
    return m.reply(
      `📱 *ᴀᴘᴋ ᴍᴏᴅ sᴇᴀʀᴄʜ*\n\n` +
        `> Cari APK MOD Premium\n\n` +
        `> Contoh:\n` +
        `\`${m.prefix}apkmod vpn\``,
    );
  }

  m.react("🕕");

  try {
    const { data } = await axios.get(
      `https://api.neoxr.eu/api/apkmod?q=${encodeURIComponent(text)}&apikey=${NEOXR_APIKEY}`,
      {
        timeout: 30000,
      },
    );

    if (!data?.status || !data?.data?.length) {
      m.react("❌");
      return m.reply(`❌ Tidak ditemukan hasil untuk: \`${text}\``);
    }

    const apps = data.data.slice(0, 15);

    const saluranId = config.saluran?.id || "120363380765405182@newsletter";
    const saluranName = config.saluran?.name || config.bot?.name || "Rimuru-AI";

    let caption = `📱 *Hasil pencarian dari ${text}*\n\n`;

    apps.forEach((app, i) => {
      caption += `*${i + 1}.* ${app.name}\n`;
      caption += `   ├ 🏷️ ${app.version}\n`;
      caption += `   └ 🔓 ${app.mod}\n\n`;
    });

    const buttons = apps.slice(0, 10).map((app, i) => ({
      title: `${i + 1}. ${app.name.substring(0, 24)}`,
      description: `${app.version} • ${app.mod}`,
      id: `${m.prefix}apkmod-get ${i + 1} ${text}`,
    }));

    global.apkmodSession = global.apkmodSession || {};
    global.apkmodSession[m.sender] = {
      results: apps,
      query: text,
      timestamp: Date.now(),
    };

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
              title: "📱 Pilih APK MOD",
              sections: [
                {
                  title: `Hasil untuk "${text}"`,
                  rows: buttons,
                },
              ],
            }),
          },
        ],
        footer: "Pilihlah",
      },
    );
  } catch (err) {
    m.react("☢");
    return m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
