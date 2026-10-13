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

import { logger } from './rimuru-logger.js'
const INACTIVE_THRESHOLD = 14 * 24 * 60 * 60 * 1000
const PRUNE_INTERVAL = 6 * 60 * 60 * 1000

let prunerTimer = null

function startDailyPruner() {
    if (prunerTimer) return

    prunerTimer = setInterval(() => {
        try {
            
            const db = getDatabase()
            if (!db || !db.db?.data) return

            const now = Date.now()
            const threshold = now - INACTIVE_THRESHOLD
            let prunedUsers = 0
            let prunedGroups = 0

            const users = db.db.data.users
            if (users && typeof users === 'object') {
                for (const [jid, user] of Object.entries(users)) {
                    const isProtected =
                        user.premium ||
                        user.owner ||
                        user.partner ||
                        user.banned

                    if (!isProtected && user.lastSeen && user.lastSeen < threshold) {
                        delete users[jid]
                        prunedUsers++
                    }
                }
            }

            const groups = db.db.data.groups
            if (groups && typeof groups === 'object') {
                for (const [jid, group] of Object.entries(groups)) {
                    if (group.lastActivity && group.lastActivity < threshold) {
                        delete groups[jid]
                        prunedGroups++
                    }
                }
            }

            if (prunedUsers > 0 || prunedGroups > 0) {
                db.save()
                logger.system('pruner', `removed ${prunedUsers} users, ${prunedGroups} groups (>${INACTIVE_THRESHOLD / 86400000}d inactive)`)
            }
        } catch (error) {
            logger.error('pruner', error.message)
        }
    }, PRUNE_INTERVAL)

    if (prunerTimer.unref) prunerTimer.unref()
    logger.success('pruner', `Pembersih data usang jalan (> ${INACTIVE_THRESHOLD / 86400000} hari nonaktif, tiap ${PRUNE_INTERVAL / 3600000} jam)`)
}

function stopDailyPruner() {
    if (prunerTimer) {
        clearInterval(prunerTimer)
        prunerTimer = null
    }
}

export { startDailyPruner, stopDailyPruner }