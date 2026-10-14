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

import moment from "moment-timezone";
import config from "../../config.js";
const pluginConfig = {
  name: "cekabsen",
  category: "group",
  description: "Lihat daftar peserta yang sudah absen",
  usage: ".cekabsen",
  example: ".cekabsen",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: false,
  cooldown: 5,
  energi: 0,
  isEnabled: true,
};
if (!global.absensi) global.absensi = {};
async function handler(m, { sock }) {
  const chatId = m.chat;
  if (!global.absensi[chatId]) {
    return m.reply(
      `❌ *ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴀʙsᴇɴ*\n\n` +
        `> Belum ada sesi absen di grup ini!\n\n` +
        `> Admin dapat memulai dengan\n` +
        `> *.mulaiabsen [keterangan]*`,
    );
  }
  const absen = global.absensi[chatId];
  const now = moment().tz("Asia/Jakarta");
  const dateStr = now.format("D MMMM YYYY");
  const createdDate = moment(absen.createdAt).tz("Asia/Jakarta");
  const timeStr = createdDate.format("HH:mm");
  let list = "┃ _Belum ada yang absen_";
  if (absen.peserta.length > 0) {
    list = absen.peserta
      .map((jid, i) => `┃ ${i + 1}. @${jid.split("@")[0]}`)
      .join("\n");
  }
  const saluranId = config.saluran?.id || "120363380765405182@newsletter";
  const saluranName = config.saluran?.name || config.bot?.name || "Rimuru-AI";
  await m.reply(
    `📋 *DAFTAR YANG UDAH ABSEN*\n\n` +
      `╭┈┈⬡「 📋 *INFO* 」\n` +
      `┃ 📝 ${absen.keterangan}\n` +
      `┃ 📅 ${dateStr}\n` +
      `┃ ⏰ Dimulai: ${timeStr}\n` +
      `┃ 👑 Dibuat: @${absen.createdBy.split("@")[0]}\n` +
      `├┈┈⬡「 👥 *PESERTA (${absen.peserta.length})* 」\n` +
      `${list}\n` +
      `╰┈┈┈┈┈┈┈┈⬡\n\n` +
      `Ketik *${m.prefix}absen* untuk hadir`,
    { mentions: [...absen.peserta, absen.createdBy] },
  );
}
export { pluginConfig as config, handler };
