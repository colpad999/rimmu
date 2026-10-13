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

async function newup(m, { conn }) {
  const text = `╭━━━〔 ✦ RIMURU UPDATE ✦ 〕━━━╮
┃
┃  📢 UPDATE TERBARU
┃
┃  ✦ Gojo Merge
┃  • Fitur Gojo yang benar-benar belum
┃    ada di Rimuru telah ditambahkan.
┃  • Command dibuat pendek dan disesuaikan
┃    dengan struktur RimuruMD.
┃  • Fitur yang sudah ada tidak diduplikasi.
┃
┃  ✦ NIVID
┃  • Command: .nivid
┃  • Mengirim direct video URL sebagai MP4.
┃  • Sumber URL:
┃    src/data/Nita/rimuru.json
┃  • Jika satu URL gagal, sistem mencoba
┃    URL berikutnya.
┃
┃  ✦ Kompatibilitas
┃  • Handler mengikuti struktur RimuruMD.
┃  • Error ditangani agar kegagalan command
┃    tidak membuat bot crash.
┃
┃  🔧 COMMAND BARU
┃  • .nivid
┃  • .newup
┃
┃  📌 Catatan
┃  • Isi rimuru.json dengan direct URL video
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
