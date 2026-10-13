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

import te from "../../src/lib/rimuru-error.js";
import config from "../../config.js";
import axios from "axios";

const pluginConfig = {
  name: "searchgrup",
  category: "search",
  description: "Cari grup WhatsApp berdasarkan keyword",
  usage: ".carigrup <keyword>",
  example: ".carigrup gb isian",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const text = m.args.join(" ");

  if (!text) {
    return m.reply(
      `🔍 *ᴄᴀʀɪ ɢʀᴜᴘ ᴡᴀ*\n\n> Masukkan keyword pencarian\n\n\`Contoh: ${m.prefix}carigrup gb isian\``,
    );
  }

  m.react("🕕");

  try {
    const url = `https://api.cuki.biz.id/api/search/whatsapp-group?apikey=${config.APIkey.cuki}&query=${encodeURIComponent(text)}`;
    const { data } = await axios.get(url, { timeout: 30000 });

    if (!data.status || !data.data?.groups?.length) {
      m.react("❌");
      return m.reply(`❌ Tidak ditemukan grup untuk keyword *${text}*`);
    }

    const groups = data.data.groups;
    let result =
      `🔍 *ᴄᴀʀɪ ɢʀᴜᴘ ᴡᴀ*\n\n` +
      `📌 Keyword: *${data.data.query}*\n` +
      `📊 Total: *${data.data.total}* grup ditemukan\n`;

    groups.forEach((g, i) => {
      result +=
        `\n━━━━━━━━━━━━━━━\n` +
        `*${i + 1}. ${g.title}*\n` +
        `📅 ${g.date}\n` +
        `🏷️ ${g.category}\n` +
        `📝 ${g.description ? g.description.slice(0, 150) + (g.description.length > 150 ? "..." : "") : "-"}\n` +
        `🔗 ${g.group_link}`;
    });

    m.react("✅");
    await m.reply(result);
  } catch (error) {
    console.log(error);
    m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
