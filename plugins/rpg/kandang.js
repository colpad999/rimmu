//

const pluginConfig = {
  name: "kandang",
  category: "rpg",
  description: "Imported from Yalena MD V4.6",
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

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


let handler = async (m) => {
  let user = global.db.data.users[m.sender]
  if (!user) return

  const animals = [
    'banteng','harimau','gajah','kambing','panda','buaya',
    'kerbau','sapi','monyet','ayam','babi','babihutan'
  ]

  let isi = animals
    .map(v => {
      user[v] = user[v] || 0
      return user[v] > 0
        ? `• ${global.rpg.emoticon(v)} ${v}: ${user[v]}`
        : null
    })
    .filter(Boolean)
    .join('\n')

  let caption = isi
    ? `📮 *KANDANG KAMU*\n\n${isi}`
    : '📮 Kandang kamu masih kosong!'

  m.reply(caption)
}

handler.register = true

export { pluginConfig as config, handler };
