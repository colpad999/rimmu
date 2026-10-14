//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


const pluginConfig = {
  name: "cecanjapan",
  category: "random",
  description: "Imported from Yalena MD V4.6",
  usage: "",
  example: "",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
    const conn = sock;
  try {
    let url = 'https://api.siputzx.my.id/api/r/cecan/japan'
    let caption = `🇯🇵 *Random Cecan Jepang*\nManisnya bikin pengen liburan ke Tokyo 😳`

    await conn.sendFile(m.chat, url, 'cecan-japan.jpg', caption, m)
  } catch (e) {
    console.error(e)
    m.reply(`❌ Gagal ambil gambar cecan Jepang.\n${e}`)
  }
}

export { pluginConfig as config, handler };
