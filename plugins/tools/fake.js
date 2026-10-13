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

import config from '../../config.js';
const pluginConfig = {
    name: 'fake',
    category: 'tools',
    description: 'Fake tag ala Rimuru',
    usage: '.faketag @user|pesan tag|pesan',
    example: '.faketag 628xxx|Darling...|Kamu dimana? 💕',
    cooldown: 5,
    isGroup: true
}

async function handler(m, { sock }) {

    try {

        const body =
            m.body ||
            m.text ||
            ''

        if (!body.includes('|')) {

            return m.reply(
`💗 *RIMURU FAKETAG*

❌ Format salah darling~

📌 Format:
.faketag @user|pesan tag|pesan`
            )
        }

        const parts =
            body.split('|')

        if (parts.length < 3) {

            return m.reply(
`💗 *RIMURU FAKETAG*

❌ Parameter kurang~

📌 Format:
target|pesan tag|pesan`
            )
        }

        const targetInput = parts[0]
        const pesanTag = parts[1].trim()
        const pesan = parts[2].trim()

        let target

        if (m.mentionedJid?.length > 0) {
            target = m.mentionedJid[0]
        } else {

            const nomor =
                targetInput.replace(/[^0-9]/g, '')

            if (!nomor) {

                return m.reply(
`❌ Target tidak valid darling~`
                )
            }

            target = nomor + '@s.whatsapp.net'
        }

        // FAKE QUOTE (EXTENDED TEXT VERSION)
        const fakeQuoted = {
            key: {
                fromMe: false,
                participant: target,
                remoteJid: m.chat
            },
            message: {
                extendedTextMessage: {
                    text: pesanTag
                }
            }
        }

        // SEND (EXTENDED TEXT MESSAGE)
        await sock.sendMessage(
            m.chat,
            {
                text: pesan,
                contextInfo: {
                    mentionedJid: [target]
                }
            },
            {
                quoted: fakeQuoted
            }
        )

    } catch (err) {

        console.error('[FAKETAG ERROR]', err)

        m.reply(
`❌ *RIMURU ERROR*

> ${err.message}`
        )
    }
}

export { pluginConfig as config, handler };
