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
name: "uploadpreset",
category: "owner",
description: "Upload preset ke channel",
usage: ".uppreset link5mb | linkxml | caption",
example: ".uppreset https://5mb.link | https://xml.link | preset jj anime",
isOwner: true,
cooldown: 5,
isEnabled: true
}

async function handler(m,{ sock }){

if(!m.text) return

const text = m.text.split("|").map(v => v.trim())

const link5mb = text[0]
const linkxml = text[1]
const captionUser = text[2] || "Preset baru"

if(!link5mb || !linkxml){
return m.reply(
`╭━━〔 *❤️ RIMURU PRESET UPLOADER* 〕━━⬣
┃
┃ *Format :*
┃
┃ .uppreset link5mb | xml | caption
┃
┃ *Contoh :*
┃ .uppreset https://5mb.link | https://xml.link | preset jj anime
┃
╰━━━━━━━━━━━━━━━━⬣`
)
}

m.react("⏳")

try{

const time = new Date().toLocaleTimeString()

const caption =
`╭━━〔 *❤️ RIMURU PRESET STORE* 〕━━⬣
┃
┃ ✨ *${captionUser}*
┃
┃ 📦 *Link 5MB*
┃ ${link5mb}
┃
┃ 📂 *Link XML*
┃ ${linkxml}
┃
┃ 👑 *Uploader*
┃ ${m.pushName}
┃
┃ ⏰ *Waktu*
┃ ${time}
┃
┃ 💌 *Ara Ara Darling~*
┃ *Preset baru sudah rilis ❤️*
┃
╰━━━━━━━━━━━━━━━━⬣`

await sock.sendMessage(
CHANNEL_ID,
{ text: caption }
)

m.react("✅")

return m.reply(
`╭━━〔 *❤️ RIMURU SYSTEM* 〕━━⬣
┃
┃ ✅ *Preset berhasil dikirim*
┃
┃ 📡 *Sudah masuk ke channel*
┃
┃ 👑 *Uploader*
┃ ${m.pushName}
┃
╰━━━━━━━━━━━━━━━━⬣`
)

}catch(e){

console.log(e)

m.react("❌")

return m.reply(
`╭━━〔 *❌ ERROR SYSTEM* 〕━━⬣
┃
┃ ${e.message}
┃
╰━━━━━━━━━━━━━━━━⬣`
)

}

}

export { pluginConfig as config, handler };
