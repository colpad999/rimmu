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

import te from '../../src/lib/rimuru-error.js'
import config from '../../config.js'

const pluginConfig = {
    name: 'esmconvert',
    category: 'tools',
    description: 'Convert ESM (ES Modules) ke CommonJS',
    usage: '.esmtocjs <reply kode>',
    example: '.esmtocjs',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 1,
    isEnabled: true
}

function convertEsmToCjs(code) {
    let result = code
    const exportedItems = []
    let hasDefaultExport = false
    let defaultExportValue = null

    result = result.replace(/import\s+(\w+)\s*,\s*\{\s*([^}]+)\s*\}\s*from\s+['"]([^'"]+)['"]\s*;?/g, (m, def, named, path) => {
        const items = named.split(',').map(i => i.trim()).join(', ')
        return `const ${def} = require('${path}')\nconst { ${items} } = require('${path}')`
    })

    result = result.replace(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]\s*;?/g, (m, name, path) => {
        return `const ${name} = require('${path}')`
    })

    result = result.replace(/import\s*\{\s*([^}]+)\s*\}\s*from\s+['"]([^'"]+)['"]\s*;?/g, (m, imports, path) => {
        const items = imports.split(',').map(i => {
            const parts = i.trim().split(/\s+as\s+/)
            if (parts.length === 2) return `${parts[0]}: ${parts[1]}`
            return parts[0]
        })
        return `const { ${items.join(', ')} } = require('${path}')`
    })

    result = result.replace(/import\s*\*\s*as\s+(\w+)\s+from\s+['"]([^'"]+)['"]\s*;?/g, (m, name, path) => {
        return `const ${name} = require('${path}')`
    })

    result = result.replace(/import\s+['"]([^'"]+)['"]\s*;?/g, (m, path) => {
        return `require('${path}')`
    })

    result = result.replace(/export\s+default\s+(\w+)\s*;?/g, (m, name) => {
        hasDefaultExport = true
        defaultExportValue = name
        return ''
    })

    result = result.replace(/export\s+default\s+(function|class|async\s+function)\s*(\w*)\s*(\([^)]*\))?\s*\{/g, (m, type, name, params) => {
        hasDefaultExport = true
        if (name) {
            defaultExportValue = name
            return `${type} ${name}${params || ''} {`
        }
        defaultExportValue = '__default__'
        return `const __default__ = ${type}${params || ''} {`
    })

    result = result.replace(/export\s+default\s+(\{[\s\S]*?\})\s*;?/g, (m, obj) => {
        hasDefaultExport = true
        defaultExportValue = obj
        return ''
    })

    result = result.replace(/export\s*\{\s*([^}]+)\s*\}\s*;?/g, (m, exports) => {
        exports.split(',').forEach(i => {
            const parts = i.trim().split(/\s+as\s+/)
            if (parts.length === 2) {
                exportedItems.push({ name: parts[0], alias: parts[1] })
            } else {
                exportedItems.push({ name: parts[0], alias: null })
            }
        })
        return ''
    })

    result = result.replace(/export\s+(const|let|var)\s+(\w+)\s*=/g, (m, type, name) => {
        exportedItems.push({ name, alias: null })
        return `${type} ${name} =`
    })

    result = result.replace(/export\s+(async\s+)?function\s+(\w+)/g, (m, async, name) => {
        exportedItems.push({ name, alias: null })
        return `${async || ''}function ${name}`
    })

    result = result.replace(/export\s+class\s+(\w+)/g, (m, name) => {
        exportedItems.push({ name, alias: null })
        return `class ${name}`
    })

    result = result.replace(/export\s*\*\s*from\s+['"]([^'"]+)['"]\s*;?/g, (m, path) => {
        return `Object.assign(module.exports, require('${path}'))`
    })

    let exportCode = ''

    if (hasDefaultExport) {
        exportCode += `\nmodule.exports = ${defaultExportValue}`
    }

    if (exportedItems.length > 0) {
        const items = exportedItems.map(e => e.alias ? `${e.alias}: ${e.name}` : e.name).join(', ')
        exportCode += hasDefaultExport
            ? `\nmodule.exports = { ...module.exports, ${items} }`
            : `\nmodule.exports = { ${items} }`
    }

    result = result.trim() + exportCode
    result = result.replace(/\n{3,}/g, '\n\n')

    return result
}

async function handler(m, { sock }) {
    let code = m.quotedBody || m.text?.trim()

    if (!code) {
        return m.reply(
            `🔄 *ᴇsᴍ ᴛᴏ ᴄᴊs ᴄᴏɴᴠᴇʀᴛᴇʀ*\n\n` +
            `> Convert ES Modules ke CommonJS\n\n` +
            `> *Cara pakai:*\n` +
            `> Reply kode ESM dengan ${m.prefix}esmtocjs\n\n` +
            `> *Contoh ESM:*\n` +
            `> \`import axios from 'axios'\`\n` +
            `> \`export default function() {}\``
        )
    }

    try {
        await sock.sendCodeBlock(m.chat, convertEsmToCjs(code), m)
    } catch (error) {
        m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }