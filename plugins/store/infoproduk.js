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
const pluginConfig = {
    name: 'infoproduk',
    category: 'store',
    description: 'Lihat detail produk',
    usage: '.productinfo <nomor>',
    example: '.productinfo 1',
    isOwner: false,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
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
    
    const products = groupData.storeConfig?.products || []
    
    if (products.length === 0) {
        return m.reply(`❌ Belum ada produk!`)
    }
    
    const idx = parseInt(m.text?.trim()) - 1
    
    if (isNaN(idx) || idx < 0 || idx >= products.length) {
        return m.reply(`❌ Nomor produk tidak valid!\n\n> Lihat: \`${m.prefix}products\``)
    }
    
    const p = products[idx]
    const stock = p.stock === -1 ? '∞' : p.stock
    
    let txt = `📦 *ᴅᴇᴛᴀɪʟ ᴘʀᴏᴅᴜᴋ*\n\n`
    txt += `> *Nama:* ${p.name}\n`
    txt += `> *Harga:* Rp ${p.price.toLocaleString('id-ID')}\n`
    txt += `> *Stok:* ${stock}\n`
    if (p.description) txt += `\n📝 *Deskripsi:*\n${p.description}\n`
    txt += `\n━━━━━━━━━━━━━━━\n`
    txt += `> \`${m.prefix}order ${idx + 1}\` untuk pesan`
    
    if (p.image) {
        await sock.sendMessage(m.chat, {
            image: { url: p.image },
            caption: txt
        }, { quoted: m })
    } else if (p.video) {
        await sock.sendMessage(m.chat, {
            video: { url: p.video },
            caption: txt
        }, { quoted: m })
    } else {
        await m.reply(txt)
    }
}

export { pluginConfig as config, handler };
