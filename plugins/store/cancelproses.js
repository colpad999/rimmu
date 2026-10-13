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
import { getDatabase } from '../../src/lib/rimuru-database.js';
const pluginConfig = {
    name: 'cancelproses',
    category: 'store',
    description: 'Batalkan proses transaksi',
    usage: '.cancelproses @buyer',
    example: '.cancelproses @628xxx',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m) {
    const db = getDatabase()
    let sessions = db.setting('transactionSessions') || {}
    
    const mentioned = m.mentionedJid?.[0]
    const quoted = m.quoted?.sender
    const target = mentioned || quoted
    
    if (!target) {
        if (Object.keys(sessions).length === 0) {
            return m.reply(`❌ Tidak ada transaksi aktif`)
        }
        
        let list = `📋 *ᴛʀᴀɴsᴀᴋsɪ ᴀᴋᴛɪꜰ*\n\n`
        for (const [jid, session] of Object.entries(sessions)) {
            list += `> @${jid.split('@')[0]} - ${session.produk} (${session.nominal})\n`
        }
        list += `\n> Batalkan dengan \`${m.prefix}cancelproses @buyer\``
        
        return m.reply(list, { mentions: Object.keys(sessions) })
    }
    
    if (!sessions[target]) {
        return m.reply(`❌ Tidak ada transaksi aktif untuk user ini`)
    }
    
    const session = sessions[target]
    delete sessions[target]
    db.setting('transactionSessions', sessions)
    await db.save()
    
    m.reply(
        `✅ *ᴛʀᴀɴsᴀᴋsɪ ᴅɪʙᴀᴛᴀʟᴋᴀɴ*\n\n` +
        `> Produk: ${session.produk}\n` +
        `> Buyer: @${target.split('@')[0]}`,
        { mentions: [target] }
    )
}

export { pluginConfig as config, handler };
