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
const path = './database/sider.json'

if (!fs.existsSync('./database')) fs.mkdirSync('./database')

if (!fs.existsSync(path)) {
fs.writeFileSync(path, JSON.stringify({ data: {} }, null, 2))
}

function loadDB(){
return JSON.parse(fs.readFileSync(path))
}

function saveDB(db){
fs.writeFileSync(path, JSON.stringify(db, null, 2))
}

// tambah chat
function addChat(chat,user){

let db = loadDB()

if(!db.data[chat]) db.data[chat] = {}
if(!db.data[chat][user]) db.data[chat][user] = 0

db.data[chat][user]++

saveDB(db)

}

// ambil ranking sider (paling pasif)
function getSiderRank(chat, members, limit = 10){

let db = loadDB()

let list = []

for(let m of members){

if(m.admin) continue

let total = db.data[chat]?.[m.id] || 0

list.push({
id: m.id,
chat: total
})

}

// urut dari paling sedikit chat
list.sort((a,b) => a.chat - b.chat)

return list.slice(0, limit)

}

// reset khusus group
function resetSider(chat){

let db = loadDB()

db.data[chat] = {}

saveDB(db)

}

export { addChat, getSiderRank, resetSider };
