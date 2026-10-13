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

const pluginConfig = {
    name: "gachafemboy",
    category: "fun",
    description: "Gacha femboy anime random",
    usage: ".gachafemboy",
    cooldown: 3,
    isEnabled: true
}

const femboyList = [

"Astolfo",
"Felix Argyle",
"Hideri Kanzaki",
"Ruka Urushibara",
"Gasper Vladi",
"Saika Totsuka",
"Nagisa Shiota",
"Chihiro Fujisaki",
"Ritsu Sohma",
"Kurapika",
"Haku",
"Rimuru Tempest",
"Hideyoshi Kinoshita",
"Tetra",
"Juuzou Suzuya",
"Armin Arlert",
"Kalluto Zoldyck",
"Alluka Zoldyck",
"Gowther",
"Mare Bello Fiore",
"Bridget",
"Venti",
"Lyney",
"Xingqiu",
"Shun Kaidou",
"Kazuto Kirigaya (GGO Avatar)",
"Chihiro Fujisaki",
"Hideyoshi",
"Saika Totsuka",
"Felix Argyle",
"Astolfo Rider",
"Gasper Vladi",
"Haku (Naruto)",
"Nagisa Shiota",
"Rimuru Human Form"

]

async function handler(m){

const name = m.pushName || "Darling"
const femboy = femboyList[Math.floor(Math.random()*femboyList.length)]
const love = Math.floor(Math.random()*101)

const statusList = [
"💖 Terpesona",
"💘 Bikin Bingung Gender",
"💕 Imut Banget",
"💞 Terlalu Cantik",
"🔥 Femboy Idaman",
"😳 Kamu Tertipu"
]

const status = statusList[Math.floor(Math.random()*statusList.length)]

const responses = [

`╔═══『 🌸 *GACHA FEMBOY* 』═══╗
┃
┃ 👤 Player : *${name}*
┃ 🎀 Femboy : *${femboy}*
┃
┃ 💖 Love Meter : *${love}%*
┃ 📊 Status : *${status}*
┃
┃ Selamat kamu dapat
┃ femboy anime 😳
┃
╚════════════════════╝`,

`┏━━━〔 🎀 *FEMBOY FOUND* 〕━━━┓
┃
┃ 👤 *${name}*
┃ 💕 *${femboy}*
┃
┃ 💘 Kecocokan : *${love}%*
┃ 📊 Status : *${status}*
┃
┃ Cantik... eh cowok 🗿
┃
┗━━━━━━━━━━━━━━━━━━┛`,

`╭────〔 🌸 *TRAP DETECTED* 〕────╮
│
│ 👤 Player : *${name}*
│ 🎀 Character : *${femboy}*
│
│ 💓 Love Level : *${love}%*
│ 📊 Status : *${status}*
│
│ Hati-hati...
│ bisa bikin bingung 😏
│
╰──────────────────────╯`,

`╔═══〔 🤨 *WARNING* 〕═══╗
║
║ 👤 Player : *${name}*
║ 🎀 Character : *${femboy}*
║
║ 💖 Love : *${love}%*
║
║ 🤨 Kamu gak belok
║ nanti nya kan?
║
║ 🗿 Semoga masih
║ lurus ya bro...
║
╚════════════════════╝`

]

const reply = responses[Math.floor(Math.random()*responses.length)]

await m.reply(reply)

}
export { pluginConfig as config, handler };