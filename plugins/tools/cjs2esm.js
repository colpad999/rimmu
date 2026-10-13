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
import te from '../../src/lib/rimuru-error.js'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pluginConfig = {
    name: 'cjs2esm',
    category: 'tools',
    description: 'Convert CommonJS ke ESM (ES Modules)',
    usage: '.cjstoesm <reply kode>',
    example: '.cjstoesm',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 1,
    isEnabled: true
}

function convertCjsToEsm(code) {
    let result = code

    result = result.replace(/(?:const|let|var)\s*\{\s*([^}]+)\s*\}\s*=\s*require\s*\(\s*['"]([^'"]+)['"]\s*\)\s*;?/g, (match, imports, path) => {
        const items = imports.split(',').map(i => {
            const parts = i.trim().split(/\s*:\s*/)
            if (parts.length === 2) return `${parts[0].trim()} as ${parts[1].trim()}`
            return parts[0].trim()
        })
        return `import { ${items.join(', ')} } from '${path}';`
    })

    result = result.replace(/(?:const|let|var)\s+(\w+)\s*=\s*require\s*\(\s*['"]([^'"]+)['"]\s*\)\.(\w+)\s*;?/g, (match, name, path, prop) => {
        if (name === prop) return `import { ${prop} } from '${path}';`
        return `import { ${prop} as ${name} } from '${path}';`
    })

    result = result.replace(/(?:const|let|var)\s+(\w+)\s*=\s*require\s*\(\s*['"]([^'"]+)['"]\s*\)\.default\s*;?/g, (match, name, path) => {
        return `import ${name} from '${path}';`
    })

    result = result.replace(/(?:const|let|var)\s+(\w+)\s*=\s*require\s*\(\s*['"]([^'"]+)['"]\s*\)\s*;?/g, (match, name, path) => {
        return `import ${name} from '${path}';`
    })

    result = result.replace(/^require\s*\(\s*['"]([^'"]+)['"]\s*\)\s*;?$/gm, (match, path) => {
        return `import '${path}';`
    })

    result = result.replace(/module\.exports\s*=\s*\{([^}]+)\}\s*;?/g, (match, exports) => {
        const items = exports.split(',').map(i => {
            const parts = i.trim().split(/\s*:\s*/)
            if (parts.length === 2) return `${parts[1].trim()} as ${parts[0].trim()}`
            return parts[0].trim()
        })
        return `export { ${items.join(', ')} };`
    })

    result = result.replace(/module\.exports\s*=\s*(async\s+)?(function|class)\s*(\w*)\s*(\([^)]*\))?\s*\{/g, (match, async, type, name, params) => {
        if (name) return `export default ${async || ''}${type} ${name}${params || ''} {`
        return `export default ${async || ''}${type}${params || ''} {`
    })

    result = result.replace(/module\.exports\s*=\s*(async\s+)?\(([^)]*)\)\s*=>/g, (match, async, params) => {
        return `export default ${async || ''}(${params}) =>`
    })

    result = result.replace(/module\.exports\s*=\s*([^;\n]+)\s*;?/g, (match, value) => {
        return `export default ${value};`
    })

    result = result.replace(/exports\.(\w+)\s*=\s*(async\s+)?function\s*(\w*)\s*(\([^)]*\))?\s*\{/g, (match, exportName, async, name, params) => {
        return `export ${async || ''}function ${exportName}${params || ''} {`
    })

    result = result.replace(/exports\.(\w+)\s*=\s*(async\s+)?\(([^)]*)\)\s*=>\s*\{/g, (match, exportName, async, params) => {
        return `export const ${exportName} = ${async || ''}(${params}) => {`
    })

    result = result.replace(/exports\.(\w+)\s*=\s*(\w+)\s*;?/g, (match, key, value) => {
        if (key === value) return `export { ${key} };`
        return `export { ${value} as ${key} };`
    })

    result = result.replace(/exports\.(\w+)\s*=\s*([^;\n]+)\s*;?/g, (match, key, value) => {
        if (/^(async|function|\(|class)/.test(value.trim())) return match
        return `export const ${key} = ${value};`
    })

    result = result.replace(/module\.exports\.(\w+)\s*=\s*(\w+)\s*;?/g, (match, key, value) => {
        if (key === value) return `export { ${key} };`
        return `export { ${value} as ${key} };`
    })

    result = result.replace(/Object\.assign\s*\(\s*module\.exports\s*,\s*require\s*\(\s*['"]([^'"]+)['"]\s*\)\s*\)\s*;?/g, (match, path) => {
        return `export * from '${path}';`
    })

    if ((result.includes('__dirname') || result.includes('__filename')) && !result.includes('fileURLToPath')) {
        const helperCode = `import { fileURLToPath } from 'url';\nimport { dirname } from 'path';\nconst __filename = fileURLToPath(import.meta.url);\nconst __dirname = dirname(__filename);\n\n`
        result = helperCode + result
    }

    result = result.replace(/\n{3,}/g, '\n\n')

    return result.trim()
}

async function handler(m, { sock }) {
    let code = m.quotedBody || m.text?.trim()

    if (!code) {
        return m.reply(
            `🔄 *ᴄᴊs ᴛᴏ ᴇsᴍ ᴄᴏɴᴠᴇʀᴛᴇʀ*\n\n` +
            `> Convert CommonJS ke ES Modules\n\n` +
            `> *Cara pakai:*\n` +
            `> Reply kode CJS dengan ${m.prefix}cjstoesm\n\n` +
            `> *Contoh CJS:*\n` +
            `> \`const axios = require('axios')\`\n` +
            `> \`module.exports = handler\``
        )
    }

    try {
        const converted = await convertCjsToEsm(code)
        await sock.sendCodeBlock(m.chat, converted, m)
    } catch (error) {
        m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }