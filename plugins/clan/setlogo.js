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
import { getDatabase } from '../../src/lib/rimuru-database.js';
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const pluginConfig = {
    name: 'setlogo',
    category: 'clan',
    description: 'Set logo clan (reply gambar)',
    usage: '.clanlogo (reply gambar)',
    example: '.clanlogo',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 20,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const db = getDatabase()
    const user = db.getUser(m.sender)
    
    if (!user.clanId) {
        return m.reply(`❌ Kamu belum punya clan!\n> Buat clan dengan *.clancreate*`)
    }
    
    const clan = db.db.data.clans[user.clanId]
    if (!clan) {
        return m.reply(`❌ Clan tidak ditemukan!`)
    }
    
    if (clan.leader !== m.sender) {
        return m.reply(`❌ Hanya *leader* clan yang bisa set logo!`)
    }
    
    if (!m.quoted || !m.quoted.message?.imageMessage) {
        return m.reply(`🖼️ *ᴄʟᴀɴ ʟᴏɢᴏ*\n\n> Reply gambar yang ingin dijadikan logo clan!\n\n> Contoh: reply gambar lalu ketik .clanlogo`)
    }
    
    await m.reply('⏳ *Mengupload logo clan...*')
    
    const media = await m.quoted.download()
    const logoDir = path.join(__dirname, '../../temp/clan_logo')
    
    if (!fs.existsSync(logoDir)) {
        fs.mkdirSync(logoDir, { recursive: true })
    }
    
    const logoPath = path.join(logoDir, `${clan.id}.jpg`)
    fs.writeFileSync(logoPath, media)
    
    if (!clan.logo) clan.logo = {}
    clan.logo.url = logoPath
    clan.logo.updatedAt = new Date().toISOString()
    await db.save()
    
    let txt = `🖼️ *ᴄʟᴀɴ ʟᴏɢᴏ ᴜᴘᴅᴀᴛᴇᴅ!*\n\n`
    txt += `╭┈┈⬡「 📋 *ʜᴀꜱɪʟ* 」\n`
    txt += `┃ 📛 Clan: *${clan.name}*\n`
    txt += `┃ 🖼️ Logo baru berhasil disimpan!\n`
    txt += `┃ 👑 Leader: @${m.sender.split('@')[0]}\n`
    txt += `╰┈┈┈┈┈┈┈┈⬡`
    
    await m.reply(txt, { mentions: [m.sender] })
}

export { pluginConfig as config, handler };
