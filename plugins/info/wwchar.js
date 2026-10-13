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

import scrapeWWCharacter from '../../src/scraper/wwchar.js';
const pluginConfig = {
    name: 'wwchar',
    category: 'info',
    description: 'Informasi karakter Wuthering Waves',
    usage: '.wwchar <nama karakter>',
    example: '.wwchar Chisa',
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
        return m.reply(`🌊 *ᴡᴜᴛʜᴇʀɪɴɢ ᴡᴀᴠᴇs*\n\n> Masukkan nama karakter\n\n\`Contoh: ${m.prefix}wwchar Chisa\``)
    }
    
    m.react('🔍')
    
    try {
        const data = await scrapeWWCharacter(name)
        
        if (!data || !data.title) {
            m.react('❌')
            return m.reply(`❌ *ɢᴀɢᴀʟ*\n\n> Karakter "${name}" tidak ditemukan`)
        }
        
        m.react('🌊')
        
        const profile = data.profile || {}
        let caption = `🌊 *ᴡᴜᴛʜᴇʀɪɴɢ ᴡᴀᴠᴇs*\n\n`
        caption += `╭┈┈⬡「 👤 *${data.title.toUpperCase()}* 」\n`
        
        if (profile.real_name) caption += `┃ 📛 ɴᴀᴍᴇ: \`${profile.real_name}\`\n`
        if (profile.class) caption += `┃ ⚔️ ᴄʟᴀss: \`${profile.class}\`\n`
        if (profile.gender) caption += `┃ 👤 ɢᴇɴᴅᴇʀ: \`${profile.gender}\`\n`
        if (profile.age) caption += `┃ 📅 ᴀɢᴇ: \`${profile.age}\`\n`
        if (profile.birthplace) caption += `┃ 🏠 ʙɪʀᴛʜᴘʟᴀᴄᴇ: \`${profile.birthplace}\`\n`
        if (profile.nation) caption += `┃ 🌍 ɴᴀᴛɪᴏɴ: \`${profile.nation}\`\n`
        if (profile.affiliations) caption += `┃ 🏰 ᴀꜰꜰɪʟɪᴀᴛɪᴏɴ: \`${profile.affiliations}\`\n`
        
        caption += `╰┈┈⬡\n\n`
        
        if (profile.english || profile.japanese) {
            caption += `🎤 *ᴠᴏɪᴄᴇ ᴀᴄᴛᴏʀs*\n`
            if (profile.english) caption += `> 🇺🇸 EN: \`${profile.english}\`\n`
            if (profile.japanese) caption += `> 🇯🇵 JP: \`${profile.japanese}\`\n`
            if (profile.chinese) caption += `> 🇨🇳 CN: \`${profile.chinese}\`\n`
            if (profile.korean) caption += `> 🇰🇷 KR: \`${profile.korean}\`\n`
            caption += `\n`
        }
        
        if (data.bio) {
            caption += `📜 *ʙɪᴏ*\n> ${data.bio}\n\n`
        }
        
        caption += `> 🔗 \`${data.url}\``
        
        const imageUrl = data.images?.[0] || null
        
        if (imageUrl) {
            await sock.sendMessage(m.chat, {
                image: { url: imageUrl },
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
