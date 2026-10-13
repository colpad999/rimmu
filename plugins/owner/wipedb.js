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

import fs from 'fs'
import path from 'path'
import config from '../../config.js'
import { getDatabase } from '../../src/lib/rimuru-database.js'
import te from '../../src/lib/rimuru-error.js'
const pluginConfig = {
    name: 'wipedb',
    category: 'owner',
    description: 'Reset semua data database',
    usage: '.resetdb [confirm]',
    example: '.resetdb confirm',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 60,
    energi: 0,
    isEnabled: true
}

if (!global.resetDbPending) global.resetDbPending = {}

async function handler(m, { sock }) {
    if (!config.isOwner(m.sender)) {
        return m.reply('❌ *Owner Only!*')
    }
    
    const confirm = m.args?.[0]?.toLowerCase()
    
    if (confirm !== 'confirm') {
        global.resetDbPending[m.sender] = Date.now()
        
        return m.reply(
            `⚠️ *ᴘᴇʀɪɴɢᴀᴛᴀɴ!*\n\n` +
            `> Ini akan menghapus SEMUA data:\n` +
            `> • Data user\n` +
            `> • Data group\n` +
            `> • Data clan\n` +
            `> • Semua statistik\n\n` +
            `╭┈┈⬡「 ⚠️ *ᴋᴏɴғɪʀᴍᴀsɪ* 」\n` +
            `┃ Ketik: *.resetdb confirm*\n` +
            `┃ dalam 60 detik\n` +
            `╰┈┈┈┈┈┈┈┈⬡\n\n` +
            `> ❌ Aksi ini TIDAK BISA dibatalkan!`
        )
    }
    
    const pending = global.resetDbPending[m.sender]
    if (!pending || (Date.now() - pending) > 60000) {
        delete global.resetDbPending[m.sender]
        return m.reply(`❌ Timeout! Ketik *.resetdb* ulang untuk memulai.`)
    }
    
    delete global.resetDbPending[m.sender]
    
    try {
        const dbPath = path.join(process.cwd(), 'database', 'db.json')
        const backupPath = path.join(process.cwd(), 'database', `db_backup_${Date.now()}.json`)
        
        if (fs.existsSync(dbPath)) {
            fs.copyFileSync(dbPath, backupPath)
        }
        
        const db = getDatabase()
        
        let userCount = 0
        let groupCount = 0
        let clanCount = 0
        
        if (db.db?.data?.users) {
            userCount = Object.keys(db.db.data.users).length
            db.db.data.users = {}
        }
        
        if (db.db?.data?.groups) {
            groupCount = Object.keys(db.db.data.groups).length
            db.db.data.groups = {}
        }
        
        if (db.db?.data?.clans) {
            clanCount = Object.keys(db.db.data.clans).length
            db.db.data.clans = {}
        }
        
        await db.save()
        
        await m.reply(
            `✅ *ᴅᴀᴛᴀʙᴀsᴇ ᴅɪʀᴇsᴇᴛ!*\n\n` +
            `╭┈┈⬡「 📊 *ᴅᴀᴛᴀ ᴅɪʜᴀᴘᴜs* 」\n` +
            `┃ 👤 Users: ${userCount}\n` +
            `┃ 👥 Groups: ${groupCount}\n` +
            `┃ ⚔️ Clans: ${clanCount}\n` +
            `╰┈┈┈┈┈┈┈┈⬡\n\n` +
            `> Backup disimpan di:\n` +
            `> \`${path.basename(backupPath)}\``
        )
        
    } catch (error) {
        await m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }