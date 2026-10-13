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
import FormData from 'form-data';
import config from '../../config.js';

const pluginConfig = {
    name: 'nano',
    category: 'ai',
    description: 'Edit gambar dengan AI menggunakan prompt',
    usage: '.nanobanana <prompt>',
    example: '.nanobanana make it anime style',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 30,
    energi: 1,
    isEnabled: true
}

// UPLOAD TMPFILES
async function uploadTmpfiles(buffer) {

    try {

        const form =
            new FormData()

        form.append(
            'file',
            buffer,
            {
                filename:
                    'image.png',

                contentType:
                    'image/png'
            }
        )

        const response =
            await axios.post(
                'https://tmpfiles.org/api/v1/upload',
                form,
                {
                    headers:
                        form.getHeaders(),

                    timeout: 30000
                }
            )

        if (
            !response.data?.data?.url
        ) {

            throw new Error(
                'Upload gagal'
            )
        }

        return response.data.data.url
            .replace(
                'tmpfiles.org/',
                'tmpfiles.org/dl/'
            )

    } catch (e) {

        console.log(
            'Upload Error:',
            e
        )

        return null
    }
}

// GET IMAGE BUFFER
async function getImageBuffer(m) {

    try {

        // QUOTED IMAGE
        if (
            m.quoted &&
            (
                m.quoted.mimetype
                    ?.includes('image') ||

                m.quoted.type ===
                    'imageMessage'
            )
        ) {

            return await
                m.quoted.download()
        }

        // DIRECT IMAGE
        if (
            m.mimetype
                ?.includes('image')
        ) {

            return await
                m.download()
        }

        return null

    } catch {

        return null
    }
}

async function handler(m, { sock }) {

    try {

        const prompt =
            m.text?.trim()

        // NO PROMPT
        if (!prompt) {

            return await m.reply(
`🍌 *NANO BANANA AI*

Edit gambar menggunakan AI

📌 Contoh:
${pluginConfig.example}

⚠️ Reply / kirim gambar
dengan caption command`
            )
        }

        // GET IMAGE
        const imageBuffer =
            await getImageBuffer(m)

        if (!imageBuffer) {

            return await m.reply(
`❌ Reply / kirim gambar

Contoh:
${pluginConfig.example}`
            )
        }

        // REACT LOADING
        await m.react('🕕')

        // UPLOAD IMAGE
        const imageUrl =
            await uploadTmpfiles(
                imageBuffer
            )

        if (!imageUrl) {

            await m.react('❌')

            return await m.reply(
                '❌ Upload gambar gagal'
            )
        }

        // API REQUEST
        const { data } =
            await axios.post(
                'https://api.covenant.sbs/api/ai/gemini-image',
                {
                    prompt,

                    model:
                        'gemini-flash-edit',

                    imageUrl
                },
                {
                    headers: {
                        'x-api-key':
                            config.zeroApi.covenant
                    },

                    timeout: 60000
                }
            )

        console.log(data)

        // VALIDASI
        if (
            !data ||
            !data.status ||
            !data.data ||
            !data.data.url
        ) {

            await m.react('❌')

            return await m.reply(
`❌ *GAGAL*

AI tidak dapat
mengedit gambar`
            )
        }

        // SEND RESULT
        await sock.sendMessage(
            m.chat,
            {
                image: {
                    url:
                        data.data.url
                },

                caption:
`🍌 *NANO BANANA AI*

✅ Gambar berhasil diedit

📝 Prompt:
${prompt}`,

                footer:
                    'RIMURU AI',

                contextInfo: {

                    forwardingScore:
                        999999,

                    isForwarded: true,

                    externalAdReply: {

                        title:
                            'Nano Banana AI',

                        body:
                            prompt.slice(0, 60),

                        thumbnailUrl:
'https://files.catbox.moe/7wclw8.jpg',

                        sourceUrl:
'https://covenant.sbs',

                        mediaType: 1,
                        renderLargerThumbnail: false,
                        showAdAttribution: false
                    }
                }
            },
            { quoted: m }
        )

        // SUCCESS
        await m.react('✅')

    } catch (error) {

        console.log(
            'NanoBanana Error:',
            error?.response?.data ||
            error.message
        )

        await m.react('☢️')

        if (
            error.response?.status === 401
        ) {

            return await m.reply(
`❌ *401 UNAUTHORIZED*

API key covenant invalid`
            )
        }

        if (
            error.code ===
            'ECONNABORTED'
        ) {

            return await m.reply(
`⏱️ *TIMEOUT*

Request terlalu lama,
coba lagi nanti`
            )
        }

        await m.reply(
`🍀 *Waduhh error bang*

Silahkan coba lagi nanti
dan jangan spam 😭`
        )
    }
}
export { pluginConfig as config, handler };