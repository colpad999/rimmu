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

import config from '../../config.js'
import { getDatabase } from '../../src/lib/rimuru-database.js'

const pluginConfig = {
  name: 'payment',
  category: 'owner',
  description: 'Menampilkan info payment',
  usage: '.payment',
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 0,
  isEnabled: true
}

function buildPaymentText(paymentCfg, customText, botName, ownerName) {
  const methods = (paymentCfg.methods || []).filter(m => m.number)
  const banks = (paymentCfg.banks || []).filter(b => b.number)

  if (customText) {
    return customText
      .replace(/\{botname\}/gi, botName)
      .replace(/\{owner\}/gi, ownerName)
      .replace(/\{methods\}/gi, methods.map(m => `• *${m.name}*: ${m.number} (${m.holder || m.name})`).join('\n'))
      .replace(/\{banks\}/gi, banks.map(b => `• *${b.name}*: ${b.number} (${b.holder || b.name})`).join('\n'))
      .replace(/\{qris\}/gi, paymentCfg.qrisUrl ? '✅ Tersedia' : '❌ Belum diatur')
  }

  let text = `💳 *P A Y M E N T*\n`
  text += `━━━━━━━━━━━━━━━━━━\n\n`

  if (methods.length > 0) {
    text += `📱 *E-Wallet:*\n`
    for (const m of methods) {
      text += `├─ • *${m.name}*\n`
      text += `│  \`${m.number}\`\n`
      if (m.holder) text += `│  a/n: ${m.holder}\n`
    }
    text += `\n`
  }

  if (banks.length > 0) {
    text += `🏦 *Bank Transfer:*\n`
    for (const b of banks) {
      text += `├─ • *${b.name}*\n`
      text += `│  \`${b.number}\`\n`
      if (b.holder) text += `│  a/n: ${b.holder}\n`
    }
    text += `\n`
  }

  if (paymentCfg.qrisUrl) {
    text += `📸 *QRIS:* Tersedia (lihat gambar)\n\n`
  }

  text += `━━━━━━━━━━━━━━━━━━\n`
  text += `> ${botName}`

  return text
}

async function handler(m, { sock }) {
  const db = getDatabase()
  const paymentCfg = config.payment || {}
  const customText = db.setting('customPaymentText') || paymentCfg.customText || ''
  const botName = config.bot?.name || 'Bot'
  const ownerName = config.owner?.name || 'Owner'

  const text = buildPaymentText(paymentCfg, customText, botName, ownerName)

  if (paymentCfg.qrisUrl) {
    try {
      await sock.sendMessage(m.chat, {
        image: { url: paymentCfg.qrisUrl },
        caption: text
      }, { quoted: m })
      return
    } catch {}
  }

  await sock.sendMessage(m.chat, { text }, { quoted: m })
}

export { pluginConfig as config, handler }
