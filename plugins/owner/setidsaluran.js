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
    name: 'setidsaluran',
    category: 'owner',
    description: 'Mengganti semua ID saluran di SC',
    usage: '.gantiidsaluran|id',
    example: '.gantiidsaluran|120363xxxx@newsletter',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

async function handler(m) {

    let msg = m.text || ""
    let input = msg.split("|")[1]

    if (!input) {
        return m.reply("Contoh:\n.gantiidsaluran|120363xxxx@newsletter")
    }

    const newId = input.trim()

    function scan(dir){
        const files = fs.readdirSync(dir)

        for (let file of files){
            const full = path.join(dir, file)
            const stat = fs.statSync(full)

            if (stat.isDirectory()){
                scan(full)
            } else if (file.endsWith(".js")){
                let data = fs.readFileSync(full, "utf8")

                let replaced = data.replace(/\d+@newsletter/g, newId)

                fs.writeFileSync(full, replaced)
            }
        }
    }

    scan("./")

    await m.reply(`╭━━〔 ❤️ RIMURU SYSTEM ❤️ 〕━━⬣
┃ ✅ ID Saluran berhasil diganti
┃
┃ ID Baru :
┃ ${newId}
┃
┃ 🔄 Bot akan restart dalam 5 detik...
╰━━━━━━━━━━━━━━━━⬣`)

    setTimeout(() => {
        process.exit()
    }, 5000)
}

export { pluginConfig as config, handler };
