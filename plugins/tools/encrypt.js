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

import JavaScriptObfuscator from 'javascript-obfuscator';
import config from '../../config.js';
const pluginConfig = {
    name: 'encrypt',
    category: 'tools',
    description: 'Enkripsi / Obfuscate kode JavaScript',
    usage: '.encrypt (reply file/code)',
    example: '.encrypt',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 1,
    isEnabled: true
}

async function encryptCode(code) {
    const options = {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: false,
        debugProtectionInterval: false,
        disableConsoleOutput: false,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: true,
        renameGlobals: false,
        selfDefending: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 10,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayCallsTransformThreshold: 0.75,
        stringArrayEncoding: ['none'],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 1,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersType: 'variable',
        stringArrayThreshold: 0.75,
        transformObjectKeys: true,
        unicodeEscapeSequence: false
    }
    
    const obfuscationResult = JavaScriptObfuscator.obfuscate(code, options)
    return obfuscationResult.getObfuscatedCode()
}

async function handler(m, { sock }) {
    const quoted = m.quoted
    
    if (!quoted) {
        return m.reply(
            `💕 *ᴇɴᴄʀʏᴘᴛ ᴄᴏᴅᴇ* 💕\n\n` +
            `╭━━━━━━━━━━━━━━━━━━━━━⬣\n` +
            `┃ ✦ *Cara Pakai*\n` +
            `┃\n` +
            `┃   Reply kode JavaScript yang mau dienkripsi\n` +
            `┃   dengan caption \`.encrypt\`\n` +
            `┃\n` +
            `┃ ✦ *Contoh*\n` +
            `┃\n` +
            `┃   const nama = 'Darling';\n` +
            `┃   console.log(nama);\n` +
            `┃\n` +
            `┃   (lalu reply dengan .encrypt)\n` +
            `┃\n` +
            `┃ 💗 *Rimuru:* Mau enkripsi kode apa darling~?\n` +
            `╰━━━━━━━━━━━━━━━━━━━━━⬣`
        )
    }
    
    // Ambil teks dari quoted message
    let code = quoted.text || quoted.body || ''
    
    if (!code || code.length < 10) {
        return m.reply(`❌ *ᴇʀʀᴏʀ*\n\n> Kode terlalu pendek atau tidak valid darling~`)
    }
    
    m.react('🔒')
    await m.reply(`⏳ *ᴇɴᴄʀʏᴘᴛɪɴɢ...*\n\n💗 *Rimuru:* Lagi mengenkripsi kode darling~ tunggu sebentar yaa 🔐`)
    
    try {
        const encrypted = await encryptCode(code)
        
        // Kirim sebagai file biar gak kepanjangan
        const buffer = Buffer.from(encrypted, 'utf8')
        const fileName = `encrypted_${Date.now()}.js`
        
        await sock.sendMessage(m.chat, {
            document: buffer,
            mimetype: 'application/javascript',
            fileName: fileName,
            caption: `✅ *ᴇɴᴄʀʏᴘᴛɪᴏɴ sᴜᴄᴄᴇss*\n\n` +
                    `╭━━━━━━━━━━━━━━━━━━━━━⬣\n` +
                    `┃ 📦 *sɪᴢᴇ*: ${(encrypted.length / 1024).toFixed(2)} KB\n` +
                    `┃ 📝 *ᴛʏᴘᴇ*: JavaScript Obfuscated\n` +
                    `┃\n` +
                    `┃ 💗 *Rimuru:* Ini kode terenkripsinya darling~ 🔒\n` +
                    `╰━━━━━━━━━━━━━━━━━━━━━⬣`
        }, { quoted: m })
        
        m.react('✅')
        
    } catch (err) {
        console.error('[Encrypt] Error:', err)
        m.react('💔')
        return m.reply(
            `💔 *ᴇʀʀᴏʀ*\n\n` +
            `> ${err.message}\n\n` +
            `> Coba lagi ya darling~ 🥺`
        )
    }
}

export { pluginConfig as config, handler };
