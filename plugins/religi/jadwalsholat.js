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
import moment from "moment-timezone";
import config from "../../config.js";
import {
  searchKota,
  getTodaySchedule,
  extractPrayerTimes,
} from "../../src/lib/rimuru-sholat-api.js";
import te from "../../src/lib/rimuru-error.js";
import { saluranCtx } from "../../src/lib/rimuru-context.js";
const pluginConfig = {
  name: "jadwalsholat",
  category: "religi",
  description: "Menampilkan jadwal sholat real-time dari myquran.com",
  usage: ".jadwalsholat <kota>",
  example: ".jadwalsholat Jakarta",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 0,
  isEnabled: true,
};
async function handler(m, { sock }) {
  const city = m.args.join(" ").trim() || "Jakarta";
  m.react("🕌");
  try {
    const kota = await searchKota(city);
    if (!kota) {
      m.react("❌");
      return m.reply(
        `❌ *ɢᴀɢᴀʟ*\n\n> Kota "${city}" tidak ditemukan\n> Coba nama kabupaten/kota lain`,
      );
    }
    const jadwalData = await getTodaySchedule(kota.id);
    const times = extractPrayerTimes(jadwalData);
    const lokasi = jadwalData.lokasi || kota.lokasi;
    const daerah = jadwalData.daerah || "";
    const today = moment.tz("Asia/Jakarta").format("dddd, DD MMMM YYYY");
    const saluranId = config.saluran?.id || "120363380765405182@newsletter";
    const saluranName = config.saluran?.name || config.bot?.name || "Rimuru-AI";

    const caption = `🕌 *ᴊᴀᴅᴡᴀʟ sʜᴏʟᴀᴛ*
╭┈┈⬡「 📍 *${lokasi}* 」
┃ 📅 ${today}
┃ 🗺️ ${daerah}
╰┈┈⬡
╭┈┈⬡「 ⏰ *ᴡᴀᴋᴛᴜ sʜᴏʟᴀᴛ* 」
┃ 🌙 ɪᴍsᴀᴋ: \`${times.imsak}\`
┃ 🌅 sᴜʙᴜʜ: \`${times.subuh}\`
┃ ☀️ ᴛᴇʀʙɪᴛ: \`${times.terbit}\`
┃ 🌤️ ᴅʜᴜʜᴀ: \`${times.dhuha}\`
┃ 🌞 ᴅᴢᴜʜᴜʀ: \`${times.dzuhur}\`
┃ 🌇 ᴀsʜᴀʀ: \`${times.ashar}\`
┃ 🌆 ᴍᴀɢʜʀɪʙ: \`${times.maghrib}\`
┃ 🌃 ɪsʏᴀ: \`${times.isya}\`
╰┈┈⬡
> _Sumber: myquran.com | Jangan lupa sholat ya! 🤲_`;
    const adzanUrl = "https://files.catbox.moe/z2bj5s.mp3";
    let adzanBuffer;
    try {
      const res = await axios.get(adzanUrl, {
        responseType: "arraybuffer",
        timeout: 30000,
      });
      adzanBuffer = Buffer.from(res.data);
    } catch {
      adzanBuffer = null;
    }
    const contextInfo = saluranCtx();
    if (adzanBuffer) {
      await sock.sendMessage(
        m.chat,
        {
          audio: adzanBuffer,
          mimetype: "audio/mpeg",
          ptt: false,
          contextInfo,
        },
        { quoted: m },
      );
      await sock.sendMessage(m.chat, { text: caption }, { quoted: m });
    } else {
      await sock.sendMessage(
        m.chat,
        { text: caption, contextInfo },
        { quoted: m },
      );
    }
    m.react("✅");
  } catch (error) {
    m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}
export { pluginConfig as config, handler };
