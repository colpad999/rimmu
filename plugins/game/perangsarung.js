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
  name: "perangsarung",
  category: "game",
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

async function handler(m, { sock, text }) {
    const conn = sock;
  if (!m.mentionedJid[0]) return conn.reply(m.chat, `Tag 1 orang untuk menantangnya bermain perang sarung!`, m)

  let target = m.mentionedJid[0]
  let player1 = { jid: m.sender, name: conn.getName(m.sender) }
  let player2 = { jid: target, name: conn.getName(target) }

  let players = [player1, player2]

  let intro = `⚔️ *PERANG SARUNG DIMULAI!!*\n\n${player1.name} vs ${player2.name}\n\nSiapakah yang akan menang?\n\n*Loading...*`
  await conn.reply(m.chat, intro, m, { mentions: [player1.jid, player2.jid] })

 
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  await conn.sendPresenceUpdate('composing', m.chat)
  await delay(3000)
  await conn.reply(m.chat, `💥 Keduanya mulai memutar sarung dengan gaya ninja!`, m)

  await conn.sendPresenceUpdate('composing', m.chat)
  await delay(3000)
  await conn.reply(m.chat, `⚡ Terdengar suara *"Plakkk!"* di udara...`, m)

  await conn.sendPresenceUpdate('composing', m.chat)
  await delay(2500)

  let winner = players[Math.floor(Math.random() * players.length)]
  let loser = players.find(p => p.jid !== winner.jid)

  await conn.reply(m.chat, `☠️ ${loser.name} tumbang terkena sarung karpet masjid`, m)
  await delay(2000)
  await conn.reply(m.chat, `🏆 *Pemenangnya adalah:* ${winner.name.toUpperCase()}!`, m)
}

handler.register = true

/*
SCRIPT BY © VYNAA VALERIE 
Modifikasi: By ZenzXD
*/

export { pluginConfig as config, handler };
