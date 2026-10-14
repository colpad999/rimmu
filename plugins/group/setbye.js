//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


const pluginConfig = {
  name: "setbye",
  category: "group",
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

async function handler(m, {
    sock, text, isROwner, isOwner, isAdmin, prefix, command
}) {
    const conn = sock;
    const usedPrefix = prefix || m.prefix || ".";
    if (text) {
        global.db.data.chats[m.chat].sBye = text
        m.reply('Bye Berhasil Diatur...\n@user [mention]')
    } else return m.reply(`Teksnya Mana..\nContoh:\nSelamat Tinggal Beban @user`)
}
handler.admin = true

export { pluginConfig as config, handler };
