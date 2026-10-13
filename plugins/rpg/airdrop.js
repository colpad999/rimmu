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


const pluginConfig = {
  name: "airdrop",
  category: "rpg",
  description: "Imported from Rimuru MD V4.6",
  usage: "",
  example: "",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: false,
  cooldown: 3,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
    const conn = sock;
    const user = global.db.data.users[m.sender]
    const em = global.rpg.emoticon
    const timeout = 3600000

    let time = user.lastclaim + timeout

    if (Date.now() - user.lastclaim < timeout) {
        throw `🎁 Kamu sudah mencari Airdrop!\n\nTunggu ${clockString(time - Date.now())}`
    }

    let bot = Math.floor(Math.random() * 101)
    let player = Math.floor(Math.random() * 81)

    if (bot > player) {
        let trash = Math.floor(Math.random() * 50) + 1
        let wood = Math.floor(Math.random() * 50) + 1
        let rock = Math.floor(Math.random() * 50) + 1

        user.trash += trash
        user.wood += wood
        user.rock += rock

        await conn.sendFile(
            m.chat,
            'https://telegra.ph/file/60437ce6d807b605adf5e.jpg',
            'airdrop.jpg',
            `
📦 *Airdrop Biasa*

Kamu menemukan peti tua.

🎁 Hadiah:

${em('trash')} Trash: +${trash}
${em('wood')} Wood: +${wood}
${em('rock')} Rock: +${rock}
`.trim(),
            m
        )

    } else if (bot < player) {
        let limit = pickRandom([10, 20, 30])
        let money = pickRandom([10000, 100000, 500000])
        let diamond = pickRandom([1, 2, 3, 5])

        user.limit += limit
        user.money += money
        user.diamond += diamond

        await conn.sendFile(
            m.chat,
            'https://telegra.ph/file/d3bc1d7a97c62d3baaf73.jpg',
            'airdrop.jpg',
            `
🎁 *Airdrop Rare*

Selamat! Kamu mendapatkan hadiah langka.

${em('limit')} Limit: +${limit}
${em('money')} Money: +${money}
${em('diamond')} Diamond: +${diamond}
`.trim(),
            m
        )

    } else {
        let loss = Math.min(user.money, 100000)

        user.money -= loss

        await conn.sendFile(
            m.chat,
            'https://telegra.ph/file/5d71027ecbcf771b299fb.jpg',
            'zonk.jpg',
            `
💨 *Airdrop Zonk*

Kotaknya kosong...

${em('money')} Money: -${loss}
🎐 Isi: Angin
`.trim(),
            m
        )
    }

    user.lastclaim = Date.now()
}


function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
    let d = Math.floor(ms / 86400000)
    let h = Math.floor(ms / 3600000) % 24
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60

    return `${d} Hari ${h} Jam ${m} Menit ${s} Detik`
}

export { pluginConfig as config, handler };
