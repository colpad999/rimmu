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

import scrapeHokCharacter from '../../src/scraper/hokinfo.js';
const pluginConfig = {
    name: 'hok',
    category: 'info',
    description: 'Informasi karakter Honor of Kings',
    usage: '.hok <nama karakter>',
    example: '.hok Dyadia',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 1,
    isEnabled: true
}

async function handler(m, { sock }) {
    const name = m.args.join(' ')
    if (!name) {
        return m.reply(`🎮 *ʜᴏɴᴏʀ ᴏꜰ ᴋɪɴɢs*\n\n> Masukkan nama karakter\n\n\`Contoh: ${m.prefix}hok Dyadia\``)
    }
    
    m.react('🔍')
    
    try {
        const data = await scrapeHokCharacter(name)
        
        if (!data || !data.title) {
            m.react('❌')
            return m.reply(`❌ *ɢᴀɢᴀʟ*\n\n> Karakter "${name}" tidak ditemukan`)
        }
        
        m.react('🎮')
        
        const profile = data.profile || {}
        let caption = `🎮 *ʜᴏɴᴏʀ ᴏꜰ ᴋɪɴɢs*\n\n`
        caption += `╭┈┈⬡「 👤 *${data.title.toUpperCase()}* 」\n`
        
        if (profile.Class) caption += `┃ ⚔️ ᴄʟᴀss: \`${profile.Class}\`\n`
        if (profile.Focus) caption += `┃ 🎯 ꜰᴏᴄᴜs: \`${profile.Focus}\`\n`
        if (profile.Specialty) caption += `┃ ✨ sᴘᴇᴄɪᴀʟᴛʏ: \`${profile.Specialty}\`\n`
        if (profile.Lanes) caption += `┃ 🛤️ ʟᴀɴᴇs: \`${profile.Lanes}\`\n`
        if (profile.Price) caption += `┃ 💰 ᴘʀɪᴄᴇ: \`${profile.Price}\`\n`
        if (profile.Species) caption += `┃ 🧬 sᴘᴇᴄɪᴇs: \`${profile.Species}\`\n`
        if (profile.Height) caption += `┃ 📏 ʜᴇɪɢʜᴛ: \`${profile.Height}\`\n`
        if (profile.Region) caption += `┃ 🌍 ʀᴇɢɪᴏɴ: \`${profile.Region}\`\n`
        if (profile.Faction) caption += `┃ 🏰 ꜰᴀᴄᴛɪᴏɴ: \`${profile.Faction}\`\n`
        
        caption += `╰┈┈⬡\n\n`
        
        if (data.skills?.length) {
            caption += `⚡ *sᴋɪʟʟs*\n> \`${data.skills.join(', ')}\`\n\n`
        }
        
        if (data.lore) {
            const shortLore = data.lore.length > 500 ? data.lore.substring(0, 500) + '...' : data.lore
            caption += `📜 *ʟᴏʀᴇ*\n> ${shortLore}\n\n`
        }
        
        caption += `> 🔗 \`${data.url}\``
        
        if (data.image) {
            await sock.sendMessage(m.chat, {
                image: { url: data.image },
                caption
            }, { quoted: m })
        } else {
            await m.reply(caption)
        }
        
    } catch (error) {
        m.react('❌')
        m.reply(`❌ *ᴇʀʀᴏʀ*\n\n> ${error.message}`)
    }
}

export { pluginConfig as config, handler };
