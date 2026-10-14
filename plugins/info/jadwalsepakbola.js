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
import { f } from "../../src/lib/rimuru-http.js";
import te from "../../src/lib/rimuru-error.js";
const pluginConfig = {
  name: "jadwalsepakbola",
  category: "info",
  description: "Lihat jadwal pertandingan sepak bola",
  usage: ".jadwalbola [liga]",
  example: ".jadwalbola inggris",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 0,
  isEnabled: true,
};

const NEOXR_APIKEY = config.APIkey?.neoxr || "Milik-Bot-RimuruMD";

const LEAGUE_EMOJI = {
  "liga inggris": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "liga italia": "🇮🇹",
  "liga spanyol": "🇪🇸",
  "la liga spanyol": "🇪🇸",
  "liga jerman": "🇩🇪",
  "liga prancis": "🇫🇷",
  "liga belanda": "🇳🇱",
  "liga champions": "🏆",
  "bri super league": "🇮🇩",
};

function getLeagueEmoji(league) {
  const lower = league.toLowerCase();
  for (const [key, emoji] of Object.entries(LEAGUE_EMOJI)) {
    if (lower.includes(key) || key.includes(lower)) {
      return emoji;
    }
  }
  return "⚽";
}

async function handler(m, { sock }) {
  const filter = m.args.join(" ").toLowerCase().trim();

  m.react("🕕");

  try {
    const data = await f(
      `https://api.neoxr.eu/api/bola?apikey=${NEOXR_APIKEY}`,
    );

    if (!data?.status || !data?.data || data.data.length === 0) {
      throw new Error("Tidak ada jadwal tersedia");
    }

    let matches = data.data;

    if (filter) {
      matches = matches.filter(
        (m) =>
          m.league?.toLowerCase().includes(filter) ||
          m.home_team?.toLowerCase().includes(filter) ||
          m.away_team?.toLowerCase().includes(filter) ||
          m.date?.toLowerCase().includes(filter),
      );
    }

    if (matches.length === 0) {
      m.react("❌");
      return m.reply(`❌ Tidak ditemukan jadwal untuk: \`${filter}\``);
    }

    const grouped = {};
    for (const match of matches.slice(0, 50)) {
      const date = match.date || "TBA";
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(match);
    }

    const saluranId = config.saluran?.id || "120363380765405182@newsletter";
    const saluranName = config.saluran?.name || config.bot?.name || "Rimuru-AI";

    let text = `⚽ *ᴊᴀᴅᴡᴀʟ ᴘᴇʀᴛᴀɴᴅɪɴɢᴀɴ*\n\n`;
    if (filter) text += `> Filter: \`${filter}\`\n\n`;

    for (const [date, games] of Object.entries(grouped)) {
      text += `📅 *${date}*\n\n`;

      for (const game of games) {
        const emoji = getLeagueEmoji(game.league);
        text += `${emoji} *${game.league}*\n`;
        text += `⏰ ${game.time}\n`;
        text += `🏠 ${game.home_team}\n`;
        text += `🆚 ${game.away_team}\n\n`;
      }
    }

    text += `Total: *${matches.length}* pertandingan`;

    m.react("✅");

    await m.reply(text);
  } catch (err) {
    m.react("☢");
    return m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
