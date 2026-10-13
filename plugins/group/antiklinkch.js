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
  name: "antilinkch",
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

async function handler(m, { args, isAdmin, isOwner }) {
  if (!m.isGroup) return m.reply("Fitur ini hanya bisa dipakai di grup.")
  if (!(isAdmin || isOwner)) return m.reply("Khusus admin.")

  global.db.data.chats = global.db.data.chats || {}
  global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {}

  if (!args[0]) {
    return m.reply("Gunakan:\n.antilinkch on / off")
  }

  if (args[0] === "on") {
    if (global.db.data.chats[m.chat].antilinkch) {
      return m.reply("Antilink channel sudah aktif.")
    }
    global.db.data.chats[m.chat].antilinkch = true
    return m.reply("✅ Antilink channel berhasil diaktifkan.")
  }

  if (args[0] === "off") {
    if (!global.db.data.chats[m.chat].antilinkch) {
      return m.reply("Antilink channel sudah nonaktif.")
    }
    global.db.data.chats[m.chat].antilinkch = false
    return m.reply("❌ Antilink channel berhasil dimatikan.")
  }

  return m.reply("Opsi tidak valid.\nGunakan:\n.antilinkch on / off")
}

handler.before = async (m, { conn, isBotAdmin, usedPrefix, isAdmin }) => {
  if (!m.isGroup) return
  if (!isBotAdmin) return

  if (typeof m.text === "string") {
    const txt = m.text.toLowerCase()
    if (txt.startsWith((usedPrefix || ".") + "antilinkch")) return
  }

  global.db.data.chats = global.db.data.chats || {}
  global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {}

  if (!global.db.data.chats[m.chat].antilinkch) return

  let text = m.text || ''

  let isChannel = /https?:\/\/(www\.)?whatsapp\.com\/channel\/[^\s]+/i.test(text)

  if (!isChannel) return

  if (isAdmin) return

  try {
    await conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: m.key.id,
        participant: m.sender
      }
    })
  } catch {}

  let who = m.mentionedJid[0] || m.quoted?.sender || m.sender

  return conn.sendMessage(m.chat, {
    text: `@${who.split('@')[0]} dilarang share link saluran di sini.`,
    mentions: [who]
  })
}

handler.admin = true
handler.botAdmin = true

export { pluginConfig as config, handler };
