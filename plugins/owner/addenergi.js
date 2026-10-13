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

import config from '../../config.js'
import { getDatabase } from '../../src/lib/rimuru-database.js'
const pluginConfig = {
    name: 'addenergi',
    category: 'owner',
    description: 'Tambah energi user',
    usage: '.addenergi <jumlah> @user',
    example: '.addenergi 100 @user',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

function formatNumber(num) {
    if (num === -1) return '∞ Unlimited'
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

async function handler(m, { sock }) {
    const db = getDatabase()
    const args = m.args || []

    let amount = 0
    let isUnlimited = false
    let targetJid = null

    if (m.text?.toLowerCase().includes('--unlimited') || m.text?.toLowerCase().includes('--unli')) {
        isUnlimited = true
    }

    const numArg = args.find(a => !isNaN(a) && !a.includes('@') && !a.startsWith('-'))
    if (numArg) amount = parseInt(numArg)

    if (m.quoted) {
        targetJid = m.quoted.sender
    } else if (m.mentionedJid?.length) {
        targetJid = m.mentionedJid[0]
    } else {
        const phoneArg = args.find(a => a !== numArg && a.length > 5 && /^\d+$/.test(a.replace(/[^0-9]/g, '')))
        if (phoneArg) {
            targetJid = phoneArg.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        }
    }

    if (!targetJid && (amount > 0 || isUnlimited)) {
        targetJid = m.sender
    }

    if (!targetJid || (!isUnlimited && amount <= 0)) {
        return m.reply(
            `⚡ *ᴀᴅᴅ ᴇɴᴇʀɢɪ*\n\n` +
            `> \`.addenergi <jumlah>\` - ke diri sendiri\n` +
            `> \`.addenergi <jumlah> @user\` - ke user\n` +
            `> \`.addenergi --unlimited\` - unlimited\n\n` +
            `\`Contoh: ${m.prefix}addenergi 100\``
        )
    }

    const user = db.getUser(targetJid) || db.setUser(targetJid)

    const effectiveUnlimited = user.energi === -1 ||
        (config.isOwner(targetJid) && (config.energi?.owner ?? -1) === -1) ||
        (config.isPremium(targetJid) && (config.energi?.premium ?? -1) === -1)

    if (!isUnlimited && effectiveUnlimited) {
        return m.reply(
            `⚡ *INFORMASI*\n` +
            `@${targetJid.split('@')[0]} sudah memiliki energi *∞ Unlimited*\n` +
            `Tidak perlu menambahkan energi lagi`,
            { mentions: [targetJid] }
        )
    }

    if (isUnlimited) {
        db.setUser(targetJid, { energi: -1 })

        await m.react('✅')
        await m.reply(
            `✅ *Energi @${targetJid.split('@')[0]} sekarang unlimited / tidak terbatas*`,
            { mentions: [targetJid] }
        )
    } else {
        const newEnergi = db.updateEnergi(targetJid, amount)

        await m.react('✅')
        await m.reply(
            `✅ Energi *@${targetJid.split('@')[0]}* berhasil di tambahkan sebanyak *${formatNumber(amount)}*!\nSekarang dia mempunyai *${formatNumber(newEnergi)}* energi`,
            { mentions: [targetJid] }
        )
    }
}

export { pluginConfig as config, handler }