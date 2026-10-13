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

import yts from 'yt-search';
import axios from 'axios';
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Rimuru MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P";


import config from '../../config.js';
const pluginConfig = {
    name: "play4",
    category: "search",
    description: "Putar musik dari YouTube (Faa API)",
    usage: ".play4 <query>",
    example: ".play4 komang",
    cooldown: 15,
    energi: 1,
    isEnabled: true
}

async function handler(m, { sock, text }) {
    const query = m.text?.trim()
    if (!query) return m.reply(`🖤 *𝒁𝑬𝑹𝑶 𝑻𝑾𝑶 𝑺𝑻𝑨𝑮𝑬*\n\n> Contoh:\n\`${m.prefix}play4 komang\``)

    m.react("🖤")

    try {
        const search = await yts(query)
        if (!search.videos.length) throw "Video tidak ditemukan"
        
        const video = search.videos[0]

        const rows = search.videos?.map((v, i) => {
            return {
                header: v.title,
                title: v.author.name,
                description: `🖤 Darling, pilih musik ini`,
                id: `${m.prefix}putar-play2 ${v.url}`
            }
        })

        await sock.sendMessage(m.chat, {
            image: { url: video.thumbnail },
            caption: `
╭━━━〔 🖤 𝒁𝑬𝑹𝑶 𝑻𝑾𝑶 𝑺𝑻𝑨𝑮𝑬 🖤 〕━━━⬣
┃ 🎧 Darling...
┃ Kamu ingin mendengarkan ini?
┃
┃ 🎶 Title : ${video.title}
┃ 📺 Channel : ${video.author.name}
┃ ⏱ Durasi : ${video.duration}
┃
┃ 🩸 「Aku akan menemanimu...」
╰━━━〔 💔 𝑭𝑨𝑪𝑬𝑳𝑬𝑺𝑺 𝟎𝟐 💔 〕━━━⬣
            `.trim(),

            footer: "🖤 Faceless 02 System",
            interactiveButtons: [
                {
                    name: 'quick_reply',
                    buttonParamsJson: JSON.stringify({
                        display_text: '🖤 PUTAR SEKARANG',
                        id: `${m.prefix}putar-play2 ${video.url}`
                    })
                },
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: '🖤 Musik Lainnya',
                        sections: [
                            {
                                title: 'Pilihan untukmu, Darling',
                                rows
                            }
                        ]
                    })
                }
            ]
        }, { quoted: m })

        m.react("💫")

    } catch (err) {
        console.error('[Play2]', err)
        m.react("❌")
        m.reply(`💔 Darling... terjadi error\n\n${err.message || err}`)
    }
}

export { pluginConfig as config, handler };
