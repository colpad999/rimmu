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
    name: 'cekdana',
    category: 'tools',
    description: 'Cek Nama Pengguna Dana',
    usage: '.cekdana',
    example: '.cekdana',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    energi: 1,
    isEnabled: true
}

function isNumeric(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}

async function handler(m, { sock }) {
    const text = m.text
    if(!text) return m.reply(`🌲 *NOTE*\n\n\`\`\`Parameter wajib diisi\`\`\`\n\n> Contoh: *${m.prefix}ceknamadana 08xxxx*`)
    if(!isNumeric(text)) return m.reply("🌿 *Hei Sobat, Hanya nomor yang di perbolehkan*")
    const Zann = text?.replace?.("62", "08")
    try {
        let { data } = await axios.get('https://api.pitucode.com/cek-name-e-wallet-id-v2?bank=DANA&accountNumber='+Zann, {
      headers: {
  "x-api-key": "7C0dEefbfc1"
}
  })
        await m.reply(`🌿 *BERHASIL*\n\n- Nama dana dari nomor \`${Zann}\` adalah *${data.data.customer_name}*`)
    } catch (error) {
        console.error('Example Plugin Error:', error)
        await m.reply(`❌ *GAGAL*\n\n> ${error.message}`)
    }
}

export { pluginConfig as config, handler };
