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
    name: "gachatomboy",
    category: "fun",
    description: "Gacha char anime tomboy random 100+ karakter",
    usage: ".gachatomboy",
    isEnabled: true
}

// List char tomboy, bisa ditambah sesuka hati
const tomboyList = [
"Misaki Ayuzawa","Haruhi Fujioka","Ruka Sarashina","Hikari Hanazono",
"Ushio","Makoto Kino","Souta","Yuki Nagato","Shikimori","Uzaki Hana",
"Tsuki Uzaki","Nagatoro","Chika Fujiwara","Ai Hayasaka","Akane Kurokawa",
"Ruby Hoshino","Frieren","Akira Asai","Tomoko Kuroki","Menma","Izumi Mom",
"Yukino Yukinoshita","Rikka Takarada","Chisato Nishikigi","Takina Inoue",
"Vivy","Shiraori","Anisphia Wynn Palletia","Euphyllia Magenta"
]

async function handler(m){
    const name = m.pushName || "Darling"
    const char = tomboyList[Math.floor(Math.random()*tomboyList.length)]
    const love = Math.floor(Math.random()*101)

    const statusList = [
        "💖 Cinta Sejati",
        "💘 Pasangan Serasi",
        "💕 Jodoh Anime",
        "💞 Relationship Goals",
        "💓 Bucin Maksimal",
        "💔 Hubungan Toxic 🗿"
    ]

    const status = statusList[Math.floor(Math.random()*statusList.length)]

    const responses = [
`╔═══『 💍 *GACHA TOMBOY* 』═══╗
┃
┃ 👤 Suami : *${name}*
┃ 👰 Tomboy : *${char}*
┃
┃ 💖 Love Meter : *${love}%*
┃ 📊 Status : *${status}*
┃
┃ Omedetou atas pernikahan kalian!
┃ Semoga langgeng selamanya ❤️
┃
╚════════════════════╝`,

`┏━━━〔 👰 *TOMBOY FOUND* 〕━━━┓
┃
┃ 🎉 Selamat!!
┃
┃ 👤 *${name}*
┃ ❤️ *${char}*
┃
┃ 💘 Kecocokan : *${love}%*
┃ 📊 Status : *${status}*
┃
┃ Jangan disia-siakan ya 😏
┗━━━━━━━━━━━━━━━━━━┛`,

`╭────〔 💞 *MATCHMAKING TOMBOY* 〕────╮
│
│ 👤 Player : *${name}*
│ 💖 Tomboy : *${char}*
│
│ 💓 Love Level : *${love}%*
│ 📊 Status : *${status}*
│
│ Sistem telah menjodohkan kalian
│ secara random 🗿
│
╰────────────────────╯`
    ]

    const reply = responses[Math.floor(Math.random()*responses.length)]
    await m.reply(reply)
}
export { pluginConfig as config, handler };