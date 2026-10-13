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


import { downloadContentFromMessage } from '@itsliaaa/baileys'

const CH_ID = '120363403952337689@newsletter'

async function streamToBuffer(stream) {
  let buffer = Buffer.from([])

  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk])
  }

  return buffer
}

let handler = async (m, { conn }) => {

  const quoted =
    m.message?.extendedTextMessage
    ?.contextInfo
    ?.quotedMessage

  if (!quoted?.stickerMessage) {
    return m.reply('❌ Reply sticker!')
  }

  try {

    const stream = await downloadContentFromMessage(
      quoted.stickerMessage,
      'sticker'
    )

    const buffer = await streamToBuffer(stream)

    await conn.sendMessage(
      CH_ID,
      {
        sticker: buffer
      },
      {
        quoted: {
          key: {
            remoteJid: 'status@broadcast',
            fromMe: false,
            id: 'Halo'
          },
          message: {
            conversation: '\u200e'
          }
        }
      }
    )

    m.reply('✅ Sticker berhasil dikirim ke channel!')

  } catch (e) {

    console.error(e)

    m.reply(
      `❌ Error\n\n${e.message || e}`
    )
  }
}

handler.help = ['upstik']
handler.tags = ['owner']
handler.command = /^(upstik|stickch)$/i
handler.owner = true

export default handler
