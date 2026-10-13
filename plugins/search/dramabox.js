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

import dramaboxsearch from '../../src/scraper/dramabox.js';
const pluginConfig = {
    name: 'dramabox',
    category: 'search',
    description: 'Cari drama di DramaBox',
    usage: '.dramabox <query>',
    example: '.dramabox billionaire',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const query = m.text?.trim()
    
    if (!query) {
        return m.reply(
            `⚠️ *ᴄᴀʀᴀ ᴘᴀᴋᴀɪ*\n\n` +
            `> \`${m.prefix}dramabox <query>\`\n\n` +
            `> Contoh:\n` +
            `> \`${m.prefix}dramabox billionaire\``
        )
    }
    
    try {
        const data = await dramaboxsearch(query)
        
        if (data.status === 'eror' || !data.results?.length) {
            return m.reply(`❌ Tidak ditemukan drama untuk: ${query}`)
        }
        
        const dramas = data.results.slice(0, 5)
        
        let txt = `🎬 *ᴅʀᴀᴍᴀʙᴏx sᴇᴀʀᴄʜ*\n\n`
        txt += `╭┈┈⬡「 🔍 *ɪɴꜰᴏ* 」\n`
        txt += `┃ 🔎 ǫᴜᴇʀʏ: *${query}*\n`
        txt += `┃ 📊 ᴛᴏᴛᴀʟ: *${data.total} hasil*\n`
        txt += `╰┈┈⬡\n\n`
        
        dramas.forEach((d, i) => {
            const desc = d.description?.substring(0, 80) || '-'
            txt += `╭┈┈⬡「 🎭 *${i + 1}* 」\n`
            txt += `┃ 📛 \`\`\`${d.title}\`\`\`\n`
            txt += `┃ 📺 ᴇᴘɪsᴏᴅᴇs: *${d.episodes || 0}*\n`
            txt += `┃ 📝 ${desc}${d.description?.length > 80 ? '...' : ''}\n`
            txt += `┃ 🔗 \`${d.play_url}\`\n`
            txt += `╰┈┈⬡\n\n`
        })
        
        return m.reply(txt.trim())
        
    } catch (err) {
        return m.reply(`❌ *ɢᴀɢᴀʟ*\n\n> ${err.message}`)
    }
}

export { pluginConfig as config, handler };
