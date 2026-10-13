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

import { getDatabase } from '../../src/lib/rimuru-database.js';
const pluginConfig = {
    name: 'setdelay',
    category: 'owner',
    description: 'Mengatur delay respon bot (cooldown global)',
    usage: '.setdelay <detik>',
    example: '.setdelay 3',
    isOwner: true,
    cooldown: 5,
    isEnabled: true
}

async function handler(m, { db }) {
    const args = m.args || []
    const delayInput = args[0]
    
    // Validasi input
    if (!delayInput) {
        const currentDelay = db.setting('botDelay') || 0
        return m.reply(
`╭───〔 𝗦𝗘𝗧𝗗𝗘𝗟𝗔𝗬 〕───⬣
│
│ ✦ *Cara Pakai*
│
│  𖦹 .setdelay <detik>
│
│ ✦ *Contoh*
│
│  𖦹 .setdelay 3  (delay 3 detik)
│  𖦹 .setdelay 0  (tanpa delay)
│
│ ✦ *Status Saat Ini*
│
│  ⏱️ ᴅᴇʟᴀʏ: ${currentDelay} ᴅᴇᴛɪᴋ
│
╰──────────────────⬣`
        )
    }
    
    const delay = parseInt(delayInput)
    
    if (isNaN(delay) || delay < 0) {
        return m.reply(`❌ *ᴇʀʀᴏʀ*\n\n> Delay harus berupa angka positif!`)
    }
    
    if (delay > 60) {
        return m.reply(`⚠️ *ᴘᴇʀɪɴɢᴀᴛᴀɴ*\n\n> Delay maksimal 60 detik!`)
    }
    
    m.react('⏳')
    
    // Simpan ke database
    db.setting('botDelay', delay)
    
    m.react('✅')
    
    return m.reply(
`╭───〔 𝗦𝗘𝗧𝗗𝗘𝗟𝗔𝗬 〕───⬣
│
│ ✦ *ᴅᴇʟᴀʏ ʙᴇʀʜᴀꜱɪʟ ᴅɪᴜʙᴀʜ*
│
│  ⏱️ ᴅᴇʟᴀʏ ʟᴀᴍᴀ: \`${db.setting('botDelayBefore') || 0}\` ᴅᴇᴛɪᴋ
│  ⏱️ ᴅᴇʟᴀʏ ʙᴀʀᴜ: \`${delay}\` ᴅᴇᴛɪᴋ
│
│ ✦ *ᴘᴇɴɢᴀʀᴜʜ*
│
│  ${delay === 0 ? '✅ Bot akan langsung respon tanpa delay' : `⏳ Bot akan delay ${delay} detik sebelum merespon`}
│
╰──────────────────⬣`
    )
}

export { pluginConfig as config, handler };
