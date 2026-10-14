//

import fs from 'fs';
import path from 'path';
const pluginConfig = {
    name: "getfile",
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
`╭━━〔 💖 YALENA AMBIL FILE 💖 〕━━⬣
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
`╭━━〔 💖 YALENA DOWNLOAD FILE 💖 〕━━⬣
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
`╭━━〔 ❌ YALENA SYSTEM ❌ 〕━━⬣
┃
┃ ${e.message}
╰━━━━━━━━━━━━━━━━⬣`
        )
    }
}

export { pluginConfig as config, handler };
