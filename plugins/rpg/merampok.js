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
  name: "merampok",
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
    let who = m.mentionedJid?.[0]

    if (!m.isGroup) return m.reply('Command ini hanya untuk grup.')
    if (!who) return m.reply('Tag target yang ingin dirampok.')
    if (who === m.sender) return m.reply('Tidak bisa merampok diri sendiri.')

    let users = global.db.data.users
    let user = users[m.sender]
    let target = users[who]

    if (!target) return m.reply('Target tidak ditemukan di database.')

    let cooldown = 3600000
    let timers = cooldown - (Date.now() - user.lastrampok)

    if (Date.now() - user.lastrampok < cooldown) {
        return m.reply(
            `🦹 Kamu masih bersembunyi.\n\nTunggu ${clockString(timers)} lagi.`
        )
    }

    if (target.money < 10000) {
        return m.reply(
            '💸 Target terlalu miskin untuk dirampok.'
        )
    }

    let dapat = Math.floor(Math.random() * 50000) + 1000

    if (dapat > target.money) {
        dapat = target.money
    }

    target.money -= dapat
    user.money += dapat
    user.lastrampok = Date.now()

    conn.reply(
        m.chat,
        `
🦹 *BERHASIL MERAMPOK*

👤 Target : @${who.split('@')[0]}
💰 Hasil : ${dapat.toLocaleString('id-ID')} Money

🏃 Cepat kabur sebelum ketahuan!
        `.trim(),
        m,
        { mentions: [who] }
    )
}

handler.register = true

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60

    return [h, m, s]
        .map(v => v.toString().padStart(2, '0'))
        .join(':')
}

export { pluginConfig as config, handler };
