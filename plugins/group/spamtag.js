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


/*

# Fitur : spamtag
# Type : Plugins ESM
# Created by : https://whatsapp.com/channel/0029VbAXI4B1iUxRoQ1aQF24
# Api : lokal

   ⚠️ _Note_ ⚠️
jangan hapus wm ini banggg

*/

const pluginConfig = {
  name: "spamtag",
  category: "group",
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

const handler = async (m, { conn, text, args, participants }) => {
  try {
    if (!text) return m.reply('❌ Tag orangnya dulu bang, contoh: .spamtag @user')

    const mention = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : ''
    if (!mention) return m.reply('❌ Tag yang bener bang, harus pakai @user')

    const ownerNumber = '6287823745178' 
    const user = db.data.users[m.sender]
    const isOwner = m.sender.includes(ownerNumber)

    const limit = isOwner ? 10 : user?.premium ? 5 : 3

    for (let i = 0; i < limit; i++) {
      await delay(700)
      await conn.sendMessage(m.chat, {
        text: `@${mention.split('@')[0]}`,
        mentions: [mention]
      }, { quoted: m })
    }

    await conn.sendMessage(m.chat, { text: '✅ Dah tu spam tag' }, { quoted: m })

  } catch (e) {
    m.reply(`❌ Error\nLogs error : ${e.message}`)
  }
}

handler.admin = true
handler.botAdmin = false

function delay(ms) {
  return new Promise(res => setTimeout(res, ms))
}

export { pluginConfig as config, handler };
