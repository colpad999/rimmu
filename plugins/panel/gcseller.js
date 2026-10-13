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
import { isLid, lidToJid } from '../../src/lib/rimuru-lid.js'
const CPANEL_DIR = path.join(process.cwd(), 'database', 'cpanel')
const VALID_SERVERS = ['v1', 'v2', 'v3', 'v4', 'v5']

function ensureDir() {
    if (!fs.existsSync(CPANEL_DIR)) {
        fs.mkdirSync(CPANEL_DIR, { recursive: true })
    }
}

function getFilePath(version) {
    return path.join(CPANEL_DIR, `gcseller_${version}.json`)
}

function loadGcSeller(version) {
    ensureDir()
    const filePath = getFilePath(version)
    if (!fs.existsSync(filePath)) return null
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'))
    } catch {
        return null
    }
}

function saveGcSeller(version, groupJid) {
    ensureDir()
    fs.writeFileSync(getFilePath(version), JSON.stringify(groupJid), 'utf8')
}

function isGcSeller(chatJid, version) {
    if (!chatJid?.endsWith('@g.us')) return false
    return loadGcSeller(version) === chatJid
}

function getGcSellerVersion(chatJid) {
    if (!chatJid?.endsWith('@g.us')) return null
    for (const ver of VALID_SERVERS) {
        if (loadGcSeller(ver) === chatJid) return ver
    }
    return null
}

const allCommands = []
VALID_SERVERS.forEach(ver => {
    allCommands.push(`addgcseller${ver}`, `resetgcseller${ver}`)
})

const pluginConfig = {
    name: allCommands,
    category: 'panel',
    description: 'Daftarkan grup sebagai GC Seller panel (akses command create server)',
    usage: '.addgcsellerv1 (di dalam grup)',
    example: '.addgcsellerv1',
    isOwner: true,
    isGroup: true,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

function hasAccess(senderJid, isOwner) {
    if (isOwner) return true
    let jid = senderJid
    if (isLid(jid)) jid = lidToJid(jid)
    const number = jid?.replace(/@.*$/, '')
    const ownerPanels = config.pterodactyl?.ownerPanels || []
    return ownerPanels.includes(number)
}

function parseCommand(cmd) {
    const match = cmd.match(/^(addgcseller|resetgcseller)(v[1-5])$/i)
    if (!match) return null
    return {
        action: match[1].toLowerCase().startsWith('add') ? 'add' : 'reset',
        version: match[2].toLowerCase()
    }
}

function handler(m) {
    const parsed = parseCommand(m.command)
    if (!parsed) return m.reply('❌ Command tidak valid.')

    if (!hasAccess(m.sender, m.isOwner)) {
        return m.reply('❌ *ᴀᴋsᴇs ᴅɪᴛᴏʟᴀᴋ*\n\n> Fitur ini hanya untuk Owner atau Owner Panel.')
    }

    const { action, version } = parsed
    const serverLabel = version.toUpperCase()

    if (action === 'add') {
        const current = loadGcSeller(version)
        if (current === m.chat) {
            return m.reply(`❌ Grup ini sudah terdaftar sebagai GC Seller *${serverLabel}*.`)
        }

        saveGcSeller(version, m.chat)
        m.react('✅')

        let txt = `✅ *ɢᴄ sᴇʟʟᴇʀ ${serverLabel} ᴅɪᴛᴀᴍʙᴀʜᴋᴀɴ*\n\n`
        txt += `╭┈┈⬡「 📋 *ᴅᴇᴛᴀɪʟ* 」\n`
        txt += `┃ 🖥️ sᴇʀᴠᴇʀ: \`${serverLabel}\`\n`
        txt += `┃ 👥 ɢʀᴜᴘ: \`${m.groupName || m.chat}\`\n`
        txt += `┃ 🔓 ᴀᴋsᴇs: \`1gb${version}\` - \`10gb${version}\`, \`unli${version}\`\n`
        if (current) {
            txt += `┃ ⚠️ ᴘʀᴇᴠ: \`${current}\` (diganti)\n`
        }
        txt += `╰┈┈⬡\n\n`
        txt += `> Semua member grup ini sekarang bisa create server ${serverLabel}.`
        return m.reply(txt)
    }

    if (action === 'reset') {
        const current = loadGcSeller(version)
        if (!current) {
            return m.reply(`❌ Belum ada GC Seller terdaftar untuk *${serverLabel}*.`)
        }

        saveGcSeller(version, null)
        m.react('✅')
        return m.reply(
            `✅ *ɢᴄ sᴇʟʟᴇʀ ${serverLabel} ᴅɪʀᴇsᴇᴛ*\n\n` +
            `> Grup: \`${current}\`\n` +
            `> Server *${serverLabel}* tidak lagi terhubung ke grup manapun.`
        )
    }
}

export { pluginConfig as config, handler, loadGcSeller, saveGcSeller, isGcSeller, getGcSellerVersion, VALID_SERVERS }