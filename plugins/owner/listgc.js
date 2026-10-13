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

export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Rimuru MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P";


import moment from 'moment-timezone'

let handler = async (m, { conn, isOwner }) => {
  if (!isOwner) return m.reply('Owner only!')

  try {
    const groups = Object.values(await conn.groupFetchAllParticipating())
    if (!groups.length) return m.reply('❌ Bot belum gabung di grup manapun.')

    let teks = `⬣ *LIST GROUP*\n`
    teks += `📊 Total Grup: ${groups.length}\n\n`

    const buttons = []

    for (let i = 0; i < groups.length; i++) {
      const g = groups[i]
      const created = moment(g.creation * 1000)
        .tz('Asia/Jakarta')
        .format('DD/MM/YYYY HH:mm') + ' WIB'

      teks += `*${i + 1}. ${g.subject}*\n`
      teks += `🆔 ID: ${g.id}\n`
      teks += `👥 Member: ${g.participants?.length || 0}\n`
      teks += `🕐 Dibuat: ${created}\n\n`

      buttons.push({
        name: 'cta_copy',
        buttonParamsJson: JSON.stringify({
          display_text: `📋 Copy ID GC #${i + 1}`,
          copy_code: g.id
        })
      })
    }

    await conn.sendMessage(m.chat, {
      text: teks,
      footer: '📌 Klik tombol untuk menyalin ID grup',
      interactiveButtons: buttons
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('❌ Gagal mengambil data grup.')
  }
}

handler.help = ['listgc']
handler.tags = ['owner']
handler.command = /^listgc$/i
handler.owner = true

export default handler
