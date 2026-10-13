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

import { getDatabase } from '../../src/lib/rimuru-database.js'

const pluginConfig = {
  name: 'delaybcpc',
  category: 'owner',
  description: 'Atur jeda broadcast private chat',
  usage: '.bcpcjeda <waktu> (contoh: 5s, 2m, 1h)',
  isOwner: true,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 0,
  isEnabled: true
}

function parseDelay(input) {
  if (!input) return null
  const match = input.match(/^(\d+)(s|m|h|d)$/i)
  if (!match) return null
  const val = parseInt(match[1])
  const unit = match[2].toLowerCase()
  switch (unit) {
    case 's': return val * 1000
    case 'm': return val * 60 * 1000
    case 'h': return val * 60 * 60 * 1000
    case 'd': return val * 24 * 60 * 60 * 1000
    default: return null
  }
}

function formatDelay(ms) {
  if (ms >= 86400000) return `${(ms / 86400000).toFixed(0)} hari`
  if (ms >= 3600000) return `${(ms / 3600000).toFixed(0)} jam`
  if (ms >= 60000) return `${(ms / 60000).toFixed(0)} menit`
  return `${(ms / 1000).toFixed(0)} detik`
}

async function handler(m) {
  const db = getDatabase()
  const input = m.text?.trim()
  const current = db.setting('jedaBcpc') || 5000

  if (!input) {
    return m.reply(
      `⏱️ *JEDA BROADCAST PRIVATE*\n\n` +
      `Jeda saat ini: *${formatDelay(current)}* (${current}ms)\n\n` +
      `*CARA PAKAI:*\n` +
      `> \`${m.prefix}bcpcjeda <angka><satuan>\`\n\n` +
      `*SATUAN:*\n` +
      `• \`s\` — detik\n• \`m\` — menit\n• \`h\` — jam\n• \`d\` — hari\n\n` +
      `*CONTOH:*\n` +
      `> \`${m.prefix}bcpcjeda 5s\` → 5 detik\n` +
      `> \`${m.prefix}bcpcjeda 2m\` → 2 menit\n` +
      `> \`${m.prefix}bcpcjeda 1h\` → 1 jam`
    )
  }

  const ms = parseDelay(input)
  if (!ms || ms < 1000) {
    return m.reply('❌ Format salah. Contoh: `5s`, `2m`, `1h`, `1d`')
  }

  const prev = current
  db.setting('jedaBcpc', ms)

  return m.reply(
    `✅ *Jeda broadcast private diubah*\n\n` +
    `Sebelumnya: *${formatDelay(prev)}*\n` +
    `Sekarang: *${formatDelay(ms)}*`
  )
}

export { pluginConfig as config, handler }
