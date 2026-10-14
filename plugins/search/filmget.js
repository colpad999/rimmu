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
import { saluranCtx } from "../../src/lib/rimuru-context.js";
const NEOXR_APIKEY = config.APIkey?.neoxr || "Milik-Bot-RimuruMD";

const pluginConfig = {
  name: "filmget",
  category: "search",
  description: "Ambil detail film",
  usage: ".filmget <url>",
  example: ".filmget https://tv.neoxr.eu/film/civil-war-2024",
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};


async function handler(m, { sock }) {
  const args = m.args || [];
  const url = args[0]?.trim();

  if (!url || !url.includes("neoxr.eu")) {
    return m.reply(
      `🎬 *ꜰɪʟᴍ ᴅᴇᴛᴀɪʟ*\n\n` +
        `> Ambil detail film dari URL\n\n` +
        `*Format:*\n` +
        `> \`${m.prefix}filmget <url>\`\n\n` +
        `> Gunakan \`${m.prefix}film <judul>\` untuk cari film dulu`,
    );
  }

  m.react("🎬");

  try {
    const apiUrl = `https://api.neoxr.eu/api/film-get?url=${encodeURIComponent(url)}&apikey=${NEOXR_APIKEY}`;
    const { data } = await axios.get(apiUrl, { timeout: 30000 });

    if (!data?.status || !data?.data) {
      m.react("❌");
      return m.reply("❌ *ɢᴀɢᴀʟ*\n\n> Film tidak ditemukan");
    }

    const film = data.data;
    const streams = data.stream || [];
    const downloads = data.download || [];

    let thumbBuffer = null;
    if (film.thumbnail) {
      try {
        const thumbRes = await axios.get(film.thumbnail, {
          responseType: "arraybuffer",
          timeout: 10000,
        });
        thumbBuffer = Buffer.from(thumbRes.data);
      } catch {}
    }

    let text = `🎬 *${film.title || "Film"}*\n\n`;
    text += `╭┈┈⬡「 📋 *ɪɴꜰᴏ* 」\n`;
    text += `┃ ⭐ Rating: ${film.rating || "-"}\n`;
    text += `┃ 📺 Quality: ${film.quality || "-"}\n`;
    text += `┃ ⏱️ Duration: ${film.duration || "-"}\n`;
    text += `┃ 📅 Release: ${film.release || "-"}\n`;
    text += `┃ 🎭 Genre: ${film.tags || "-"}\n`;
    text += `┃ 🎬 Director: ${film.director || "-"}\n`;
    text += `┃ 👥 Actors: ${film.actors || "-"}\n`;
    text += `╰┈┈┈┈┈┈┈┈⬡\n\n`;

    text += `📝 *Synopsis:*\n`;
    text += `> ${film.synopsis || "-"}\n\n`;

    if (streams.length > 0) {
      text += `▶️ *Streaming:*\n`;
      streams.forEach((s, i) => {
        text += `> ${i + 1}. ${s.server}\n`;
      });
      text += `\n`;
    }

    if (downloads.length > 0) {
      text += `📥 *Download:*\n`;
      downloads.forEach((d, i) => {
        text += `> ${i + 1}. ${d.provider}\n`;
      });
    }

    const buttons = [];

    if (streams.length > 0) {
      buttons.push({
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: `▶️ ${streams[0].server}`,
          url: streams[0].url,
        }),
      });
    }

    downloads.slice(0, 2).forEach((d) => {
      buttons.push({
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: `📥 ${d.provider}`,
          url: d.url,
        }),
      });
    });

    const saluranId = config.saluran?.id || "120363380765405182@newsletter";
    const saluranName = config.saluran?.name || config.bot?.name || "Rimuru-AI";

    const msgContent = {
      text,
      footer: `🎬 Nonton Film Online`,
      contextInfo: saluranCtx(),
    };

    if (buttons.length > 0) {
      msgContent.interactiveButtons = buttons;
    }

    await sock.sendMessage(m.chat, msgContent, { quoted: m });

    m.react("✅");
  } catch (error) {
    m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
