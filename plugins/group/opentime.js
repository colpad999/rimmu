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

let handler = async (m, { conn, args, isBotAdmin, isAdmin }) => {
  if (!m.isGroup) return m.reply('Fitur ini hanya untuk grup!');
  if (!isAdmin) return m.reply('Fitur ini hanya bisa digunakan oleh admin grup.');
  if (!isBotAdmin) return m.reply('Bot harus menjadi admin di grup!');

  let time = parseInt(args[0]);
  let unit = args[1];

  if (!time || !unit) {
    return m.reply(`*Contoh Penggunaan:*\n.opentime 10 second\n\n*Opsi Waktu:*\nsecond\nminute\nhour\nday`);
  }

  let timer;
  switch (unit) {
    case 'second': timer = time * 1000; break;
    case 'minute': timer = time * 60000; break;
    case 'hour': timer = time * 3600000; break;
    case 'day': timer = time * 86400000; break;
    default:
      return m.reply('*Opsi tidak valid!*\nGunakan: second, minute, hour, atau day');
  }

  m.reply(`⏳ Grup akan dibuka dalam *${time} ${unit}*...`);

  setTimeout(async () => {
    await conn.groupSettingUpdate(m.chat, 'not_announcement');
    conn.sendMessage(m.chat, {
      text: '*[ OPEN TIME ]*\nGrup telah dibuka kembali. Sekarang semua member bisa mengirim pesan.'
    });
  }, timer);
};

handler.command = ['opentime'];
handler.help = ['opentime <angka> <unit>'];
handler.tags = ['group'];
handler.group = true;
handler.botAdmin = true;
handler.admin = true;

export default handler;
