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

let handler = async (m, { text, command, conn }) => {
  try {
    let [jm, mnt] = text.split(':');

    if (!jm || !mnt)
      return m.reply(`❗ Masukkan format waktu yang benar!\n\nContoh:\n.${command} 18:00`);

    jm = parseInt(jm);
    mnt = parseInt(mnt);

    if (isNaN(jm) || jm > 23)
      return m.reply(`❗ Jam salah (0–23)\n\nContoh:\n.${command} 18:00`);

    if (isNaN(mnt) || mnt > 59)
      return m.reply(`❗ Menit salah (0–59)\n\nContoh:\n.${command} 18:00`);

    // Dapatkan waktu sekarang dan target berdasarkan zona Asia/Jakarta
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
    const target = new Date(now);
    target.setHours(jm);
    target.setMinutes(mnt);
    target.setSeconds(0);

    // Jika waktu target sudah lewat hari ini, jadwalkan untuk besok
    if (target < now) target.setDate(now.getDate() + 1);

    const delay = target - now;

    m.reply(`⏰ Grup akan di${command === 'tutupjam' ? 'tutup' : 'buka'} pada ${jm.toString().padStart(2, '0')}:${mnt.toString().padStart(2, '0')} WIB.`);

    setTimeout(async () => {
      try {
        if (command === 'tutupjam') {
          await conn.groupSettingUpdate(m.chat, 'announcement');
          m.reply(`✅ Grup telah ditutup.\nSekarang hanya admin yang dapat mengirim pesan.`);
        } else if (command === 'bukajam') {
          await conn.groupSettingUpdate(m.chat, 'not_announcement');
          m.reply(`✅ Grup telah dibuka.\nSekarang semua peserta dapat mengirim pesan.`);
        }
      } catch (err) {
        console.error('Error update grup:', err);
      }
    }, delay);

    db.data.users[m.sender].exp += randomNomor(20);
  } catch (err) {
    console.error('Handler error:', err);
    m.reply(`⚠️ Terjadi error: ${err.message}`);
  }
};

handler.help = ['tutupjam <jam:menit>', 'bukajam <jam:menit>'];
handler.tags = ['group'];
handler.command = ['tutupjam', 'bukajam'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;

function randomNomor(nomor) {
  return Math.floor(Math.random() * nomor);
}
