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
    name: 'sora',
    category: 'ai',
    description: 'Ubah gambar menjadi video (Sora 2)',
    usage: '.sora <prompt>',
    example: '.sora anime cinematic',
    cooldown: 20,
    energi: 1,
    isEnabled: true
}

let antiSpam = new Set()        
async function handler(m, { sock }) {
    const text = m.args.join(' ')
    if (!text) {
        return m.reply(
            `🎬 *SORA 2 – Image to Video*\n\n` +
            `Contoh:\n\`${m.prefix}sora anime cinematic\``
        )
    }

    if (antiSpam.has(m.sender)) {
        m.react('😀')
        return m.reply(`*MASIH ADA PROSES YANG BELUM SELESAI, HARAP DI TUNGGU!*`)
    }
    m.react('⏳')
    m.reply(`⏳ *NOTE*\n\n> Ini kayaknya bakal sampai 5 menit an, jadi harap di tunggu yahh.`)
    
    antiSpam.add(m.sender)
    let result
    try {
        const { data } = await axios.get(`https://fgsi.dpdns.org/api/ai/sora2?apikey=fgsiapi-26d2602d-6d&prompt=${encodeURIComponent(text)}&ratio=landscape&enhancePrompt=true`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        })

        const pollUrl = data.data.pollUrl

        while (true) {
            const pollRes = await axios.get(pollUrl)
            if (pollRes.data.data?.status == 'Success') {
                result = {
                    videoUrl: pollRes.data.data.result.resultUrls[0],
                    text_enhanced: pollRes.data.data.result.prompt_optimized
                }
                antiSpam.delete(m.sender)
                break
            }
            await new Promise(resolve => setTimeout(resolve, 20000))
        }

        await sock.sendMessage(
            m.chat,
            {
                video: { url: result.videoUrl },
                caption:
                    `✅ *Video berhasil dibuat!*\n\n` +
                    `📝 *Prompt:* ${text}\n` +
                    `🎬 *Model:* Sora 2 text to Video\n\n` +
                    `📝 *Prompt:* ${result.text_enhanced}`
            },
            { quoted: m }
        )
    } catch (e) {
        antiSpam.delete(m.sender)
        m.reply(`❌ Error: ${e.message}`)
    }
}

export { pluginConfig as config, handler };
