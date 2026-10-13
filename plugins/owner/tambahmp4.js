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
    name: 'tambahmp4',
    category: 'owner',
    description: 'Tambah video baru ke folder assets/video',
    usage: '.addmp4 <nama_file.mp4> (reply video)',
    example: '.addmp4 opening.mp4',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const args = m.args || []
    const fileName = args[0]?.trim()
    
    // Cek ekstensi file (bisa .mp4, .mkv, .mov, .avi, .webm)
    const validExtensions = ['.mp4', '.mkv', '.mov', '.avi', '.webm', '.m4v']
    const isValidExt = validExtensions.some(ext => fileName?.toLowerCase().endsWith(ext))
    
    if (!fileName || !isValidExt) {
        return m.reply(`❌ Gunakan: .addmp4 <nama_file.mp4>\nContoh: .addmp4 opening.mp4\n\n📌 *Ekstensi yang didukung:* ${validExtensions.join(', ')}`)
    }
    
    const isVideo = m.isVideo || (m.quoted && m.quoted.type === 'videoMessage')
    
    if (!isVideo) {
        return m.reply(`🎥 Reply video yang ingin ditambahkan.`)
    }
    
    try {
        let buffer
        if (m.quoted && m.quoted.isMedia) {
            buffer = await m.quoted.download()
        } else if (m.isMedia) {
            buffer = await m.download()
        }
        
        if (!buffer) {
            return m.reply(`❌ Gagal mendownload video`)
        }
        
        const targetPath = path.join(process.cwd(), 'assets', 'video', fileName)
        const dir = path.dirname(targetPath)
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
        
        fs.writeFileSync(targetPath, buffer)
        
        // Dapatkan ukuran file
        const fileSizeMB = (buffer.length / (1024 * 1024)).toFixed(2)
        
        m.reply(`✅ *ʙᴇʀʜᴀsɪʟ*\n> Video telah tersimpan sebagai assets/video/${fileName}\n> 📦 Ukuran: ${fileSizeMB} MB\n> Restart bot untuk melihat perubahan jika perlu.`)
        
    } catch (err) {
        m.reply(`❌ *ᴇʀʀᴏʀ*\n> ${err.message}`)
    }
}

export { pluginConfig as config, handler };
