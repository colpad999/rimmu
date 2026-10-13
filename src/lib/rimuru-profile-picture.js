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

const DEFAULT_PP = 'https://i.ibb.co.com/QFzm9pSF/1546d15ce5dd2946573b3506df109d00.jpg'

const cache = new Map()
const CACHE_TTL = 900000

function cleanExpired() {
    const now = Date.now()
    for (const [key, entry] of cache) {
        if (now - entry.ts > CACHE_TTL) cache.delete(key)
    }
}

setInterval(cleanExpired, 300000)

async function getProfilePicture(sock, jid) {
    const cached = cache.get(jid)
    if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.url

    let url
    try {
        url = await sock.profilePictureUrl(jid, 'image')
    } catch {
        url = DEFAULT_PP
    }

    cache.set(jid, { url, ts: Date.now() })
    return url
}

async function getProfileBuffer(sock, jid) {
    const url = await getProfilePicture(sock, jid)
    try {
        const { f } = await import('./rimuru-http.js')
        const res = await f(url, 'arrayBuffer')
        return Buffer.from(res.data)
    } catch {
        return null
    }
}

function clearCache(jid) {
    if (jid) return cache.delete(jid)
    cache.clear()
}

export { getProfilePicture, getProfileBuffer, clearCache, DEFAULT_PP }