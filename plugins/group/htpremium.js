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

import { getParticipantJids } from '../../src/lib/rimuru-lid.js'
import te from '../../src/lib/rimuru-error.js'
const pluginConfig = {
    name: ['htpremium', 'hidetagpremium', 'htprem'],
    category: 'group',
    description: 'Hidetag dengan support reply pesan (teks/media)',
    usage: '.htprem [pesan] atau reply pesan',
    example: '.htprem atau reply pesan lalu .htprem',
    isOwner: false,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    cooldown: 30,
    energi: 0,
    isEnabled: true,
    isAdmin: true,
    isBotAdmin: false
}

async function handler(m, { sock }) {
    try {
        const groupMeta = m.groupMetadata
        const participants = groupMeta.participants || []
        const mentions = getParticipantJids(participants)
        const quoted = m.quoted
        const [cmd, text] = m.text?.split('|')
        if (quoted) {
            const qMsg = quoted.message || {}
            const type = Object.keys(qMsg)[0]
            if (type === 'imageMessage') {
                const media = await quoted.download()
                const caption = qMsg.imageMessage?.caption || text || ''
                return sock.sendMessage(m.chat, {
                    image: media,
                    caption,
                    mentions
                })
            }
            if (type === 'videoMessage') {
                const media = await quoted.download()
                const caption = qMsg.videoMessage?.caption || text || ''
                return sock.sendMessage(m.chat, {
                    video: media,
                    caption,
                    mentions
                })
            }
            if (type === 'stickerMessage') {
                const media = await quoted.download()
                await sock.sendMessage(m.chat, {
                    sticker: media,
                    mentions
                })
                if (text) {
                    await sock.sendMessage(m.chat, {
                        text,
                        mentions
                    })
                }
                return
            }
            if (type === 'audioMessage') {
                const media = await quoted.download()
                const audioMsg = qMsg.audioMessage || {}

                await sock.sendMessage(m.chat, {
                    audio: media,
                    mimetype: audioMsg.mimetype,
                    ptt: audioMsg.ptt || false,
                    mentions
                })

                if (text) {
                    await sock.sendMessage(m.chat, {
                        text,
                        mentions
                    })
                }
                return
            }
            if (type === 'documentMessage') {
                const media = await quoted.download()
                const docMsg = qMsg.documentMessage || {}

                await sock.sendMessage(m.chat, {
                    document: media,
                    mimetype: docMsg.mimetype,
                    fileName: docMsg.fileName || 'file',
                    mentions
                })

                if (text) {
                    await sock.sendMessage(m.chat, {
                        text,
                        mentions
                    })
                }
                return
            }
            const quotedText =
                quoted.text ||
                qMsg.conversation ||
                qMsg.extendedTextMessage?.text ||
                ''

            const finalText = text || quotedText

            if (!finalText) {
                return m.reply('❌ *Pesan kosong*')
            }

            return sock.sendMessage(m.chat, {
                text: finalText,
                mentions
            })
        }
        if (!text) {
            return m.reply(
                `📢 *HIDETAG PREMIUM*\n\n` +
                `• Reply pesan lalu ketik \`${m.prefix}ht\`\n` +
                `• Atau ketik \`${m.prefix}ht <custom tag> | <pesan>\`\n\n` +
                `• Contoh: \`${m.prefix}ht everyone | hai semua\`\n\n` +
                `Support: teks, gambar, video, sticker, audio, dokumen`
            )
        }

        await sock.sendMessage(m.chat, {
            text: `@${m.chat} ${text} `,
            contextInfo: {
                groupMentions: [{
                    groupJid: m.chat,
                    groupSubject: cmd
                }],
                mentionedJid: mentions
            }
        }, { quoted: m })

    } catch (err) {
        m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }