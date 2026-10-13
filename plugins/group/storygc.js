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

import { generateWAMessageContent, generateWAMessageFromContent } from '@itsliaaa/baileys';
import crypto from 'crypto';
const pluginConfig = {
    name: 'storygc',
    category: 'group',
    description: 'Upload story untuk grup (border hijau)',
    usage: '.upsw <teks> / reply media',
    example: '.upsw Halo semua',
    isOwner: false,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    cooldown: 10,
    energi: 0,
    isEnabled: true
}

async function sendGroupStatus(sock, jid, content) {

    const inside = await generateWAMessageContent(content, {
        upload: sock.waUploadToServer
    })

    const messageSecret = crypto.randomBytes(32)

    const msg = generateWAMessageFromContent(jid, {
        messageContextInfo: {
            messageSecret
        },
        groupStatusMessageV2: {
            message: {
                ...inside,
                messageContextInfo: {
                    messageSecret
                }
            }
        }
    }, {})

    await sock.relayMessage(jid, msg.message, {
        messageId: msg.key.id
    })
}

async function handler(m, { sock }) {

    if (!m.isGroup) {
        return m.reply("❌ Fitur ini hanya bisa dipakai di grup.")
    }

    const text = m.text || ''
    let content = {}

    try {

        if (m.quoted && (m.quoted.isImage || m.quoted.isVideo)) {

            const buffer = await m.quoted.download()

            if (m.quoted.isImage) {
                content = {
                    image: buffer,
                    caption: text || ''
                }
            }

            if (m.quoted.isVideo) {
                content = {
                    video: buffer,
                    caption: text || ''
                }
            }

        }

        else if (m.isImage || m.isVideo) {

            const buffer = await m.download()

            if (m.isImage) {
                content = {
                    image: buffer,
                    caption: text || ''
                }
            }

            if (m.isVideo) {
                content = {
                    video: buffer,
                    caption: text || ''
                }
            }

        }

        else if (text) {

            content = {
                text: text,
                font: 0,
                backgroundColor: "#FF2E63"
            }

        }

        else {

            return m.reply(
`╭━━━〔 💗 RIMURU GROUP STORY 💗 〕━━⬣
┃
┃ Darling kirim sesuatu dong~
┃
┃ Cara pakai :
┃
┃ .upsw teks
┃ reply gambar .upsw
┃ reply video .upsw
┃
╰━━━━━━━━━━━━━━━━⬣`)
        }

        await sendGroupStatus(sock, m.chat, content)

        await m.reply(
`╭━━━〔 💗 RIMURU STORY 💗 〕━━⬣
┃
┃ 📡 Story grup berhasil dipost~
┃
┃ Sekarang icon grup
┃ punya border hijau 😳
┃
╰━━━━━━━━━━━━━━━━⬣`)

    } catch (err) {

        console.log(err)

        m.reply(
`╭━━━〔 ❌ ERROR 〕━━⬣
┃
┃ Gagal upload story
┃ coba lagi ya darling
┃
╰━━━━━━━━━━━━━━━━⬣`)
    }

}

export { pluginConfig as config, handler };
