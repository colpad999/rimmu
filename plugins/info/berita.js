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
import * as cheerio from 'cheerio'
import te from '../../src/lib/rimuru-error.js'
const pluginConfig = {
    name: ['antara', 'cnn', 'cnbc', 'sindonews', 'berita'],
    category: 'berita',
    description: 'Mendapatkan berita terkini dari berbagai sumber',
    usage: '.berita <sumber>',
    example: '.kompas atau .berita cnn',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 10,
    energi: 1,
    isEnabled: true
}

const NEWS_SOURCES = {
    antara: {
        url: 'https://www.antaranews.com/rss/terkini.xml',
        name: 'Antara News',
        emoji: '📰'
    },
    cnn: {
        url: 'https://www.cnnindonesia.com/nasional/rss',
        name: 'CNN Indonesia',
        emoji: '📺'
    },
    cnbc: {
        url: 'https://www.cnbcindonesia.com/rss',
        name: 'CNBC Indonesia',
        emoji: '💹'
    },
    sindonews: {
        url: 'https://international.sindonews.com/rss',
        name: 'Sindo News',
        emoji: '📰'
    },
}

async function fetchRSS(url) {
    const response = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 15000
    })
    
    const $ = cheerio.load(response.data, { xmlMode: true })
    const items = []
    
    $('item').each((i, el) => {
        if (i >= 10) return false
        
        const title = $(el).find('title').text().trim()
        const link = $(el).find('link').text().trim()
        const pubDate = $(el).find('pubDate').text().trim()
        const description = $(el).find('description').text().trim()
            .replace(/<[^>]*>/g, '')
            .substring(0, 150)
        
        if (title && link) {
            items.push({ title, link, pubDate, description })
        }
    })
    
    return items
}

function formatDate(dateStr) {
    try {
        const date = new Date(dateStr)
        return date.toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    } catch {
        return dateStr
    }
}

async function handler(m) {
    const cmd = m.command.toLowerCase()
    let source = cmd
    
    if (cmd === 'berita') {
        const arg = m.text?.toLowerCase()?.trim()
        if (!arg) {
            let txt = `📰 *ᴅᴀꜰᴛᴀʀ sᴜᴍʙᴇʀ ʙᴇʀɪᴛᴀ*\n\n`
            for (const [key, val] of Object.entries(NEWS_SOURCES)) {
                txt += `> ${val.emoji} \`${m.prefix}${key}\` - ${val.name}\n`
            }
            txt += `\n_Atau gunakan: \`${m.prefix}berita <sumber>\`_`
            return m.reply(txt)
        }
        
        if (!NEWS_SOURCES[arg]) {
            return m.reply(`❌ Sumber berita tidak ditemukan.\n> Gunakan: \`${m.prefix}berita\` untuk melihat daftar.`)
        }
        source = arg
    }
    
    const newsSource = NEWS_SOURCES[source]
    if (!newsSource) {
        return m.reply(`❌ Sumber berita tidak valid.`)
    }
    
    await m.react('🕕')
    
    try {
        const articles = await fetchRSS(newsSource.url)
        
        if (articles.length === 0) {
            return m.reply(`❌ Tidak ada berita ditemukan.`)
        }
        
        let txt = `${newsSource.emoji} *${newsSource.name.toUpperCase()}*\n`
        txt += `━━━━━━━━━━━━━━━\n\n`
        
        for (let i = 0; i < Math.min(articles.length, 7); i++) {
            const article = articles[i]
            txt += `*${i + 1}. ${article.title}*\n`
            if (article.description) {
                txt += `${article.description?.trim()}...\n`
            }
            txt += `🔗 ${article.link}\n`
            if (article.pubDate) {
                txt += `📅 _${formatDate(article.pubDate)}_\n`
            }
            txt += `\n`
        }
        
        txt += `━━━━━━━━━━━━━━━\n`
        txt += `_Total: ${articles.length} artikel tersedia_`
        
        await m.reply(txt)
        m.react('📰')
        
    } catch (err) {
        m.react('☢')
        return m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }