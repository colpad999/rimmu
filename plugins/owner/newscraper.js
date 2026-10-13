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

import fs from 'fs';
import path from 'path';
import { downloadContentFromMessage } from '@itsliaaa/baileys';

const pluginConfig = {
    name: 'newscraper',
    category: 'owner',
    description: 'Menambahkan scraper baru ke src/scraper/ (Owner only)',
    usage: '.addscraper <nama>',
    example: '.addscraper konchan\n\nReply pesan yang berisi kode scraper',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: true,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

function isValidScraperName(name) {
    return /^[a-zA-Z0-9_]+$/.test(name)
}

function getExistingScrapers(scraperDir) {
    if (!fs.existsSync(scraperDir)) return []
    const files = fs.readdirSync(scraperDir)
    return files.filter(file => file.endsWith('.js') && !file.includes('.backup')).map(file => file.replace('.js', ''))
}

async function handler(m, { sock }) {
    let code = null
    let name = null
    
    // Ambil nama dari command
    const args = m.text?.split(/\s+/) || []
    if (args.length > 1) {
        name = args[1].toLowerCase()
    }
    
    // 🔥 PERBAIKAN: Deteksi reply dengan lebih baik
    let quotedMsg = m.quoted || (m.message?.extendedTextMessage?.contextInfo?.quotedMessage)
    
    if (quotedMsg) {
        console.log('[AddScraper] Ada quoted message detected')
        
        // Cek dari text message
        if (quotedMsg.conversation) {
            code = quotedMsg.conversation.trim()
            console.log('[AddScraper] Dapet dari conversation, length:', code.length)
        }
        // Cek dari extendedTextMessage
        else if (quotedMsg.extendedTextMessage?.text) {
            code = quotedMsg.extendedTextMessage.text.trim()
            console.log('[AddScraper] Dapet dari extendedTextMessage, length:', code.length)
        }
        // Cek dari documentMessage (file)
        else if (quotedMsg.documentMessage) {
            const doc = quotedMsg.documentMessage
            const fileName = doc.fileName || ''
            console.log('[AddScraper] Dapet file:', fileName)
            
            if (!fileName.endsWith('.js')) {
                return m.reply(`💔 *Error!* File harus berekstensi .js darling~\n\nKamu kirim: ${fileName}`)
            }
            
            try {
                const stream = await downloadContentFromMessage(doc, 'document')
                let buffer = Buffer.from([])
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk])
                }
                code = buffer.toString('utf-8')
                console.log('[AddScraper] File loaded, length:', code.length)
            } catch (err) {
                console.error('[AddScraper] Gagal download file:', err)
                return m.reply(`💔 *Gagal download file!*\n\n${err.message}`)
            }
        }
        // Cek dari imageMessage (gambar) -> error
        else if (quotedMsg.imageMessage) {
            return m.reply(`💔 *Error!* Reply harus TEXT atau FILE .js, bukan gambar darling~`)
        }
    } else {
        console.log('[AddScraper] Tidak ada quoted message')
    }
    
    // 🔥 PERBAIKAN: Kalo masih ga dapet code, cek dari command langsung
    // Format: .addscraper namascraper // kode disini
    if (!code && args.length > 2) {
        code = args.slice(2).join(' ')
        console.log('[AddScraper] Dapet dari command text, length:', code.length)
    }
    
    // 🔥 PERBAIKAN: Kalo masih ga dapet, cek dari m.text setelah command
    if (!code && m.text) {
        const match = m.text.match(/\.addscraper\s+\w+\s+([\s\S]+)/)
        if (match) {
            code = match[1].trim()
            console.log('[AddScraper] Dapet dari regex match, length:', code.length)
        }
    }
    
    // Tampilkan menu kalo kurang
    if (!code || !name) {
        const scraperDir = path.join(process.cwd(), 'src', 'scraper')
        const existingScrapers = getExistingScrapers(scraperDir)
        
        let statusMsg = !code ? '❌ Kode scraper tidak ditemukan!' : '❌ Nama scraper tidak ditemukan!'
        
        return m.reply(
`💕 *RIMURU - ADD SCRAPER* 💕

┌────────────────────┐
│ ⚠️ *${statusMsg}*
│
│ 📌 *Cara Pakai (Pilih salah satu):*
│
│ 1️⃣ *Reply pesan + command:*
│    [Reply kode scraper]
│    .addscraper hdvid
│
│ 2️⃣ *Command langsung + kode:*
│    .addscraper hdvid
│    const axios = require('axios')
│    async function hdvid(url) {
│        return { data: 'test' }
│    }
│    module.exports = { hdvid }
│
│ 📌 *Nama Valid:*
│ huruf, angka, _
│ Contoh: hdvid, anime_v2
└────────────────────┘

📁 *Scraper Aktif:*
${existingScrapers.length > 0 ? existingScrapers.slice(0, 15).map(s => `│ • ${s}.js`).join('\n') : '│ • Belum ada'}
${existingScrapers.length > 15 ? `│ • ...dan ${existingScrapers.length - 15} lainnya` : ''}

💕 *Rimuru:* Coba cara ke-2, langsung tulis kodenya setelah command darling~ 🦋`
        )
    }
    
    // Validasi nama
    if (!isValidScraperName(name)) {
        return m.reply(
`💔 *INVALID NAME!*

┌────────────────────┐
│ Nama hanya boleh:  │
│ • Huruf a-z        │
│ • Angka 0-9        │
│ • Underscore _     │
└────────────────────┘

❌ Nama: \`${name}\`

💕 Coba lagi darling~ 🦋`
        )
    }
    
    // Validasi minimal kode (harus ada isinya)
    if (code.length < 20) {
        return m.reply(
`💔 *KODE TERLALU PENDEK!*

┌────────────────────┐
│ Kode scraper kamu  │
│ hanya ${code.length} karakter.│
│ Minimal 20 karakter.│
│                    │
│ Pastikan kamu reply│
│ pesan yang berisi  │
│ kode scraper ya    │
└────────────────────┘

💕 Coba lagi darling~ 🦋`
        )
    }
    
    await m.react('📝')
    
    try {
        const scraperDir = path.join(process.cwd(), 'src', 'scraper')
        
        if (!fs.existsSync(scraperDir)) {
            fs.mkdirSync(scraperDir, { recursive: true })
        }
        
        const filePath = path.join(scraperDir, `${name}.js`)
        const exists = fs.existsSync(filePath)
        
        // Backup kalo ada
        if (exists) {
            const backupPath = path.join(scraperDir, `${name}.backup.${Date.now()}.js`)
            fs.copyFileSync(filePath, backupPath)
            console.log(`[AddScraper] Backup created: ${backupPath}`)
        }
        
        // Format kode - pastikan ada module.exports
        let finalCode = code
        if (!code.includes('module.exports') && !code.includes('exports.')) {
            finalCode = `// Scraper: ${name}\n// Dibuat: ${new Date().toLocaleString()}\n\n${code}\n\nmodule.exports = { ${name} }`
        }
        
        // Tulis file
        fs.writeFileSync(filePath, finalCode, 'utf-8')
        
        const lines = finalCode.split('\n').length
        const size = (Buffer.byteLength(finalCode, 'utf-8') / 1024).toFixed(2)
        
        await m.reply(
`✅ *SCRAPER BERHASIL!*

┌────────────────────┐
│ 📋 *Info:*
│ • Nama: ${name}.js
│ • Lokasi: src/scraper/
│ • Baris: ${lines}
│ • Ukuran: ${size} KB
│ • Status: ${exists ? 'Updated' : 'New'}
└────────────────────┘

💕 *Rimuru:* Scraper ${name} siap dipakai darling~

🦋 *Jangan lupa restart bot biar langsung aktif!*`
        )
        
        await m.react('✅')
        
    } catch (err) {
        console.error('[AddScraper] Error:', err)
        await m.react('💔')
        await m.reply(
`💔 *GAGAL MENYIMPAN!*

┌────────────────────┐
│ ❌ ${err.message.substring(0, 60)}
└────────────────────┘

💕 Coba lagi darling~ 🦋`
        )
    }
}

export { pluginConfig as config, handler };
