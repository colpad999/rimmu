//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


const pluginConfig = {
  name: "delorder",
  category: "store",
  description: "Imported from Yalena MD V4.6",
  usage: "",
  example: "",
  isOwner: true,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { args }) {
  let orders = global.db.data.store?.orders || []
  if (!orders.length) return m.reply('Tidak ada order.')

  let no = parseInt(args[0])
  if (!no || no < 1 || no > orders.length) {
    return m.reply('❗ Contoh: .delorder 1')
  }

  let del = orders.splice(no - 1, 1)[0]
  m.reply(`✅ Order *${del.barang}* berhasil dihapus dari antrian.`)
}

export { pluginConfig as config, handler };
