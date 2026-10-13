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

import { getParticipantJid } from '../../src/lib/rimuru-lid.js'
import { isOwner } from '../../config.js'
import te from '../../src/lib/rimuru-error.js'

const pluginConfig = {
    name: 'tukaradmin',
    category: 'group',
    description: 'Menghapus semua admin saat ini dan menjadikan owner bot sebagai admin tunggal',
    usage: '.swapadmin',
    example: '.swapadmin',
    isOwner: true,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    isAdmin: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true,
    isBotAdmin: true
}

async function handler(m, { sock }) {
    try {
        await m.react("🕕")
        
        const groupMeta = m.groupMetadata
        const participants = groupMeta.participants
        const groupCreator = groupMeta.owner || groupMeta.subjectOwner || null
        
        const botJid = sock.user.id.split(':')[0] + '@s.whatsapp.net'
        
        let currentAdmins = []
        let ownersInGroup = []
        
        for (const p of participants) {
            const jid = getParticipantJid(p)
            
            if (p.admin === 'admin' || p.admin === 'superadmin') {
                currentAdmins.push(jid)
            }
            
            if (isOwner(jid)) {
                ownersInGroup.push(jid)
            }
        }
        
        if (ownersInGroup.length === 0) {
            await m.reply(
                `❌ *ɢᴀɢᴀʟ ᴍᴇʟᴀᴋᴜᴋᴀɴ ꜱᴡᴀᴘ ᴀᴅᴍɪɴ*\n\n` +
                `Halo! Maaf banget ya, fitur ini tidak bisa dijalankan karena *tidak ada satupun Owner bot* yang terdeteksi di dalam grup ini.\n\n` +
                `Fitur ini membutuhkan minimal satu Owner bot yang berada di grup untuk dijadikan admin baru setelah semua admin lama diturunkan.`
            )
            return
        }
        
        let toDemote = []
        for (const adminJid of currentAdmins) {
            if (adminJid === botJid) continue
            if (adminJid === groupCreator) continue
            
            const participantData = participants.find(p => getParticipantJid(p) === adminJid)
            if (participantData && participantData.admin === 'superadmin') continue
            
            if (ownersInGroup.includes(adminJid)) continue
            
            toDemote.push(adminJid)
        }
        
        let toPromote = []
        for (const ownerJid of ownersInGroup) {
            if (!currentAdmins.includes(ownerJid)) {
                toPromote.push(ownerJid)
            }
        }
        
        if (toDemote.length > 0) {
            await sock.groupParticipantsUpdate(m.chat, toDemote, 'demote')
        }
        
        if (toPromote.length > 0) {
            await sock.groupParticipantsUpdate(m.chat, toPromote, 'promote')
        }
        
        let replyText = `✅ *ꜱᴡᴀᴘ ᴀᴅᴍɪɴ ʙᴇʀʜᴀꜱɪʟ ᴅɪʟᴀᴋᴜᴋᴀɴ*\n\n`
        replyText += `Halo semuanya! Sistem telah berhasil melakukan perombakan admin di grup ini sesuai dengan perintah. Berikut adalah detail perubahan admin yang baru saja terjadi:\n\n`
        
        if (toDemote.length > 0) {
            replyText += `*Admin Yang Diturunkan:*\n`
            toDemote.forEach(v => {
                replyText += `- @${v.split('@')[0]}\n`
            })
            replyText += `\n`
        } else {
            replyText += `*Admin Yang Diturunkan:*\n- Tidak ada admin yang diturunkan\n\n`
        }
        
        replyText += `*Owner Yang Menjadi Admin:*\n`
        ownersInGroup.forEach(v => {
            replyText += `- @${v.split('@')[0]}\n`
        })
        
        replyText += `\nSebagai informasi tambahan, *Pembuat Grup* dan *Bot* tidak diturunkan dari jabatannya karena aturan sistem yang melindunginya. Terima kasih atas pengertiannya!`
        
        await m.reply(replyText, { mentions: [...toDemote, ...ownersInGroup] })
        
    } catch (error) {
        m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }
