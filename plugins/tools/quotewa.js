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

import axios from 'axios'
import { uploadImage } from '../../src/lib/rimuru-uploader.js'
import te from '../../src/lib/rimuru-error.js'
import { serialize } from '../../src/lib/rimuru-serialize.js'
import { parsePhoneNumber } from 'awesome-phonenumber'

const pluginConfig = {
    name: 'quotewa',
    category: 'tools',
    description: 'Membuat gambar quote WhatsApp',
    usage: '.qwa [teks]',
    example: '.qwa Halo Dunia',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 2,
    isEnabled: true
}

async function getPp(sock, jid) {
    try {
        const url = await sock.profilePictureUrl(jid, 'image')
        return url
    } catch {
        return 'https://files.catbox.moe/ios0gb.jfif'
    }
}

async function handler(m, { sock }) {
    try {
        let mainMsg = m
        let quoteMsg = null
        let textToQuote = m.args.join(' ')

        if (m.quoted && !textToQuote) {
            mainMsg = m.quoted
            textToQuote = mainMsg.body || ''
            
            if (sock.store && sock.store.loadMessage && mainMsg.id) {
                const originalMainMsg = await sock.store.loadMessage(m.chat, mainMsg.id)
                if (originalMainMsg) {
                    const serializedOriginal = await serialize(sock, originalMainMsg)
                    if (serializedOriginal && serializedOriginal.quoted) {
                        quoteMsg = serializedOriginal.quoted
                    }
                }
            }
        } else if (m.quoted && textToQuote) {
            mainMsg = m
            quoteMsg = m.quoted
        }

        if (!textToQuote && !mainMsg.isMedia) {
            return m.reply(`❌ *FORMAT SALAH*\n\nKirim perintah \`.qwa <teks>\` atau reply pesan orang lain dengan \`.qwa\`.`)
        }
        await m.react('🕕')
        const msgTime = mainMsg.messageTimestamp ? new Date(mainMsg.messageTimestamp * 1000) : new Date()
        const timeStr = `${String(msgTime.getHours()).padStart(2, '0')}.${String(msgTime.getMinutes()).padStart(2, '0')}`
        let mainImage = null
        if (mainMsg.isMedia) {
            try {
                const buffer = await mainMsg.download()
                if (buffer) {
                    mainImage = await uploadImage(buffer)
                }
            } catch (err) {
                console.error("Gagal download/upload media utama:", err)
            }
        }

        let quotedImage = null
        if (quoteMsg && quoteMsg.isMedia) {
            try {
                const buffer = await quoteMsg.download()
                if (buffer) {
                    quotedImage = await uploadImage(buffer)
                }
            } catch (err) {
                console.error("Gagal download/upload media quoted:", err)
            }
        }

        const formatNumber = (numStr) => {
            try {
                const cleanNum = numStr.split('@')[0]
                const pn = parsePhoneNumber("+" + cleanNum)
                if (pn && pn.valid && pn.number && pn.number.international) {
                    return pn.number.international.replace(/-/g, ' ')
                }
            } catch (e) {}
            return "+" + numStr.split('@')[0]
        }

        const payload = {
            sender_name:  `~ ${mainMsg.pushName}` || "~ User",
            sender_number: formatNumber(mainMsg.sender),
            sender_avatar: await getPp(sock, mainMsg.sender),
            message: textToQuote,
            time: timeStr,
            background: false
        }

        if (mainImage) payload.sender_image = mainImage

        if (quoteMsg) {
            payload.quoted = {
                name: `~ ${quoteMsg.pushName}` || "~ User",
                number: formatNumber(quoteMsg.sender),
                message: quoteMsg.body || ""
            }
            if (quotedImage) payload.quoted.image = quotedImage
        }
        const res = await axios.post('https://qwa.eeq.my.id/api/generate', payload, {
            headers: { 'Content-Type': 'application/json' },
            responseType: 'arraybuffer'
        })
        await sock.sendMessage(m.chat, {
            image: Buffer.from(res.data),
            caption: `✅ Berhasil membuat quote WhatsApp!`
        }, { quoted: m })

        await m.react('✅')
    } catch (error) {
        console.error("Error QWA:", error)
        await m.react('❌')
        m.reply(`❌ *GAGAL MEMBUAT QUOTE*\n\n> Terjadi kesalahan atau API sedang bermasalah.`)
    }
}

export { pluginConfig as config, handler }
