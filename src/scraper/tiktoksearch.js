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

const TTSEARCH_API = 'https://api.azbry.com/api/search/ttsearch?q='

function normalizeUrl(url) {
    if (!url || typeof url !== 'string') return null
    const matches = url.match(/https?:\/\//g) || []
    if (matches.length <= 1) return url
    const lastIndex = url.lastIndexOf('http')
    return url.slice(lastIndex)
}

function normalizeNumber(value) {
    const number = Number(value)
    return Number.isFinite(number) ? number : 0
}

function normalizeItem(item) {
    return {
        title: item?.title || '',
        cover: normalizeUrl(item?.cover),
        originCover: normalizeUrl(item?.origin_cover),
        link: normalizeUrl(item?.link),
        watermarkLink: normalizeUrl(item?.watermark_link),
        music: normalizeUrl(item?.music),
        author: {
            nickname: item?.author?.nickname || '',
            avatar: normalizeUrl(item?.author?.avatar)
        },
        stats: {
            plays: normalizeNumber(item?.stats?.plays),
            likes: normalizeNumber(item?.stats?.likes),
            comments: normalizeNumber(item?.stats?.comments),
            shares: normalizeNumber(item?.stats?.shares)
        }
    }
}

async function tiktokSearchVideo(query) {
    const { data } = await axios.get(`${TTSEARCH_API}${encodeURIComponent(query)}`, {
        timeout: 30000,
        headers: {
            'user-agent': 'Mozilla/5.0'
        }
    })

    if (!data?.status || !Array.isArray(data?.result)) {
        throw new Error(data?.message || 'TikTok search gagal')
    }

    return data.result.map(normalizeItem).filter((item) => item.link)
}

export { tiktokSearchVideo }
