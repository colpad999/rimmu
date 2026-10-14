//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


const pluginConfig = {
  name: "resetlimit",
  category: "main",
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

async function handler(m, { sock, args }) {
    const conn = sock;
	let list = Object.entries(global.db.data.users)
	let lim = !args || !args[0] ? 25 : isNumber(args[0]) ? parseInt(args[0]) : 25
	lim = Math.max(1, lim)
	list.map(([user, data], i) => (Number(data.limit = lim)))
		conn.reply(m.chat, `*Berhasil direset ${lim} / user*`, m)
}

function isNumber(x = 0) {
  x = parseInt(x)
  return !isNaN(x) && typeof x == 'number'
}

export { pluginConfig as config, handler };
