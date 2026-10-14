//

async function newup(m, { conn }) {
  const text = `╭━━━〔 ✦ YALENA UPDATE ✦ 〕━━━╮
┃
┃  📢 UPDATE TERBARU
┃
┃  ✦ Gojo Merge
┃  • Fitur Gojo yang benar-benar belum
┃    ada di Yalena telah ditambahkan.
┃  • Command dibuat pendek dan disesuaikan
┃    dengan struktur YalenaMD.
┃  • Fitur yang sudah ada tidak diduplikasi.
┃
┃  ✦ NIVID
┃  • Command: .nivid
┃  • Mengirim direct video URL sebagai MP4.
┃  • Sumber URL:
┃    src/data/Nita/yalena.json
┃  • Jika satu URL gagal, sistem mencoba
┃    URL berikutnya.
┃
┃  ✦ Kompatibilitas
┃  • Handler mengikuti struktur YalenaMD.
┃  • Error ditangani agar kegagalan command
┃    tidak membuat bot crash.
┃
┃  🔧 COMMAND BARU
┃  • .nivid
┃  • .newup
┃
┃  📌 Catatan
┃  • Isi yalena.json dengan direct URL video
┃    milik kamu sendiri.
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

  try {
    await conn.sendMessage(
      m.chat,
      { text },
      { quoted: m }
    )
  } catch (err) {
    console.error('[NEWUP]', err)
  }
}

newup.help = ['newup']
newup.tags = ['info']
newup.command = ['newup']

export default newup
