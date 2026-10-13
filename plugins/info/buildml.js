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

import axios from 'axios';
import config from '../../config.js';
const pluginConfig = {
  name: 'buildml',
  category: 'info',
  description: 'Build hero Mobile Legends',
  usage: '.buildml <hero>',
  example: '.buildml gusion',
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 1,
  isEnabled: true
}

async function handler(m, { sock }) {
  let text = m.args?.join(" ")
  if (!text) {
    return m.reply(
      `📚 *BUILD ML*\n\n> Masukan nama karakter\n\nContoh: ${m.prefix}buildml gusion`
    )
  }

  m.react("⏱️")

  try {
    const { data } = await axios.get(
      `https://api.apocalypse.web.id/search/buildml?hero=${encodeURIComponent(text)}`
    )

    const heroes = data.builds
    if (!heroes || !heroes.length) {
      return m.reply("❌ Build tidak ditemukan")
    }

    const pickRandom = heroes[Math.floor(Math.random() * heroes.length)]
    const title = pickRandom.title

    const itemnya = pickRandom.items?.map(v => {
      return `*ITEM NYA*
🌿 \`Nama\`: ${v.name}
🔮 \`Tipe\`: ${v.type}
💵 \`Harga\`: ${v.price}

*STATS*
🚧 \`Magic Power\`: ${v.stats?.magic_power || "-"}
👻 \`Movement Speed\`: ${v.stats?.movement_speed || "-"}
🎗️ \`Magic Penetration\`: ${v.stats?.magic_penetration || "-"}

*PASSIVE*
${v.passive_description || "-"}`
    }).join("\n\n")

    m.reply(`*BUILD ${text.toUpperCase()}*

🍯 *Title*
${title}

${itemnya}`)

  } catch (error) {
    console.error('BuildML Error:', error)
    await m.reply(`❌ *GAGAL*

> ${error.message}`)
  }
}

export { pluginConfig as config, handler };
