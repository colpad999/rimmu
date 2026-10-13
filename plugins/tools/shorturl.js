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
export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Rimuru MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P";
const pluginConfig = {
    name: 'shorturl',
    category: 'tools',
    description: 'Shorten URL dengan Bitly',
    usage: '.bitly <url>',
    example: '.bitly https://google.com',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const url = m.args[0]
    
    if (!url) {
        return m.reply(`🔗 *ʙɪᴛʟʏ sʜᴏʀᴛʟɪɴᴋ*\n\n> Masukkan URL\n\n\`Contoh: ${m.prefix}bitly https://google.com\``)
    }
    
    if (!url.match(/^https?:\/\//i)) {
        return m.reply(`❌ URL tidak valid! Harus dimulai dengan http:// atau https://`)
    }
    
    m.react('🔗')
    
    try {
        const res = await axios.get(`https://api.nekolabs.web.id/tools/shortlink/bitly?url=${encodeURIComponent(url)}`, {
            timeout: 30000
        })
        
        if (!res.data?.success || !res.data?.result) {
            m.react('❌')
            return m.reply(`❌ Gagal memperpendek URL`)
        }
        
        const shortUrl = res.data.result
        
        m.react('✅')
        
        await sock.sendMessage(m.chat, {
            text: `🔗 *ʙɪᴛʟʏ sʜᴏʀᴛʟɪɴᴋ*\n\n> *Original:* ${url.substring(0, 50)}${url.length > 50 ? '...' : ''}\n> *Short:* ${shortUrl}`,
            contextInfo: {
                externalAdReply: {
                    title: 'Bitly Shortlink',
                    body: shortUrl,
                    sourceUrl: shortUrl,
                    mediaType: 1
                }
            }
        }, { quoted: m })
        
        await sock.sendMessage(m.chat, {
            text: shortUrl,
            interactiveMessage: {
                body: { text: `🔗 *ʙɪᴛʟʏ sʜᴏʀᴛʟɪɴᴋ*\n\n${shortUrl}` },
                nativeFlowMessage: {
                    buttons: [
                        {
                            name: 'cta_copy',
                            buttonParamsJson: JSON.stringify({
                                display_text: '📋 Copy Link',
                                copy_code: shortUrl
                            })
                        }
                    ]
                }
            }
        })
        
    } catch (error) {
        m.react('❌')
        m.reply(`❌ *ᴇʀʀᴏʀ*\n\n> ${error.message}`)
    }
}

export { pluginConfig as config, handler };
