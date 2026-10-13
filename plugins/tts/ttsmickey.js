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
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
const pluginConfig = {
    name: 'ttsmickey',
    category: 'tts',
    description: 'Text to Speech dengan suara Mickey Mouse',
    usage: '.ttsmickey <text>',
    example: '.ttsmickey Oh boy!',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 15,
    energi: 1,
    isEnabled: true
}

async function convertToOpus(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        const ffmpeg = spawn('ffmpeg', ['-i', inputPath, '-c:a', 'libopus', '-b:a', '64k', '-vbr', 'on', '-compression_level', '10', '-y', outputPath])
        ffmpeg.on('close', (code) => code === 0 ? resolve(true) : reject(new Error(`FFmpeg error`)))
        ffmpeg.on('error', reject)
    })
}

async function handler(m, { sock }) {
    const text = m.text?.trim()
    if (!text) return m.reply(`🐭 *ᴍɪᴄᴋᴇʏ ᴍᴏᴜsᴇ ᴛᴛs*\n\n> Gunakan: \`${m.prefix}ttsmickey <text>\``)
    
    m.react('🐭')
    
    try {
        const res = await axios.get(`https://api.emiliabot.my.id/tools/text-to-speech?text=${encodeURIComponent(text)}`, { timeout: 60000 })
        const voice = res.data?.result?.find(v => v.mickey_mouse && !v.error)
        if (!voice) {
            m.react('❌')
            return m.reply(`❌ Mickey Mouse voice error. Coba TTS lain.`)
        }
        
        const tempDir = path.join(process.cwd(), 'temp')
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })
        
        const wavPath = path.join(tempDir, `tts_${Date.now()}.wav`)
        const opusPath = path.join(tempDir, `tts_${Date.now()}.ogg`)
        
        const audioRes = await axios.get(voice.mickey_mouse, { responseType: 'arraybuffer' })
        fs.writeFileSync(wavPath, Buffer.from(audioRes.data))
        await convertToOpus(wavPath, opusPath)
        
        await sock.sendMessage(m.chat, {
            audio: fs.readFileSync(opusPath),
            mimetype: 'audio/ogg; codecs=opus',
            ptt: true,
            contextInfo: { isForwarded: true, forwardingScore: 999, externalAdReply: { title: '🐭 Mickey Mouse TTS', body: text.substring(0, 50), mediaType: 2 } }
        }, { quoted: m })
        
        fs.unlinkSync(wavPath)
        fs.unlinkSync(opusPath)
        m.react('✅')
    } catch (err) {
        m.react('❌')
        m.reply(`❌ *ᴇʀʀᴏʀ*\n\n> ${err.message}`)
    }
}

export { pluginConfig as config, handler };
