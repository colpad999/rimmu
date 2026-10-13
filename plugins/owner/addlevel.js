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

import { getDatabase } from '../../src/lib/rimuru-database.js'
import { calculateLevel, getRole, checkAndNotifyLevelUp } from './../../src/lib/rimuru-level.js'

const pluginConfig = {
    name: 'addlevel',
    category: 'owner',
    description: 'Tambah level user (via exp)',
    usage: '.addlevel <jumlah> @user',
    example: '.addlevel 5 @user',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

function extractTarget(m) {
    if (m.quoted) return m.quoted.sender
    if (m.mentionedJid?.length) return m.mentionedJid[0]
    return null
}

async function handler(m, { sock }) {
    const db = getDatabase()
    const args = m.args
    
    const numArg = args.find(a => !isNaN(a) && !a.startsWith('@'))
    let levels = parseInt(numArg) || 0
    
    let targetJid = extractTarget(m)
    
    if (!targetJid && levels > 0) {
        targetJid = m.sender
    }
    
    if (!targetJid || levels <= 0) {
        return m.reply(
            `📊 *ADD LEVEL*\n\n` +
            `Sistem untuk menambahkan level kepada member secara instan.\n\n` +
            `*PENGGUNAAN:*\n` +
            `- *${m.prefix}addlevel <jumlah>* — (ke diri sendiri)\n` +
            `- *${m.prefix}addlevel <jumlah> @user* — (ke orang lain)\n\n` +
            `*CONTOH PENGGUNAAN:*\n` +
            `- *${m.prefix}addlevel 5*\n` +
            `- *${m.prefix}addlevel 10 @user*`
        )
    }
    
    await m.react('🕕')
    
    const user = db.getUser(targetJid) || db.setUser(targetJid, {})
    if (!user.rpg) user.rpg = {}
    
    const expToAdd = levels * 10000
    
    const oldExp = user.exp || 0
    const newExp = db.updateExp(targetJid, expToAdd)
    user.exp = newExp
    
    const mockM = { ...m, sender: targetJid, pushName: m.pushName }
    const addResult = await checkAndNotifyLevelUp(sock, mockM, db, user, oldExp, newExp)
    
    db.setUser(targetJid, user)
    
    await m.react('✅')
    
    const finalLevel = addResult.newLevel || calculateLevel(user.exp)
    
    await m.reply(
        `✅ *BERHASIL MENAMBAH LEVEL*\n\n` +
        `Level milik *@${targetJid.split('@')[0]}* telah sukses ditambahkan sebanyak *${levels} Level*.\n\n` +
        `*Statistik Terkini:*\n` +
        `- Level Sekarang: *${finalLevel}*\n` +
        `- Role Saat Ini: *${getRole(finalLevel)}*\n` +
        `- Total XP: *${user.exp.toLocaleString()}* XP`,
        { mentions: [targetJid] }
    )
}

export { pluginConfig as config, handler }