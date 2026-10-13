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
import axios from 'axios';
const pluginConfig = {
name: "checkplugin",
category: "owner",
description: "Scan plugin error dan API mati",
usage: ".scanplugin",
isOwner: true,
cooldown: 5,
isEnabled: true
}

async function handler(m,{ sock }){

const pluginsDir = path.join(process.cwd(),'plugins')

let total = 0
let errorPlugins = []
let deadApi = []

const folders = fs.readdirSync(pluginsDir)

for (const folder of folders){

const folderPath = path.join(pluginsDir,folder)

if (!fs.statSync(folderPath).isDirectory()) continue

const files = fs.readdirSync(folderPath).filter(v=>v.endsWith('.js'))

for (const file of files){

total++

const filePath = path.join(folderPath,file)

try{

const code = fs.readFileSync(filePath,'utf8')

/* cek syntax */
new Function(code)

/* cek api */
const apiMatch = code.match(/https?:\/\/[^\s'"]+/g)

if(apiMatch){

for(const url of apiMatch){

try{
await axios.get(url,{timeout:4000})
}catch{
deadApi.push(`${folder}/${file}`)
break
}

}

}

}catch{

errorPlugins.push(`${folder}/${file}`)

}

}

}

let normal = total - errorPlugins.length - deadApi.length

let text =
`╭─〔 ❤️ RIMURU SCAN PLUGIN 〕
│
│ 📦 Total Plugin : ${total}
│ ✅ Normal : ${normal}
│ ❌ Error : ${errorPlugins.length}
│ ☠️ API Mati : ${deadApi.length}
│`

if(errorPlugins.length){

text += `

├─ Plugin Error
${errorPlugins.map(v=>`│ • ${v}`).join('\n')}`

}

if(deadApi.length){

text += `

├─ API Mati
${deadApi.map(v=>`│ • ${v}`).join('\n')}`

}

text += `

╰────────────`

m.reply(text)

}

export { pluginConfig as config, handler };
