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
    name: 'brain',
    category: 'search',
    description: 'Cari jawaban di Brainly',
    usage: '.brainly <pertanyaan>',
    example: '.brainly 1+1',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

function stripHtml(html) {
    return html?.replace(/<[^>]*>/g, '').replace(/\[tex\]|\[\/tex\]/g, '').trim() || ''
}

async function handler(m, { sock }) {
    const query = m.text?.trim()
    
    if (!query) {
        return m.reply(
            `⚠️ *ᴄᴀʀᴀ ᴘᴀᴋᴀɪ*\n\n` +
            `> \`${m.prefix}brainly <pertanyaan>\`\n\n` +
            `> Contoh:\n` +
            `> \`${m.prefix}brainly apa itu fotosintesis\``
        )
    }
    
    try {
        const res = await axios.get(`https://api.nekolabs.web.id/dsc/brainly/search?q=${encodeURIComponent(query)}`)
        
        if (!res.data?.success || !res.data?.result?.length) {
            return m.reply(`❌ Tidak ditemukan jawaban untuk: ${query}`)
        }
        
        const results = res.data.result.slice(0, 3)
        
        let txt = `📚 *ʙʀᴀɪɴʟʏ sᴇᴀʀᴄʜ*\n\n`
        txt += `> Query: *${query}*\n`
        txt += `━━━━━━━━━━━━━━━\n\n`
        
        results.forEach((r, i) => {
            const q = r.question
            if (!q?.answer) return
            
            const question = stripHtml(q.content).substring(0, 100)
            const answer = stripHtml(q.answer.content).substring(0, 300)
            const author = q.answer.author?.nick || 'Anonymous'
            const rating = q.answer.rating?.toFixed(1) || '-'
            const subject = q.subject?.name || '-'
            const grade = q.grade?.name || '-'
            
            txt += `╭─「 📝 *ᴊᴀᴡᴀʙᴀɴ ${i + 1}* 」\n`
            txt += `┃ 📖 \`${subject}\` • \`${grade}\`\n`
            txt += `┃\n`
            txt += `┃ ❓ *ᴘᴇʀᴛᴀɴʏᴀᴀɴ:*\n`
            txt += `┃ ${question}${question.length >= 100 ? '...' : ''}\n`
            txt += `┃\n`
            txt += `┃ ✅ *ᴊᴀᴡᴀʙᴀɴ:*\n`
            txt += `┃ ${answer}${answer.length >= 300 ? '...' : ''}\n`
            txt += `┃\n`
            txt += `┃ 👤 \`${author}\` • ⭐ \`${rating}/5\`\n`
            txt += `╰━━━━━━━━━━━━━━\n\n`
        })
        
        return m.reply(txt.trim())
        
    } catch (err) {
        return m.reply(`❌ *ɢᴀɢᴀʟ*\n\n> ${err.message}`)
    }
}

export { pluginConfig as config, handler };
