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

import axios from 'axios'
import config from '../../config.js'
import { hasFullAccess, getUserRole, VALID_SERVERS } from '../../src/lib/rimuru-roles-cpanel.js'
import te from '../../src/lib/rimuru-error.js'
const allCommands = VALID_SERVERS.map(v => `serverinfo${v}`)
const allAliases = VALID_SERVERS.map(v => `sinfo${v}`)

const pluginConfig = {
    name: allCommands,
    category: 'panel',
    description: 'Info detail server (v1-v5)',
    usage: '.serverinfov1 serverid',
    example: '.serverinfov2 5',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

function parseServerVersion(cmd) {
    const match = cmd.match(/v([1-5])$/i)
    if (!match) return { server: 'v1', serverKey: 's1' }
    return { server: 'v' + match[1], serverKey: 's' + match[1] }
}

function getServerConfig(pteroConfig, serverKey) {
    const serverConfigs = {
        's1': pteroConfig.server1,
        's2': pteroConfig.server2,
        's3': pteroConfig.server3,
        's4': pteroConfig.server4,
        's5': pteroConfig.server5
    }
    return serverConfigs[serverKey] || null
}

function validateServerConfig(serverConfig) {
    const missing = []
    if (!serverConfig?.domain) missing.push('domain')
    if (!serverConfig?.apikey) missing.push('apikey (PTLA)')
    return missing
}

function getAvailableServers(pteroConfig) {
    const available = []
    for (let i = 1; i <= 5; i++) {
        const cfg = pteroConfig[`server${i}`]
        if (cfg?.domain && cfg?.apikey) available.push(`v${i}`)
    }
    return available
}

function formatBytes(bytes) {
    if (bytes === 0) return 'Unlimited'
    const mb = bytes
    if (mb >= 1000) return `${(mb / 1000).toFixed(1)} GB`
    return `${mb} MB`
}

async function handler(m, { sock }) {
    const pteroConfig = config.pterodactyl
    
    const { server: serverVersion, serverKey } = parseServerVersion(m.command)
    const serverLabel = serverVersion.toUpperCase()
    
    if (!hasFullAccess(m.sender, serverVersion, m.isOwner)) {
        const userRole = getUserRole(m.sender, serverVersion)
        return m.reply(
            `❌ *ᴀᴋsᴇs ᴅɪᴛᴏʟᴀᴋ*\n\n` +
            `> Kamu tidak punya akses ke *${serverLabel}*\n` +
            `> Role kamu: *${userRole || 'Tidak ada'}*`
        )
    }
    
    const serverId = m.text?.trim()
    
    const serverConfig = getServerConfig(pteroConfig, serverKey)
    const missingConfig = validateServerConfig(serverConfig)
    
    if (missingConfig.length > 0) {
        const available = getAvailableServers(pteroConfig)
        let txt = `⚠️ *sᴇʀᴠᴇʀ ${serverLabel} ʙᴇʟᴜᴍ ᴋᴏɴꜰɪɢ*\n\n`
        if (available.length > 0) {
            txt += `> Server tersedia: *${available.join(', ')}*`
        }
        return m.reply(txt)
    }
    
    if (!serverId || isNaN(serverId)) {
        return m.reply(
            `⚠️ *ᴄᴀʀᴀ ᴘᴀᴋᴀɪ*\n\n` +
            `> \`${m.prefix}${m.command} serverid\`\n\n` +
            `> Lihat ID dengan \`${m.prefix}listserver${serverVersion}\``
        )
    }
    
    try {
        const serverRes = await axios.get(`${serverConfig.domain}/api/application/servers/${serverId}`, {
            headers: {
                'Authorization': `Bearer ${serverConfig.apikey}`,
                'Content-Type': 'application/json',
                'Accept': 'Application/vnd.pterodactyl.v1+json'
            }
        })
        
        const s = serverRes.data.attributes
        const limits = s.limits || {}
        const features = s.feature_limits || {}
        
        let txt = `📊 *ɪɴꜰᴏ sᴇʀᴠᴇʀ [${serverLabel}]*\n\n`
        txt += `╭─「 📋 *ᴅᴇᴛᴀɪʟ* 」\n`
        txt += `┃ 🆔 \`ɪᴅ\`: *${s.id}*\n`
        txt += `┃ 📛 \`ɴᴀᴍᴀ\`: *${s.name}*\n`
        txt += `┃ 👤 \`ᴏᴡɴᴇʀ ɪᴅ\`: *${s.user}*\n`
        txt += `┃ 📝 \`ᴅᴇsᴋʀɪᴘsɪ\`: *${s.description || '-'}*\n`
        txt += `┃ 📊 \`sᴛᴀᴛᴜs\`: *${s.suspended ? '⛔ Suspended' : '✅ Active'}*\n`
        txt += `╰───────────────\n\n`
        txt += `╭─「 🧠 *sᴘᴇsɪꜰɪᴋᴀsɪ* 」\n`
        txt += `┃ 💾 \`ʀᴀᴍ\`: *${formatBytes(limits.memory)}*\n`
        txt += `┃ ⚡ \`ᴄᴘᴜ\`: *${limits.cpu === 0 ? 'Unlimited' : limits.cpu + '%'}*\n`
        txt += `┃ 📦 \`ᴅɪsᴋ\`: *${formatBytes(limits.disk)}*\n`
        txt += `┃ 🔄 \`sᴡᴀᴘ\`: *${limits.swap} MB*\n`
        txt += `╰───────────────\n\n`
        txt += `╭─「 📦 *ꜰᴇᴀᴛᴜʀᴇ ʟɪᴍɪᴛs* 」\n`
        txt += `┃ 🗄️ \`ᴅᴀᴛᴀʙᴀsᴇ\`: *${features.databases}*\n`
        txt += `┃ 💾 \`ʙᴀᴄᴋᴜᴘ\`: *${features.backups}*\n`
        txt += `┃ 🔌 \`ᴀʟʟᴏᴄᴀᴛɪᴏɴs\`: *${features.allocations}*\n`
        txt += `╰───────────────`
        
        return m.reply(txt)
        
    } catch (err) {
        return m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }