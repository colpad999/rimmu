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

import axios from 'axios';
const pluginConfig = {
    name: "putar",
    category: "search",
    description: "Putar musik dari YouTube (Faa API)",
    usage: ".putar-play <url>",
    example: ".putar-play https://youtube.com/watch?v=xxxxx",
    cooldown: 15,
    energi: 1,
    isEnabled: true
}

// Fungsi delay promise
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Fungsi kirim audio dengan retry
async function sendAudioWithRetry(sock, chatId, audioUrl, title, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            await sock.sendMessage(chatId, {
                audio: { url: audioUrl },
                mimetype: "audio/mpeg",
                ptt: true,
                fileName: title + ".mp3"
            }, { quoted: null }) // Tidak pakai quoted agar lebih stabil
            return true
        } catch (err) {
            console.log(`[Retry ${i+1}/${retries}] Audio gagal: ${err.message}`)
            if (i < retries - 1) {
                await delay(3000) // Tunggu 3 detik sebelum retry
            } else {
                throw err
            }
        }
    }
    return false
}

// HANDLER
async function handler(m, { sock }) {
    const url = m.text?.trim()
    
    if (!url || (!url.includes("youtube.com") && !url.includes("youtu.be"))) {
        return m.reply(`🖤 *𝒁𝑬𝑹𝑶 𝑻𝑾𝑶 𝑫𝑨𝑹𝑲 𝑺𝑻𝑨𝑮𝑬*\n\n> Masukkan URL YouTube ya darling~\nContoh:\n${m.prefix}putar-play https://youtube.com/watch?v=xxxxx`)
    }
    
    await m.react("🖤")
    
    try {
        await m.reply("🩸 *Rimuru:* Darling... aku sedang mengambil musiknya untukmu~")
        
        // Panggil API
        const api = `https://api-faa.my.id/faa/ytplay?url=${encodeURIComponent(url)}`
        const { data } = await axios.get(api, {
            timeout: 30000,
            headers: { 'User-Agent': 'RimuruBot/1.0' }
        })

        if (!data.status || !data.result) {
            throw new Error("Gagal mengambil audio dari API")
        }

        const res = data.result

        // ========== STEP 1: KIRIM THUMBNAIL + CAPTION ==========
        const caption = `
╭━━━〔 🖤 𝒁𝑬𝑹𝑶 𝑻𝑾𝑶 𝑫𝑨𝑹𝑲 𝑺𝑻𝑨𝑮𝑬 🖤 〕━━━⬣
┃ 🎧 𝑵𝒐𝒘 𝑷𝒍𝒂𝒚𝒊𝒏𝒈…
┃
┃ 🎶 𝑻𝒊𝒕𝒍𝒆 : ${res.title}
┃ 📺 𝑪𝒉𝒂𝒏𝒏𝒆𝒍 : ${res.author}
┃ ⏱ 𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏 : ${res.duration_timestamp}
┃ 👁 𝑽𝒊𝒆𝒘𝒔 : ${res.views?.toLocaleString() || 'N/A'}
┃
┃ 🩸 「Darling... sebentar lagi audionya ya~」
┃ 🌑 Stay with me in the dark ~
╰━━━〔 💔 𝑭𝑨𝑪𝑬𝑳𝑬𝑺𝑺 𝟎𝟐 💔 〕━━━⬣

⏳ *Mengirim audio dalam 5 detik...*
        `.trim()

        // Kirim pesan dengan thumbnail preview
        await sock.sendMessage(m.chat, {
            text: caption,
            contextInfo: {
                externalAdReply: {
                    title: "🖤 Rimuru Dark Stage",
                    body: res.title,
                    mediaType: 1,
                    mediaUrl: res.url,
                    sourceUrl: res.url,
                    thumbnailUrl: res.thumbnail,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m })

        // ========== STEP 2: DELAY 5 DETIK ==========
        await m.reply(`🎵 *Darling...* Audio akan dikirim sebentar lagi~`)
        await delay(5000) // Delay 5 detik

        // ========== STEP 3: KIRIM AUDIO MP3 dengan retry ==========
        await m.reply(`📤 *Mengirim audio...* Jangan kemana-mana ya darling~`)
        
        const audioSent = await sendAudioWithRetry(sock, m.chat, res.mp3, res.title, 3)
        
        if (audioSent) {
            await m.react("💫")
            await m.reply(`✅ *Selesai!* Selamat menikmati lagunya ya darling~ 🖤`)
        } else {
            throw new Error("Gagal mengirim audio setelah 3x percobaan")
        }
        
    } catch (err) {
        console.error("[PutarPlay Error]", err.message)
        
        // Handle error 428 khusus
        if (err.response?.status === 428 || err.message?.includes("Connection Closed")) {
            await m.reply(`💔 *Connection Closed Darling...*\n\n> Koneksi ke WhatsApp terputus.\n> Coba ulangi perintahnya ya~`)
        } else {
            await m.reply(`💔 *Error Darling...*\n\n> ${err.message || err}\n\nCoba lagi nanti~`)
        }
        
        await m.react("❌")
    }
}

export { pluginConfig as config, handler };
