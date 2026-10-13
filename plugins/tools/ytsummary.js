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
    name: 'ytsummary',
    category: 'tools',
    description: 'Ringkasan video YouTube dengan AI',
    usage: '.ytsummarize <url>',
    example: '.ytsummarize https://youtu.be/xxxxx',
    isOwner: false,
    isPremium: true,
    isGroup: false,
    isPrivate: false,
    cooldown: 60,
    energi: 3,
    isEnabled: true
}

async function handler(m, { sock }) {
    const url = m.args[0]
    
    if (!url) {
        return m.reply(`📺 *ʏᴛ sᴜᴍᴍᴀʀɪᴢᴇ*\n\n> Masukkan URL YouTube\n\n\`Contoh: ${m.prefix}ytsummarize https://youtu.be/xxxxx\``)
    }
    
    if (!url.match(/youtu\.?be/i)) {
        return m.reply(`❌ URL YouTube tidak valid!`)
    }
    
    m.react('⏳')
    await m.reply(`📺 Meringkas video...\n> _Proses ini memerlukan waktu ±25 detik_`)
    
    try {
        const res = await axios.get(`https://api.nekolabs.web.id/tools/yt-summarizer/v2?url=${encodeURIComponent(url)}&language=id`, {
            timeout: 180000
        })
        
        if (!res.data?.success || !res.data?.result?.content) {
            m.react('❌')
            return m.reply(`❌ Gagal meringkas video`)
        }
        
        const data = res.data.result
        const content = data.content
        const duration = Math.floor(data.video_duration / 60)
        const thumbnail = data.video_thumbnail_url
        
        m.react('✅')
        
        let caption = `📺 *ʏᴛ sᴜᴍᴍᴀʀɪᴢᴇ*\n\n`
        caption += `> ⏱️ Durasi: ${duration} menit\n`
        caption += `> 🆔 Video ID: ${data.video_id}\n\n`
        caption += `${content.substring(0, 3500)}${content.length > 3500 ? '\n\n...(terpotong)' : ''}`
        
        if (thumbnail) {
            await sock.sendMessage(m.chat, {
                image: { url: thumbnail },
                caption: caption
            }, { quoted: m })
        } else {
            await m.reply(caption)
        }
        
    } catch (error) {
        m.react('❌')
        m.reply(`❌ *ᴇʀʀᴏʀ*\n\n> ${error.message}`)
    }
}

export { pluginConfig as config, handler };
