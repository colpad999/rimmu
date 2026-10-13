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

import config from "../../config.js";

const CHANNEL_ID = config.saluran?.id

const pluginConfig = {
    name: "setppsaluran",
    category: "owner",
    description: "Ganti PP channel dan kirim notifikasi ke channel",
    usage: ".setppsaluran (reply gambar)",
    example: ".setppsaluran",
    isOwner: true,
    cooldown: 5,
    isEnabled: true
}

import sharp from 'sharp' // resize & convert

async function handler(m,{ sock }){

    const quoted = m.quoted
    if(!quoted) return m.reply(
`╭━━〔 *❤️ RIMURU SET PP CHANNEL* 〕━━⬣
┃ Reply gambar dengan command ini
┃ lalu kirim *.setppsaluran*
╰━━━━━━━━━━━━━━━━⬣`
    )

    const message = quoted.message
    let imageBuffer = null

    if(message.imageMessage || (message.viewOnceMessage && message.viewOnceMessage.message?.imageMessage)){
        imageBuffer = await quoted.download()
    }

    if(!imageBuffer) return m.reply(
`╭━━〔 *❌ RIMURU SET PP CHANNEL* 〕━━⬣
┃ ❌ Pesan yang direply bukan gambar
╰━━━━━━━━━━━━━━━━⬣`
    )

    m.react("⏳")

    try{
        // Resize & convert image
        const finalBuffer = await sharp(imageBuffer)
            .resize({ width: 720, withoutEnlargement: true })
            .jpeg({ quality: 90 })
            .toBuffer()

        // Update PP channel
        await sock.updateProfilePicture(CHANNEL_ID, finalBuffer)

        // Kirim info ke channel (UI Rimuru)
        const time = new Date().toLocaleTimeString()
        const infoMsg =
`╭─〔 💖 RIMURU CHANNEL UPDATE 💖 〕
│
│ Darling, ada PP baru nih 😋
│
│ 👑 Dari : ${m.pushName}
│ ⏰ Waktu : ${time}
│
│ 🎨 PP Channel berhasil diupdate!
│
│ Ara ara~ Terima kasih sudah
│ kirim gambar lucu ini ❤️
╰────────────`

        await sock.sendMessage(CHANNEL_ID,{ text: infoMsg })

        // Feedback ke user
        m.react("✅")
        return m.reply(
`╭━━〔 *❤️ RIMURU SYSTEM* 〕━━⬣
┃ ✅ PP Channel berhasil diupdate!
┃ Darling, channel sudah dikasih info 😋
╰━━━━━━━━━━━━━━━━⬣`
        )

    }catch(e){
        console.log(e)
        m.react("❌")
        return m.reply(
`╭━━〔 *❌ RIMURU SYSTEM* 〕━━⬣
┃ ${e.message}
╰━━━━━━━━━━━━━━━━⬣`
        )
    }

}

export { pluginConfig as config, handler };
