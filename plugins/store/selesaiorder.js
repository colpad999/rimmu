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

import { getDatabase } from '../../src/lib/rimuru-database.js';
import orderPoller from '../../src/lib/orderPoller.js';

const pluginConfig = {
    name: 'selesaiorder',
    category: 'store',
    description: 'Konfirmasi order (Admin)',
    usage: '.confirmorder <order_id>',
    example: '.confirmorder ORD20260111ABC123',
    isOwner: false,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    isAdmin: true,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const db = getDatabase()
    const groupData = db.getGroup(m.chat) || {}
    
    if (groupData.botMode !== 'store') {
        return m.reply(`❌ Fitur ini hanya tersedia di mode *STORE*!`)
    }
    
    const orderId = m.text?.trim().toUpperCase()
    
    if (!orderId) {
        const pendingOrders = orderPoller.getOrdersByGroup(m.chat)
            .filter(o => o.status === 'waiting_confirm' || o.status === 'pending' || o.status === 'paid')
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        
        if (pendingOrders.length === 0) {
            return m.reply(`✅ Tidak ada order yang perlu dikonfirmasi!`)
        }
        
        let txt = `📋 *ᴏʀᴅᴇʀ ᴘᴇɴᴅɪɴɢ*\n\n`
        
        pendingOrders.slice(0, 10).forEach(order => {
            const items = order.items?.map(it => `${it.name} x${it.qty}`).join(', ') || '-'
            txt += `> \`${order.orderId}\`\n`
            txt += `   👤 @${order.buyerJid?.split('@')[0]}\n`
            txt += `   📦 ${items}\n`
            txt += `   💰 Rp ${order.total.toLocaleString('id-ID')}\n`
            txt += `   📊 ${order.status}\n\n`
        })
        
        txt += `━━━━━━━━━━━━━━━\n`
        txt += `> \`${m.prefix}confirmorder <order_id>\``
        
        return m.reply(txt, { mentions: pendingOrders.map(o => o.buyerJid).filter(Boolean) })
    }
    
    const order = orderPoller.getOrder(orderId)
    
    if (!order) {
        return m.reply(`❌ Order tidak ditemukan: \`${orderId}\``)
    }
    
    if (order.groupId !== m.chat) {
        return m.reply(`❌ Order ini bukan dari grup ini!`)
    }
    
    if (order.status === 'completed') {
        return m.reply(`✅ Order sudah selesai sebelumnya!`)
    }
    
    if (order.status === 'cancelled' || order.status === 'expired') {
        return m.reply(`❌ Order sudah ${order.status}!`)
    }
    
    orderPoller.updateOrder(orderId, {
        status: 'completed',
        completedAt: new Date().toISOString(),
        confirmedBy: m.sender
    })
    
    m.react('✅')
    
    const items = order.items?.map(it => `${it.name} x${it.qty}`).join(', ') || '-'
    
    await sock.sendMessage(m.chat, {
        text: `🎉 *ᴏʀᴅᴇʀ sᴇʟᴇsᴀɪ*\n\n` +
              `> Order ID: \`${orderId}\`\n` +
              `> Pembeli: @${order.buyerJid?.split('@')[0]}\n` +
              `> Item: ${items}\n` +
              `> Total: Rp ${order.total.toLocaleString('id-ID')}\n\n` +
              `Terima kasih sudah berbelanja! 🙏`,
        mentions: [order.buyerJid]
    }, { quoted: m })
}
export { pluginConfig as config, handler };