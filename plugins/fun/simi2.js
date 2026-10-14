//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


import fetch from 'node-fetch'

let handler = async (m, { sock, text, prefix, command }) => {
    if (!text) throw `Contoh: ${prefix + command} halo`
    try {
        let res = await fetch(`https://api.nexray.web.id/ai/simisimi?text=${encodeURIComponent(text)}`)
        let json = await res.json()
        if (json.status) {
            await sock.sendMessage(m.chat, { text: json.result }, { quoted: m })
        } else {
            throw 'Gagal mendapatkan respon dari Simi.'
        }
    } catch (e) {
        throw 'Terjadi kesalahan sistem.'
    }
}
const pluginConfig = {
  name: 'simi2',
  category: 'fun',
  description: 'Simi chat variant dari Tensura.',
  usage: '.simi2 <teks>',
  example: '.simi2 <teks>',
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

export { pluginConfig as config, handler };
