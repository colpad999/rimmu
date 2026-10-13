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
    name: "ambilfile",
    category: "owner",
    description: "Ambil file dari project bot tanpa perlu .js",
    usage: ".ambilfile <nama file>",
    example: ".ambilfile config",
    isOwner: true,
    cooldown: 5,
    isEnabled: true
}

// scan semua folder
function findFile(dir, name){
    const files = fs.readdirSync(dir)

    for(const file of files){

        const full = path.join(dir,file)
        const stat = fs.statSync(full)

        if(stat.isDirectory()){
            const result = findFile(full,name)
            if(result) return result
        }else{

            const base = file.replace(/\.[^/.]+$/,"")

            if(base.toLowerCase() === name.toLowerCase()){
                return full
            }
        }
    }

    return null
}

async function handler(m,{ sock }){

    let input = m.text?.trim()

    if(!input){
        return m.reply(
`╭━━〔 💖 RIMURU AMBIL FILE 💖 〕━━⬣
┃ Darling masukkan nama file~
┃
┃ Contoh:
┃ .ambilfile config
┃ .ambilfile handler
┃ .ambilfile gpt
╰━━━━━━━━━━━━━━━━⬣`
        )
    }

    m.react("⏳")

    try{

        const root = process.cwd()

        const found = findFile(root,input)

        if(!found){
            m.react("❌")
            return m.reply(`❌ File *${input}* tidak ditemukan 🗿`)
        }

        const fileName = path.basename(found)
        const time = new Date().toLocaleTimeString()

        const ui =
`╭━━〔 💖 RIMURU DOWNLOAD FILE 💖 〕━━⬣
┃ Darling aku temukan filenya~
┃
┃ 📦 Nama : ${fileName}
┃ 📂 Path : ${found.replace(root,"")}
┃ ⏰ Waktu : ${time}
╰━━━━━━━━━━━━━━━━⬣`

        await m.reply(ui)

        await sock.sendMessage(
            m.chat,
            {
                document: fs.readFileSync(found),
                fileName: fileName,
                mimetype: "application/octet-stream"
            }
        )

        m.react("✅")

    }catch(e){

        console.log(e)

        m.react("❌")

        return m.reply(
`╭━━〔 ❌ RIMURU SYSTEM ❌ 〕━━⬣
┃
┃ ${e.message}
╰━━━━━━━━━━━━━━━━⬣`
        )
    }
}

export { pluginConfig as config, handler };
