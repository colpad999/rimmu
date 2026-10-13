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

/**
 * Putus - End relationship
 */

import { getDatabase } from '../../src/lib/rimuru-database.js'
const pluginConfig = {
    name: 'putus',
    category: 'fun',
    description: 'Memutuskan hubungan dengan pasangan',
    usage: '.putus',
    example: '.putus',
    isOwner: false,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    cooldown: 60,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const db = getDatabase()
    let senderData = db.getUser(m.sender) || {}
    if (!senderData.fun) senderData.fun = {}
    if (!senderData.fun.pasangan) {
        await m.react('❌')
        return m.reply(
            `❌ *Kamu gak ada pacar wehh*\n\n` +
            `Cari dulu dengan \`${m.prefix}tembak @tag\``
        )
    }
    const exPartner = senderData.fun.pasangan
    let exData = db.getUser(exPartner) || {}
    delete senderData.fun.pasangan
    if (exData.fun?.pasangan === m.sender) {
        delete exData.fun.pasangan
        db.setUser(exPartner, exData)
    }
    db.setUser(m.sender, senderData)
    await m.react('💔')
    await m.reply(
        `💔 *PUTUS!*\n\n` +
        `@${m.sender.split('@')[0]} dan @${exPartner.split('@')[0]} resmi putus !!\n\n` +
        `Semoga mendapat yang lebih baik! 🙏`,
        { mentions: [m.sender, exPartner] }
    )
}

export { pluginConfig as config, handler }