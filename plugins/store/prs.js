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

import { RIMURU_CORE_CONFIG } from "../../config.js";
import config from '../../config.js';
import { getDatabase } from '../../src/lib/rimuru-database.js';
const pluginConfig = {
    name: 'prs',
    category: 'store',
    description: 'Mulai proses transaksi dengan buyer',
    usage: '.prs',
    example: '.prs',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

const defaultTemplate = `「 *TRANSAKSI DIPROSES* 」

⌚️ JAM     : {jam}
✨ STATUS  : Diproses

*👤 Buyer:*
@{buyer_number} ({buyer})

Mohon tunggu ya, pesanan sedang diproses🙏`

function generateProsesMessage(db, session) {
    const prosesSettings = db.setting('prosesTemplate') || {}
    const template = prosesSettings.template || defaultTemplate
    
    const now = new Date()
    const jam = `${now.getHours().toString().padStart(2, '0')}.${now.getMinutes().toString().padStart(2, '0')}.${now.getSeconds().toString().padStart(2, '0')}`
    const tanggal = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`
    
    return template
        .replace(/{buyer}/gi, session.buyerName)
        .replace(/{buyer_number}/gi, session.buyerNumber)
        .replace(/{jam}/gi, jam)
        .replace(/{time}/gi, jam)
        .replace(/{date}/gi, tanggal)
}

async function handler(m, { sock }) {
    const db = getDatabase()
    
    if (!m.quoted) {
        return m.reply(
            `📦 *ᴘʀᴏsᴇs ᴛʀᴀɴsᴀᴋsɪ*\n\n` +
            `> Reply pesan buyer lalu ketik \`${m.prefix}prs\`\n\n` +
            `*ғʟᴏᴡ:*\n` +
            `1. Reply pesan buyer → \`${m.prefix}prs\`\n` +
            `2. Proses transaksi...\n` +
            `3. Selesai → \`${m.prefix}done\` atau \`${m.prefix}done pesanan|note\``
        )
    }
    
    const buyerJid = m.quoted.sender || m.quotedSender
    const buyerName = m.quoted.pushName || 'Buyer'
    const buyerNumber = buyerJid?.split('@')[0] || ''
    
    if (!buyerJid) {
        return m.reply(`❌ Tidak bisa mendapatkan nomor buyer!`)
    }
    
    let sessions = db.setting('transactionSessions') || {}
    
    if (sessions[buyerJid]) {
        return m.reply(
            `⚠️ Buyer ini sudah ada transaksi aktif!\n\n` +
            `> Nama: ${sessions[buyerJid].buyerName}\n` +
            `> Nomor: ${sessions[buyerJid].buyerNumber}\n\n` +
            `> Hapus: \`${m.prefix}cancelproses @${buyerNumber}\``
        )
    }
    
    const session = {
        buyerJid,
        buyerName,
        buyerNumber,
        sellerJid: m.sender,
        chatJid: m.chat,
        startedAt: Date.now(),
        status: 'processing'
    }
    
    sessions[buyerJid] = session
    db.setting('transactionSessions', sessions)
    await db.save()
    
    const saluranId = RIMURU_CORE_CONFIG.saluran?.id || config.saluran?.id
    const saluranName = RIMURU_CORE_CONFIG.saluran?.name || RIMURU_CORE_CONFIG.bot?.name || 'rimuru-AI'
    
    const prosesMessage = generateProsesMessage(db, session)
    
    await sock.sendMessage(m.chat, {
        text: prosesMessage,
        mentions: [buyerJid],
        contextInfo: {
            mentionedJid: [buyerJid],
            forwardingScore: 9999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: saluranId,
                newsletterName: saluranName,
                serverMessageId: 127
            }
        }
    }, { quoted: m })
    
    m.react('✅')
}

export { pluginConfig as config, handler };
