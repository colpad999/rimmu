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


import { getAllPlugins, getCommandsByCategory } from "../../src/lib/rimuru-plugins.js"
import { getCaseCount } from "../../case/rimuru.js"

const pluginConfig = {
  name: "totalfitur2",
  category: "info",
  description: "Lihat total fitur/command bot secara otomatis",
  usage: ".totalfitur2",
  example: ".totalfitur2",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 0,
  isEnabled: true,
}

async function handler(m) {
  try {
    const plugins = getAllPlugins().filter(p => p?.config?.isEnabled !== false)
    const commandsByCategory = getCommandsByCategory()
    const totalCommand = Object.values(commandsByCategory)
      .reduce((sum, commands) => sum + commands.length, 0)
    const totalCase = getCaseCount()
    const totalFitur = totalCommand + totalCase
    const totalKategori = Object.values(commandsByCategory)
      .filter(commands => commands.length > 0).length

    await m.reply(
      `📊 *TOTAL FITUR BOT*\n\n` +
      `🔌 Total Plugin Aktif : *${plugins.length}*\n` +
      `⚡ Total Command      : *${totalCommand}*\n` +
      `🧩 Total Case         : *${totalCase}*\n` +
      `✨ Total Fitur        : *${totalFitur}*\n` +
      `📁 Total Kategori     : *${totalKategori}*`
    )
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : String(error ?? "Unknown error")
    console.error("[TotalFitur]", error)
    return m.reply(`❌ Gagal menghitung total fitur.\n> ${errorMessage}`)
  }
}

export { pluginConfig as config, handler }
