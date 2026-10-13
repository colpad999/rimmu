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

const pluginConfig = {
    name: 'sulap',
    category: 'fun',
    description: 'Pertunjukan sulap - kick member secara dramatis',
    usage: '.sulap',
    example: '.sulap',
    isOwner: false,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    cooldown: 60,
    energi: 0,
    isEnabled: true,
    isAdmin: true,
    isBotAdmin: true
}

if (!global.sulapSessions) global.sulapSessions = new Map()

const successLines = [
    '💨 *POOF!* Dan... dia menghilang!',
    '🌟 Sulap berhasil! Sampai jumpa lagi~',
    '✨ Absen dulu ya, ditunggu berikutnya!',
    '🎪 Pertunjukan selesai! 👏'
]

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function handler(m, { sock }) {
    await m.react('🎩')

    const sent = await m.reply(`🎩✨ *ᴘᴇʀᴛᴜɴᴊᴜᴋᴀɴ sᴜʟᴀᴘ*\n\n` +
            `Siapa yang ingin dihilangkan?\n\n` +
            `> Reply pesan ini + mention orangnya`)

    global.sulapSessions.set(sent.key.id, {
        admin: m.sender,
        chat: m.chat,
        timestamp: Date.now()
    })

    setTimeout(() => {
        global.sulapSessions.delete(sent.key.id)
    }, 120000)
}

async function replyHandler(m, sock) {
    if (!m.quoted) return false

    const quotedId = m.quoted?.id || m.quoted?.key?.id
    if (!quotedId) return false

    const session = global.sulapSessions.get(quotedId)
    if (!session) return false
    if (session.chat !== m.chat) return false
    if (session.admin !== m.sender) return false

    let targetJid = null
    if (m.mentionedJid?.[0]) {
        targetJid = m.mentionedJid[0]
    } else if (m.quoted?.sender && m.quoted.sender !== sock.user?.id) {
        return false
    }

    if (!targetJid) {
        await sock.sendMessage(m.chat, { text: '❌ Mention orangnya dong!' }, { quoted: m })
        return true
    }

    global.sulapSessions.delete(quotedId)

    const targetNumber = targetJid.split('@')[0]
    const botNumber = sock.user?.id?.split(':')[0]
    const senderNumber = m.sender.split('@')[0]

    if (targetNumber === botNumber) {
        await sock.sendMessage(m.chat, { text: '🎭 Bot tidak bisa menghilangkan dirinya sendiri!' })
        return true
    }

    if (targetJid === m.sender) {
        await sock.sendMessage(m.chat, { text: '🎭 Tidak bisa menghilangkan diri sendiri!' })
        return true
    }

    try {
        const groupMeta = m.groupMetadata
        const target = groupMeta.participants.find(p =>
            p.jid === targetJid || p.jid?.includes(targetNumber)
        )

        if (!target) {
            await sock.sendMessage(m.chat, { text: '👻 Orang itu tidak ada di grup!' })
            return true
        }

        if (['admin', 'superadmin'].includes(target.admin)) {
            await sock.sendMessage(m.chat, { text: '🛡️ Admin kebal terhadap sihir!' })
            return true
        }

        await sock.sendMessage(m.chat, {
            text: `🪄 *Bersiaplah @${targetNumber}...* ✨`,
            mentions: [targetJid]
        })

        await sleep(2000)

        await sock.groupParticipantsUpdate(m.chat, [targetJid], 'remove')

        const line = successLines[Math.floor(Math.random() * successLines.length)]
        await sock.sendMessage(m.chat, {
            text: `${line}\n\n` +
                `🎯 @${targetNumber} telah menghilang!\n` +
                `🎩 Pesulap: @${senderNumber}\n\n` +
                `> _Pertunjukan selesai~_ ✨`,
            mentions: [targetJid, m.sender]
        })

    } catch (error) {
        await sock.sendMessage(m.chat, { text: `😅 Sulapnya gagal...\n\n> ${error.message}` })
    }

    return true
}

export { pluginConfig as config, handler, replyHandler }