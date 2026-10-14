//

import fs from 'fs';
import path from 'path';
export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";
const pluginConfig = {
    name: 'ch',
    category: 'main',
    description: 'Join saluran resmi Yalena 😈',
    usage: '.saluran',
    cooldown: 5,
    isEnabled: true
}

async function handler(m, { sock }) {

    const chBot = 'https://whatsapp.com/channel/0029VbAh3OwGOj9nf1CHs23U'
    const chOwner = 'https://whatsapp.com/channel/0029VbC4yrn1noz15LrD810G'
    const chSticker = 'https://whatsapp.com/channel/0029Vb6GP9WLY6dDvo6KYv1i'

    // 🖼️ ambil gambar
    const imgPath = path.join(process.cwd(), 'assets', 'images', 'zerotwo2.jpg')
    let imageBuffer = null

    if (fs.existsSync(imgPath)) {
        imageBuffer = fs.readFileSync(imgPath)
    } else {
        return m.reply('❌ Gambar zerotwo2.jpg gak ditemukan di assets/images/')
    }

    const caption = 
`╭━━━〔 💗 YALENA CHANNEL 💗 〕━━━⬣
┃
┃ Ara ara~ 😏
┃ Kamu mau tetap dekat denganku kan, darling?
┃
┃ Jangan sampai ketinggalan info penting ya…
┃ Aku gak suka kalau kamu telat tau sesuatu 😌
┃
┣━━━〔 📢 WAJIB DI IKUTI 〕━━━⬣
┃ 💗 Saluran Bot (WAJIB)
┃ Tempat update, info, dan fitur baru!
┃
┃ ⚠️ Tidak join?
┃ ➜ Fitur bisa dibatasi 😈
┃
┣━━━〔 🌸 OPTIONAL 〕━━━⬣
┃ 👑 Saluran Owner
┃ Liat update & behind the scene~
┃
┃ 🎭 Saluran Sticker Yalena
┃ Biar chat kamu makin hidup 💕
┃
╰━━━⬣
“Kalau kamu mengabaikanku…
aku bisa saja mengabaikanmu juga, darling 😌💔”
`

    try {

        await sock.sendMessage(m.chat, {
            image: imageBuffer,
            caption: caption,
            footer: 'Yalena 💗',
            interactiveButtons: [
                {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: '💗 Join Saluran Bot',
                        url: chBot
                    })
                },
                {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: '👑 Saluran Owner',
                        url: chOwner
                    })
                },
                {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: '🎭 Sticker Yalena',
                        url: chSticker
                    })
                }
            ]
        }, { quoted: m })

    } catch (err) {
        console.log(err)
        m.reply('❌ Gagal kirim saluran 😢')
    }

}

export { pluginConfig as config, handler };
