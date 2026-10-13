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
import sharp from 'sharp';
import axios from 'axios';
import config from '../../config.js';
const pluginConfig = {
    name: 'namasatelit',
    category: 'info',
    description: 'Buat banner nama dengan gaya NASA Landsat',
    usage: '.landsat <nama>',
    example: '.landsat Ditzzx',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 2,
    isEnabled: true
}

// Konfigurasi
const BASE = "https://science.nasa.gov"
const REFERER = "https://science.nasa.gov/specials/your-name-in-landsat/"
const UA = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (CHIMERA) Chrome/147.0.0.0 Mobile Safari/537.36"

const LETTER_WIDTH = 250
const LETTER_HEIGHT = 600
const GAP = 10
const BG = { r: 0, g: 0, b: 0, alpha: 1 }

// Buat folder output
const OUTPUT_DIR = path.join(process.cwd(), "temp", "landsat")
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

function cleanName(text) {
    return String(text).toLowerCase().replace(/[^a-z]/g, "")
}

function imageUrl(letter, index = 0) {
    return `${BASE}/specials/your-name-in-landsat/images/${letter}_${index}.jpg`
}

function headers() {
    return {
        "user-agent": UA,
        "sec-ch-ua-platform": "\"Android\"",
        "sec-ch-ua": "\"Google Chrome\";v=\"147\", \"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"147\"",
        "sec-ch-ua-mobile": "?1",
        "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "sec-fetch-site": "same-origin",
        "sec-fetch-mode": "no-cors",
        "sec-fetch-dest": "image",
        "referer": REFERER,
        "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7"
    }
}

async function downloadBuffer(url) {
    const response = await axios.get(url, {
        responseType: "arraybuffer",
        headers: headers()
    })
    
    return {
        code: response.status,
        contentType: response.headers["content-type"],
        size: response.data.length,
        buffer: Buffer.from(response.data)
    }
}

async function resizeLetter(buffer) {
    return sharp(buffer)
        .resize(LETTER_WIDTH, LETTER_HEIGHT, {
            fit: "cover",
            position: "center"
        })
        .jpeg({ quality: 95 })
        .toBuffer()
}

async function mergeImages(items, outputPath) {
    const width = items.length * LETTER_WIDTH + Math.max(0, items.length - 1) * GAP
    const height = LETTER_HEIGHT

    const composite = items.map((item, i) => ({
        input: item.buffer,
        left: i * (LETTER_WIDTH + GAP),
        top: 0
    }))

    await sharp({
        create: {
            width,
            height,
            channels: 4,
            background: BG
        }
    })
        .composite(composite)
        .jpeg({ quality: 95 })
        .toFile(outputPath)

    return {
        path: outputPath,
        width,
        height
    }
}

async function generateLandsat(name) {
    const clean = cleanName(name)
    
    if (!clean) {
        throw new Error("Nama harus berisi huruf A-Z")
    }
    
    const letters = []
    
    for (let i = 0; i < clean.length; i++) {
        const letter = clean[i]
        const url = imageUrl(letter, 0)
        const data = await downloadBuffer(url)
        const resized = await resizeLetter(data.buffer)
        
        letters.push({
            letter,
            url,
            code: data.code,
            contentType: data.contentType,
            size: data.size,
            buffer: resized
        })
    }
    
    const filename = `${clean}-${Date.now()}-landsat.jpg`
    const outputPath = path.join(OUTPUT_DIR, filename)
    const final = await mergeImages(letters, outputPath)
    
    return {
        name: clean,
        originalName: name,
        total: letters.length,
        outputPath: final.path,
        width: final.width,
        height: final.height,
        letters: letters.map(x => ({
            letter: x.letter,
            url: x.url,
            code: x.code,
            size: x.size
        }))
    }
}

async function handler(m, { sock }) {
    let nama = m.text || m.quoted?.text || ""
    
    if (!nama) {
        return m.reply(
            `🛰️ *NASA Landsat Name Generator*\n\n` +
            `> Buat banner nama keren ala NASA Landsat!\n\n` +
            `📌 *Cara pakai:*\n` +
            `> *${m.prefix}landsat* [nama kamu]\n\n` +
            `✨ *Contoh:*\n` +
            `> ${m.prefix}landsat Ditzzx\n` +
            `> ${m.prefix}landsat Rimuru\n\n` +
            `⚠️ *Catatan:*\n` +
            `> Hanya huruf A-Z yang didukung\n` +
            `> Huruf besar/kecil otomatis disamakan\n\n` +
            `> *by Ramzz X Cloud*`
        )
    }
    
    // Validasi input (hanya huruf)
    const cleanNama = nama.replace(/[^a-zA-Z]/g, "")
    if (!cleanNama) {
        return m.reply(
            `❌ *Nama tidak valid!*\n\n` +
            `> Nama harus berisi huruf A-Z saja.\n` +
            `> Contoh: *${m.prefix}landsat Ditzzx*`
        )
    }
    
    try {
        await m.react('⏱️')
        await m.reply(`🛰️ *Memproses nama "${nama}"...*\n> Mengambil gambar dari NASA Landsat\n> Mohon tunggu sebentar`)
        
        const result = await generateLandsat(nama)
        
        // Format caption
        const caption = `🛰️ *NASA LANDSAT NAME GENERATOR*\n\n` +
            `┌─「 📝 *DETAIL* 」\n` +
            `│ ◈ Nama asli: *${result.originalName}*\n` +
            `│ ◈ Nama bersih: *${result.name}*\n` +
            `│ ◈ Total huruf: *${result.total}*\n` +
            `│\n` +
            `├─「 🖼️ *UKURAN* 」\n` +
            `│ ◈ Width: *${result.width} px*\n` +
            `│ ◈ Height: *${result.height} px*\n` +
            `│\n` +
            `└─「 🔤 *HURUF* 」\n` +
            `${result.letters.map((l, i) => `│ ◈ ${i+1}. *${l.letter.toUpperCase()}* - ${l.url.split('/').pop()}`).join('\n')}\n` +
            `│\n` +
            `━━━━━━━━━━━━━━━━━━━━\n` +
            `> *Gaya Landsat by NASA*\n` +
            `> *by Ramzz X Cloud*`
        
        // Kirim gambar
        await sock.sendMessage(m.chat, {
            image: fs.readFileSync(result.outputPath),
            caption: caption,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                externalAdReply: {
                    title: "NASA Landsat Generator",
                    body: `Nama: ${result.originalName}`,
                    thumbnailUrl: "https://science.nasa.gov/wp-content/uploads/2023/09/landsat-9-logo-1024x967.png",
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    sourceUrl: "https://science.nasa.gov/specials/your-name-in-landsat/"
                }
            }
        }, { quoted: m })
        
        // Hapus file temporary setelah dikirim
        setTimeout(() => {
            try {
                fs.unlinkSync(result.outputPath)
            } catch(e) {}
        }, 5000)
        
        await m.react('✅')
        
    } catch (err) {
        console.error('Landsat Error:', err)
        await m.react('❌')
        
        return m.reply(
            `❌ *GAGAL MEMBUAT BANNER*\n\n` +
            `> *${err.message || "Terjadi kesalahan pada server"}*\n\n` +
            `💡 *Solusi:*\n` +
            `◈ Pastikan nama hanya huruf A-Z\n` +
            `◈ Coba dengan nama yang lebih pendek\n` +
            `◈ Coba lagi nanti\n\n` +
            `> *by Ramzz X Cloud*`
        )
    }
}

export { pluginConfig as config, handler };
