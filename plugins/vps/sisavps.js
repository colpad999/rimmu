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
import config from '../../config.js'
import te from '../../src/lib/rimuru-error.js'
const pluginConfig = {
    name: ['sisavps', 'sisadroplet', 'vpsquota'],
    category: 'vps',
    description: 'Cek sisa kuota VPS',
    usage: '.sisavps',
    example: '.sisavps',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 0,
    isEnabled: true
}

function hasAccess(sender, isOwner) {
    if (isOwner) return true
    const cleanSender = sender?.split('@')[0]
    if (!cleanSender) return false
    const doConfig = config.digitalocean || {}
    return (doConfig.sellers || []).includes(cleanSender) || 
           (doConfig.ownerPanels || []).includes(cleanSender)
}

async function handler(m, { sock }) {
    const token = config.digitalocean?.token
    
    if (!token) {
        return m.reply(`⚠️ *ᴅɪɢɪᴛᴀʟᴏᴄᴇᴀɴ ʙᴇʟᴜᴍ ᴅɪsᴇᴛᴜᴘ*`)
    }
    
    if (!hasAccess(m.sender, m.isOwner)) {
        return m.reply(`❌ *ᴀᴋsᴇs ᴅɪᴛᴏʟᴀᴋ*`)
    }
    
    try {
        const [accountRes, dropletsRes] = await Promise.all([
            axios.get('https://api.digitalocean.com/v2/account', {
                headers: { 'Authorization': `Bearer ${token}` }
            }),
            axios.get('https://api.digitalocean.com/v2/droplets', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
        ])
        
        const account = accountRes.data.account
        const droplets = dropletsRes.data.droplets || []
        const dropletLimit = account.droplet_limit
        const dropletsUsed = droplets.length
        const dropletsRemaining = dropletLimit - dropletsUsed
        
        let txt = `📊 *ᴋᴜᴏᴛᴀ ᴅɪɢɪᴛᴀʟᴏᴄᴇᴀɴ*\n\n`
        txt += `╭─────────────\n`
        txt += `┃ 📦 Limit: *${dropletLimit}* droplet\n`
        txt += `┃ ✅ Terpakai: *${dropletsUsed}* droplet\n`
        txt += `┃ 📋 Sisa: *${dropletsRemaining}* droplet\n`
        txt += `╰─────────────\n\n`
        txt += `> 👤 Email: ${account.email}\n`
        txt += `> ✅ Status: ${account.status}`
        
        await m.reply(txt)
        
    } catch (err) {
        return m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }