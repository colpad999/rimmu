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
import config from '../../config.js';
const pluginConfig = {
    name: 'wuwasheet',
    category: 'anime',
    description: 'Menampilkan sheet material karakter Wuthering Waves',
    usage: '.wuwa <nama karakter>',
    example: '.wuwa sanhua',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 1,
    isEnabled: true
}

const characters = {
    sanhua: "1102",
    baizhi: "1103",
    lingyang: "1104",
    chixia: "1202",
    encore: "1203",
    mortefi: "1204",
    calcharo: "1301",
    yinlin: "1302",
    yuanwu: "1303",
    yangyang: "1402",
    aalto: "1403",
    jiyan: "1404",
    jianxin: "1405",
    "rover-spectro": "1502",
    verina: "1503",
    taoqi: "1601",
    danjin: "1602",
    "rover-havoc": "1604"
}

async function handler(m, { sock }) {
    const args = m.args || []
    const query = args[0]?.toLowerCase()
    
    if (!query) {
        return m.reply(
            `💕 *ᴡᴜᴛʜᴇʀɪɴɢ ᴡᴀᴠᴇꜱ* 💕\n\n` +
            `╭━━━━━━━━━━━━━━━━━━━━━⬣\n` +
            `┃ ✦ *Cara Pakai*\n` +
            `┃\n` +
            `┃   ${m.prefix}wuwa <nama karakter>\n` +
            `┃\n` +
            `┃ ✦ *Contoh*\n` +
            `┃\n` +
            `┃   ${m.prefix}wuwa sanhua\n` +
            `┃   ${m.prefix}wuwa jiyan\n` +
            `┃\n` +
            `┃ ✦ *List Karakter*\n` +
            `┃\n` +
            `╰━━━━━━━━━━━━━━━━━━━━━⬣\n` +
            `╭━━━━━━━━━━━━━━━━━━━━━⬣\n` +
            `┃ ${Object.keys(characters).join('\n┃ ')}\n` +
            `╰━━━━━━━━━━━━━━━━━━━━━⬣`
        )
    }
    
    m.react('💕')
    await m.reply(`⏳ *ᴘʀᴏᴄᴇꜱꜱɪɴɢ...*\n\n💗 *Rimuru:* Lagi nyari sheet ${query} darling~ tunggu sebentar yaa 🎮`)
    
    try {
        const charId = characters[query]
        
        if (!charId) {
            return m.reply(
                `💔 *ᴛɪᴅᴀᴋ ᴅɪᴛᴇᴍᴜᴋᴀɴ*\n\n` +
                `> Karakter *${query}* tidak ditemukan darling~\n\n` +
                `> *List Karakter:*\n${Object.keys(characters).join('\n• ')}`
            )
        }
        
        const url = `https://raw.githubusercontent.com/DEViantUA/wuthering-waves-elevation-materials/main/character/${charId}.png`
        const response = await axios.get(url, { responseType: 'arraybuffer' })
        
        if (response.status !== 200) {
            throw new Error('Gagal mengambil gambar')
        }
        
        const imageBuffer = Buffer.from(response.data)
        
        await sock.sendMessage(m.chat, {
            image: imageBuffer,
            caption: `💕 *ᴡᴜᴛʜᴇʀɪɴɢ ᴡᴀᴠᴇꜱ* 💕\n\n` +
                    `╭━━━━━━━━━━━━━━━━━━━━━⬣\n` +
                    `┃ ✦ *ᴋᴀʀᴀᴋᴛᴇʀ*: ${query.toUpperCase()}\n` +
                    `┃ ✦ *ɪᴅ*: ${charId}\n` +
                    `┃\n` +
                    `┃ 💗 *Rimuru:* Ini sheet materialnya darling~ 🎮\n` +
                    `╰━━━━━━━━━━━━━━━━━━━━━⬣`
        }, { quoted: m })
        
        m.react('✅')
        
    } catch (err) {
        console.error('[WuWa] Error:', err)
        m.react('💔')
        return m.reply(
            `💔 *ᴇʀʀᴏʀ*\n\n` +
            `> ${err.message}\n\n` +
            `> Coba lagi ya darling~ 🥺`
        )
    }
}

export { pluginConfig as config, handler };
