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

import config from '../../config.js'
import fs from 'fs'
import te from '../../src/lib/rimuru-error.js'
const sadCommands = ['mengkane']
for (let i = 1; i <= 52; i++) {
    sadCommands.push(`mengkane${i}`)
}

const pluginConfig = {
    name: sadCommands,
    category: 'media',
    description: 'Kirim musik mengkane (mengkane1 - mengkane55)',
    usage: '.mengkane1 atau .mengkane55',
    example: '.mengkane1',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const command = m.command?.toLowerCase()
    
    if (command === 'mengkane' || !command.startsWith('mengkane')) {
        return m.reply(
            `🎵 *ᴍᴇɴɢᴋᴀɴᴇ ᴍᴜsɪᴄ*\n\n` +
            `> Tersedia: mengkane1 - mengkane52\n` +
            `> Contoh: \`${m.prefix}mengkane1\``
        )
    }
    
    const num = parseInt(command.replace('mengkane', ''))
    if (isNaN(num) || num < 1 || num > 52) {
        return m.reply(`❌ Pilihan tidak valid. Gunakan mengkane1 sampai mengkane52.`)
    }
    m.react('🕕')
    let sound
    try {
        const fixcmd = command.replace('mengkane', 'mangkane')
        if (num < 25) sound = `https://raw.githubusercontent.com/hyuura/Rest-Sound/main/HyuuraKane/${fixcmd}.mp3`
        if (num > 24) sound = `https://raw.githubusercontent.com/aisyah-rest/mangkane/main/Mangkanenya/${fixcmd}.mp3`
        await sock.sendMedia(m.chat, sound, null, m, {
            type: 'audio',
            mimetype: 'audio/mpeg',
            ptt: false
        })
    } catch (err) {
        console.log(err)
        return m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }