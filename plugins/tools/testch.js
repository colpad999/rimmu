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

import config from '../../config.js';
const pluginConfig = {
    name: 'testch',
    category: 'tools',
    description: 'Test autopost ke channel sekarang',
    usage: '.tesautopostch [pagi/siang/sore/malam]',
    example: '.tesautopostch pagi',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    try {
        const input = (m.args[0] || '').toLowerCase()
        const valid = ['pagi', 'siang', 'sore', 'malam']

        let type = valid.includes(input)
            ? input
            : valid[Math.floor(Math.random() * valid.length)]

        // 🔥 CEK GLOBAL FUNCTION
        if (typeof global.sendPost !== 'function') {
            return m.reply('❌ sendPost belum terdeteksi di global')
        }

        await global.sendPost(type)

        await sock.sendMessage(m.chat, {
            text: `╭━━━〔 💗 TEST AUTOPOST 〕━━━⬣
┃ Status: ✅ Berhasil
┃ Tipe: ${type}
┃
┃ Rimuru udah kirim duluan 😈
╰━━━━━━━━━━━━━━━━⬣`
        }, { quoted: m })

    } catch (e) {
        console.log('TEST AUTOPOST ERROR:', e)

        m.reply(`❌ Error test autopost\n${e.message}`)
    }
}

export { pluginConfig as config, handler };
