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

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
const config = {
    name: 'video2k2',
    category: 'tools',
    description: 'Enhance/upscale video ke kualitas 2K dengan AI',
    usage: '.hdvideo (reply video)',
    example: '.hdvideo',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 180,
    energi: 10,
    isEnabled: true
}

async function hdvideo(buffer) {
    const baseApi = 'https://api.unblurimage.ai'
    const productSerial = crypto.randomUUID().replace(/-/g, '')

    const sleep = ms => new Promise(r => setTimeout(r, ms))

    async function jsonFetch(url, options = {}) {
        const res = await fetch(url, options)
        const text = await res.text()
        let json
        try {
            json = text ? JSON.parse(text) : null
        } catch {
            return { __httpError: true, status: res.status, raw: text }
        }
        if (!res.ok) return { __httpError: true, status: res.status, raw: json }
        return json
    }

    const uploadForm = new FormData()
    uploadForm.set('video_file_name', `cli-${Date.now()}.mp4`)

    const uploadResp = await jsonFetch(`${baseApi}/api/upscaler/v1/ai-video-enhancer/upload-video`, {
        method: 'POST',
        body: uploadForm
    })

    if (uploadResp.__httpError || uploadResp.code !== 100000) throw new Error('Upload gagal')

    const { url: uploadUrl, object_name } = uploadResp.result || {}
    if (!uploadUrl || !object_name) throw new Error('Upload invalid')

    const putRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'content-type': 'video/mp4' },
        body: buffer
    })

    if (!putRes.ok) throw new Error('Upload video gagal')

    const cdnUrl = `https://cdn.unblurimage.ai/${object_name}`

    const jobForm = new FormData()
    jobForm.set('original_video_file', cdnUrl)
    jobForm.set('resolution', '2k')
    jobForm.set('is_preview', 'false')

    const createJobResp = await jsonFetch(`${baseApi}/api/upscaler/v2/ai-video-enhancer/create-job`, {
        method: 'POST',
        body: jobForm,
        headers: {
            'product-serial': productSerial,
            authorization: ''
        }
    })

    if (createJobResp.__httpError || createJobResp.code !== 100000) throw new Error('Create job gagal')

    const { job_id } = createJobResp.result || {}
    if (!job_id) throw new Error('Job tidak valid')

    const startTime = Date.now()
    let attempt = 0
    let result

    while (true) {
        attempt++
        const jobResp = await jsonFetch(`${baseApi}/api/upscaler/v2/ai-video-enhancer/get-job/${job_id}`, {
            method: 'GET',
            headers: {
                'product-serial': productSerial,
                authorization: ''
            }
        })

        if (jobResp.__httpError) throw new Error('Get job gagal')

        if (jobResp.code === 100000) {
            result = jobResp.result || {}
            if (result.output_url) break
        }

        if (Date.now() - startTime > 600000) throw new Error('Timeout proses') // 10 menit
        await sleep(attempt === 1 ? 20000 : 10000)
    }

    return result.output_url
}

async function handler(m, { sock }) {
    if (!m.quoted || !m.quoted.message?.videoMessage) {
        return m.reply(`🎬 *ʜᴅ ᴠɪᴅᴇᴏ ᴇɴʜᴀɴᴄᴇʀ*\n\n> Enhance/upgrade kualitas video ke 2K dengan AI\n\n> Contoh: reply video lalu ketik .hdvideo\n\n📝 *Info:*\n> • Resolusi output: 2K\n> • Proses: 5-10 menit\n> • Maksimal video: 50MB\n\n⚠️ *Catatan:*\n> • Server API mungkin sedang maintenance\n> • Kalo error, coba lagi nanti ya Darling~`)
    }

    await m.reply(`⏳ *ᴍᴇᴍᴘʀᴏꜱᴇꜱ ᴠɪᴅᴇᴏ...*\n\n🎬 *Tahap 1/4:* Upload video\n🕐 Mohon tunggu, ini bisa makan waktu 5-10 menit, Darling~`)

    try {
        const media = await m.quoted.download()
        
        if (media.length > 50 * 1024 * 1024) {
            return m.reply(`❌ *VIDEO TERLALU BESAR*\n\n> Maksimal ukuran video: 50MB\n> Ukuran video kamu: ${(media.length / 1024 / 1024).toFixed(2)} MB\n\n> Coba pakai video yang lebih kecil, Darling~`)
        }

        await m.reply(`🎬 *Tahap 2/4:* Mengirim ke server AI\n📦 Ukuran: ${(media.length / 1024 / 1024).toFixed(2)} MB`)

        const resultUrl = await hdvideo(media)

        await m.reply(`🎬 *Tahap 3/4:* Download hasil enhance\n🔗 Link didapatkan, sedang mengunduh...`)

        // Download hasil dari URL
        const response = await fetch(resultUrl)
        const videoBuffer = Buffer.from(await response.arrayBuffer())

        await m.reply(`🎬 *Tahap 4/4:* Mengirim hasil...\n📁 Ukuran hasil: ${(videoBuffer.length / 1024 / 1024).toFixed(2)} MB`)

        await sock.sendMessage(m.chat, {
            video: videoBuffer,
            caption: `✅ *ᴠɪᴅᴇᴏ ᴇɴʜᴀɴᴄᴇᴅ!*\n\n🎬 Kualitas: 2K\n📊 Ukuran: ${(videoBuffer.length / 1024 / 1024).toFixed(2)} MB\n\n> *Sebelum vs Sesudah* - Video jadi lebih tajam, Darling~`
        })

    } catch (error) {
        console.error('HDVideo Error:', error)
        
        let errorMsg = `❌ *ERROR*\n\n`
        errorMsg += `> ${error.message}\n\n`
        
        if (error.message.includes('fetch') || error.message.includes('404')) {
            errorMsg += `💡 *API sedang bermasalah:*\n`
            errorMsg += `> • Server https://api.unblurimage.ai sedang down (404)\n`
            errorMsg += `> • Coba lagi nanti atau gunakan video lain\n`
            errorMsg += `> • Kamu bisa cek status API di channel sumber\n\n`
        }
        
        errorMsg += `📝 *Saran:*\n`
        errorMsg += `> • Coba .upscale untuk gambar\n`
        errorMsg += `> • Atau coba lagi nanti, Darling~`
        
        await m.reply(errorMsg)
    }
}
export { config, handler };