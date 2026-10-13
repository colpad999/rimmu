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

import fs from 'fs';
import path from 'path';
import config from '../../config.js';
const pluginConfig = {
    name: 'getaudio',
    category: 'owner',
    description: 'Ambil file MP3/Audio dari folder assets/audio',
    usage: '.getmp3 <nama_file.mp3>',
    example: '.getmp3 zerotwo.mp3',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const args = m.args || []
    const fileName = args[0]?.trim()
    
    if (!fileName) {
        return m.reply(
            `💕 *ɢᴇᴛ ᴍᴘ3* 💕\n\n` +
            `╭━━━━━━━━━━━━━━━━━━━━━⬣\n` +
            `┃ ✦ *Cara Pakai*\n` +
            `┃\n` +
            `┃   ${m.prefix}getmp3 <nama_file.mp3>\n` +
            `┃\n` +
            `┃ ✦ *Contoh*\n` +
            `┃\n` +
            `┃   ${m.prefix}getmp3 zerotwo.mp3\n` +
            `┃\n` +
            `┃ ✦ *Lihat daftar file*\n` +
            `┃   ${m.prefix}listmp3\n` +
            `╰━━━━━━━━━━━━━━━━━━━━━⬣\n\n` +
            `💗 *Rimuru:* Mau ambil audio apa darling~?`
        )
    }
    
    m.react('💕')
    
    try {
        const audioPath = path.join(process.cwd(), 'assets', 'audio', fileName)
        
        if (!fs.existsSync(audioPath)) {
            m.react('💔')
            return m.reply(
                `💔 *ᴇʀʀᴏʀ*\n\n` +
                `> File *${fileName}* tidak ditemukan di folder assets/audio darling~\n\n` +
                `> Ketik *${m.prefix}listmp3* untuk lihat daftar file yang tersedia 🥺`
            )
        }
        
        const audioBuffer = fs.readFileSync(audioPath)
        const fileSizeMB = (audioBuffer.length / (1024 * 1024)).toFixed(2)
        
        await sock.sendMessage(m.chat, {
            audio: audioBuffer,
            mimetype: 'audio/mpeg',
            ptt: false,
            fileName: fileName
        }, { quoted: m })
        
        m.react('✅')
        
        await m.reply(
            `💕 *ɢᴇᴛ ᴍᴘ3* 💕\n\n` +
            `╭━━━━━━━━━━━━━━━━━━━━━⬣\n` +
            `┃ ✅ *ʙᴇʀʜᴀꜱɪʟ*\n` +
            `┃\n` +
            `┃ 🎵 *ɴᴀᴍᴇ*: ${fileName}\n` +
            `┃ 📦 *ᴜᴋᴜʀᴀɴ*: ${fileSizeMB} MB\n` +
            `┃\n` +
            `┃ 💗 *Rimuru:* Ini dia audio nya darling~ 🎶\n` +
            `╰━━━━━━━━━━━━━━━━━━━━━⬣`
        )
        
    } catch (err) {
        console.error('[GetMP3] Error:', err)
        m.react('💔')
        return m.reply(
            `💔 *ᴇʀʀᴏʀ*\n\n` +
            `> ${err.message}\n\n` +
            `> Coba lagi ya darling~ 🥺`
        )
    }
}

export { pluginConfig as config, handler };
