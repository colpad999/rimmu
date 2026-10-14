//

import axios from 'axios';
const pluginConfig = {
    name: 'rch',
    category: 'tools',
    description: 'Kirim react ke post channel WhatsApp',
    usage: '.rch <link_post> <emoji>',
    example: '.rch https://whatsapp.com/channel/YALENA_CHANNEL 😂😍',
    isOwner: false,
    isPremium: true,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 1,
    isEnabled: true
}

async function handler(m, { sock }) {
    const args = m.args || []
    
    if (args.length < 2) {
        return m.reply(
            `⚠️ *ꜰᴏʀᴍᴀᴛ sᴀʟᴀʜ!*\n\n` +
            `╭┈┈⬡「 📋 *ᴄᴀʀᴀ ᴘᴀᴋᴀɪ* 」\n` +
            `┃ \`${m.prefix}rch <link_post> <emoji>\`\n` +
            `╰┈┈⬡\n\n` +
            `📌 *Contoh:*\n` +
            `\`${m.prefix}rch https://whatsapp.com/channel/YALENA_CHANNEL 😂\`\n` +
            `\`${m.prefix}rch https://whatsapp.com/channel/YALENA_CHANNEL 😂😱🔥\``
        )
    }
    
    const link = args[0]
    const emoji = args.slice(1).join('')
    
    if (!link.includes('whatsapp.com/channel')) {
        return m.reply(`❌ *ʟɪɴᴋ ᴛɪᴅᴀᴋ ᴠᴀʟɪᴅ*\n\n> Link harus dari channel WhatsApp!`)
    }
    
    if (!emoji) {
        return m.reply(`❌ *ᴇᴍᴏᴊɪ ᴋᴏsᴏɴɢ*\n\n> Masukkan emoji untuk react!`)
    }
    
    m.react('⏳')
    
    try {
        const url = `https://api-faa.my.id/faa/react-channel?url=${encodeURIComponent(link)}&react=${encodeURIComponent(emoji)}`
        
        const { data } = await axios.get(url, { timeout: 30000 })
        
        if (data?.status) {
            m.react('✅')
            await m.reply(
                `✅ *ʀᴇᴀᴄᴛ sᴇɴᴛ!*\n\n` +
                `╭┈┈⬡「 📋 *ᴅᴇᴛᴀɪʟ* 」\n` +
                `┃ 🔗 Target: \`${data.info?.destination || link}\`\n` +
                `┃ 🎭 Emoji: ${data.info?.reaction_used?.replace(/,/g, ' ') || emoji.replace(/,/g, ' ')}\n` +
                `╰┈┈⬡`
            )
        } else {
            throw new Error(data?.message || 'Gagal mengirim reaksi')
        }
    } catch (err) {
        m.react('❌')
        await m.reply(
            `❌ *ɢᴀɢᴀʟ ᴍᴇɴɢɪʀɪᴍ ʀᴇᴀᴋsɪ*\n\n` +
            `> Limit RCH habis, silahkan tunggu hari berikutnya hehe\n\n`
        )
    }
}

export { pluginConfig as config, handler };
