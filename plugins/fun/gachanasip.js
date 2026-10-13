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
    name: "gachanasip",
    category: "fun",
    description: "Random nasip / hoki / keberuntungan buat user",
    usage: ".gachanasip",
    isEnabled: true
}

// List nasip / hoki / sial lucu
const nasipList = [
"Hari ini hoki banget, rezeki nyangkut di jalan 😎",
"Sedikit sial, hati-hati dengan benda tajam 🗡️",
"Nasip biasa aja, tapi senyummu manis ❤️",
"Rejeki datang tak terduga, siap-siap senyum 😏",
"Hari ini banyak godaan, tapi kamu kuat 💪",
"Nasip baik, kemungkinan dapat hadiah kecil 🎁",
"Sedikit sial, jangan lupa bawa payung ☂️",
"Nasip gokil! Orang jatuh cinta sama kamu hari ini 🥰",
"Peruntungan naik, tapi jangan sombong ya 😉",
"Nasip netral, santai aja dan nikmati hari 😎"
]

async function handler(m){
    const name = m.pushName || "Darling"
    const nasip = nasipList[Math.floor(Math.random()*nasipList.length)]

    const responses = [
`╭─〔 💖 RIMURU GACHA NASIP 💖 〕─╮
│ Darling, nih nasipmu hari ini 😋
│
│ 👤 Player : *${name}*
│ 🍀 Nasip : *${nasip}*
│
│ Ara ara~ semoga harimu menyenangkan ❤️
╰────────────`,

`╔═══『 💞 NASIP GACHA 』═══╗
┃ Darling, yuk cek nasipmu!
┃
┃ 👤 Player : *${name}*
┃ 🌟 Nasip : *${nasip}*
┃
┃ Ara ara~ semoga hoki terus 😏
╚════════════════════╝`,

`┏━━━〔 💫 NASIPMU 〕━━━┓
┃
┃ 👤 Player : *${name}*
┃ 🎲 Nasip : *${nasip}*
┃
┃ Ara ara~ semoga rezeki & hoki selalu menyertaimu 🗿
┗━━━━━━━━━━━━━━━━━━┛`
    ]

    const reply = responses[Math.floor(Math.random()*responses.length)]
    await m.reply(reply)
}

export { pluginConfig as config, handler };
