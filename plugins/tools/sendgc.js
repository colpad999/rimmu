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

export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Rimuru MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P";


import config from '../../config.js';
const pluginConfig = {
name: "sendgc",
category: "tools",
description: "Kirim pesan ke group tertentu",
usage: ".kirimpesangc pesan",
example: ".kirimpesangc ingat masa sewa kalian tinggal dikit",
isOwner: true,
cooldown: 5,
energi: 0,
isEnabled: true
}

const pendingMessage = new Map()

async function handler(m,{ sock }){

const args = m.args || []
const text = args.join(" ")

if (args[0] === "--send" && args[1]) {

const groupId = args[1]
const message = pendingMessage.get(m.sender)

if (!message) {
return m.reply("⚠️ Tidak ada pesan pending.")
}

try{

let meta = await sock.groupMetadata(groupId)
let groupName = meta.subject

const sendText = `
${message}

> Pesan dari : Owner bot
`

await sock.sendMessage(groupId,{ text: sendText })

await m.reply(`
╭━━━〔 💗 *PESAN TERKIRIM* 💗 〕━━━⬣
┃
┃ 🏠 Group :
┃ *${groupName}*
┃
┃ 📡 Status :
┃ *Berhasil terkirim*
┃
╰━━━━━━━━━━━━━━━━━━⬣
`)

pendingMessage.delete(m.sender)

}catch(e){

await m.reply(`
╭━━━〔 ⚠️ *GAGAL MENGIRIM* ⚠️ 〕━━━⬣
┃
┃ Alasan :
┃ ${e.message}
┃
╰━━━━━━━━━━━━━━━━━━⬣
`)

}

return
}

if (!text) {
return m.reply(`
╭━━━〔 💗 *RIMURU SEND GC* 💗 〕━━━⬣
┃
┃ Hai Owner 😋
┃
┃ Masukkan pesan yang
┃ ingin dikirim ke group
┃
┃ Contoh:
┃
┃ .kirimpesangc
┃ ingat masa sewa kalian tinggal dikit
┃
╰━━━━━━━━━━━━━━━━━━⬣
`)
}

pendingMessage.set(m.sender,text)

try{

const groups = await sock.groupFetchAllParticipating()
const groupList = Object.entries(groups)

if (groupList.length === 0){
return m.reply("⚠️ Bot tidak berada di group manapun.")
}

const rows = groupList.map(([id,meta])=>({
title: meta.subject || "Unknown Group",
description: id,
id: `.kirimpesangc --send ${id}`
}))

await sock.sendMessage(m.chat,{
text: `
╭━━━〔 💗 *PILIH GROUP TUJUAN* 💗 〕━━━⬣
┃
┃ Pilih group yang ingin
┃ dikirim pesan oleh bot
┃
┃ 📊 Total group :
┃ *${groupList.length}*
┃
╰━━━━━━━━━━━━━━━━━━⬣
`,
footer: "RIMURU BOT",
interactiveButtons: [
{
name: "single_select",
buttonParamsJson: JSON.stringify({
title: "📂 Pilih Group",
sections: [{
title: "Daftar Group",
rows: rows
}]
})
}
]
},{ quoted:m })

}catch(e){

m.reply(`
❌ Error mengambil group

${e.message}
`)

}

}

export { pluginConfig as config, handler };
