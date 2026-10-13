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

import fs from 'fs';
import path from 'path';
const pluginConfig = {
    name: 'gantiapi',
    category: 'owner',
    description: 'Mengganti API di plugin tertentu',
    usage: '.gantiapi <plugin> <api>',
    example: '.gantiapi tomediafire sk-xxxx',
    isOwner: true,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

async function handler(m) {

    const args = m.args || []

    if (args.length < 2) {
        return m.reply(
`╭━━〔 💗 RIMURU API SYSTEM 💗 〕━━⬣
┃
┃ Darling, formatnya salah 😖
┃
┃ Contoh :
┃ .gantiapi tomediafire sk-xxxx
┃
╰━━━━━━━━━━━━━━━━⬣`)
    }

    const pluginName = args[0]
    const newApi = args.slice(1).join(' ')

    const pluginPath = path.join(process.cwd(), 'plugins', `${pluginName}.js`)

    if (!fs.existsSync(pluginPath)) {
        return m.reply(
`╭━━〔 ❌ RIMURU SYSTEM 〕━━⬣
┃ Plugin *${pluginName}* tidak ditemukan
╰━━━━━━━━━━━━━━━━⬣`)
    }

    try {

        let file = fs.readFileSync(pluginPath, 'utf8')

        const apiRegex = /(apiKey\s*[:=]\s*['"`])(.*?)(['"`])/i

        if (!apiRegex.test(file)) {
            return m.reply(
`╭━━〔 ⚠️ RIMURU SYSTEM 〕━━⬣
┃ API tidak ditemukan di plugin
┃ *${pluginName}*
╰━━━━━━━━━━━━━━━━⬣`)
        }

        file = file.replace(apiRegex, `$1${newApi}$3`)

        fs.writeFileSync(pluginPath, file)

        await m.reply(
`╭━━〔 💗 RIMURU API UPDATED 💗 〕━━⬣
┃
┃ Plugin : *${pluginName}*
┃ API baru : *${newApi}*
┃
┃ API berhasil diganti darling 😋
┃ Jangan lupa restart bot ya
┃
╰━━━━━━━━━━━━━━━━⬣`
        )

    } catch (err) {

        m.reply(
`╭━━〔 ❌ RIMURU ERROR 〕━━⬣
┃ ${err.message}
╰━━━━━━━━━━━━━━━━⬣`)
    }

}

export { pluginConfig as config, handler };
