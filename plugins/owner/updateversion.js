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
import { RIMURU_CORE_CONFIG } from "../../config.js";
import config from '../../config.js';
const pluginConfig = {
    name: 'updateversion',
    category: 'owner',
    description: 'Update versi bot di config.js',
    usage: '.setversi <versi_baru>',
    example: '.setversi 2.5.1',
    isOwner: true,
    cooldown: 5,
    isEnabled: true
}

async function handler(m) {
    const args = m.args || []
    const newVersion = args[0]
    
    // Validasi format versi (semver: x.x.x atau x.x)
    const versionRegex = /^\d+(\.\d+){1,2}$/
    
    if (!newVersion || !versionRegex.test(newVersion)) {
        return m.reply(
`╭───〔 𝗦𝗘𝗧𝗩𝗘𝗥𝗦𝗜 〕───⬣
│
│ ✦ *Cara Pakai*
│
│  𖦹 .setversi <versi_baru>
│
│ ✦ *Contoh*
│
│  𖦹 .setversi 2.5.1
│  𖦹 .setversi 3.0.0
│
│ ✦ *Format*
│
│  𖦹 x.x.x atau x.x
│
╰──────────────────⬣`
        )
    }
    
    m.react('⏳')
    
    try {
        const configPath = path.join(process.cwd(), 'config.js')
        
        if (!fs.existsSync(configPath)) {
            throw new Error('File config.js tidak ditemukan!')
        }
        
        // Baca file config.js
        let configContent = fs.readFileSync(configPath, 'utf8')
        
        // Cari versi lama
        const oldVersionMatch = configContent.match(/version:\s*['"`]([^'"`]+)['"`]/)
        const oldVersion = oldVersionMatch ? oldVersionMatch[1] : 'tidak diketahui'
        
        // Ganti versi dengan regex
        const newConfigContent = configContent.replace(
            /(version:\s*['"`])[^'"`]+(['"`])/,
            `$1${newVersion}$2`
        )
        
        // Tulis kembali ke config.js
        fs.writeFileSync(configPath, newConfigContent, 'utf8')
        
        // Update config yang sudah di-require
        if (config.bot) {
            RIMURU_CORE_CONFIG.bot.version = newVersion
        }
        
        m.react('✅')
        
        return m.reply(
`╭───〔 𝗦𝗘𝗧𝗩𝗘𝗥𝗦𝗜 〕───⬣
│
│ ✦ *ᴠᴇʀꜱɪ ʙᴇʀʜᴀꜱɪʟ ᴅɪᴜʙᴀʜ*
│
│  🗑️ ᴠᴇʀꜱɪ ʟᴀᴍᴀ: \`${oldVersion}\`
│  ✨ ᴠᴇʀꜱɪ ʙᴀʀᴜ: \`${newVersion}\`
│
│ ✦ *ᴄᴀᴛᴀᴛᴀɴ*
│
│  💾 ʀᴇꜱᴛᴀʀᴛ ʙᴏᴛ ᴊɪᴋᴀ ᴘᴇʀʟᴜ
│
╰──────────────────⬣`
        )
        
    } catch (error) {
        console.error('[SetVersi] Error:', error)
        m.react('❌')
        return m.reply(
`╭───〔 𝗘𝗥𝗥𝗢𝗥 〕───⬣
│
│ ❌ *ɢᴀɢᴀʟ ᴍᴇɴɢᴜʙᴀʜ ᴠᴇʀꜱɪ*
│
│ > ${error.message}
│
╰──────────────────⬣`
        )
    }
}

export { pluginConfig as config, handler };
