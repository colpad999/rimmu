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

import axios from 'axios';
const pluginConfig = {
    name: 'rch',
    category: 'tools',
    description: 'Kirim react ke post channel WhatsApp',
    usage: '.rch <link_post> <emoji>',
    example: '.rch https://whatsapp.com/channel/RIMURU_CHANNEL 😂😍',
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
            `\`${m.prefix}rch https://whatsapp.com/channel/RIMURU_CHANNEL 😂\`\n` +
            `\`${m.prefix}rch https://whatsapp.com/channel/RIMURU_CHANNEL 😂😱🔥\``
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
