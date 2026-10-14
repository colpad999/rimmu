//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


const pluginConfig = {
  name: "cekmmk",
  category: "fun",
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

async function handler(m, { sock, command, text }) {
    const conn = sock;
	
    if (!text) return conn.reply(m.chat, '• *Example :* .cekmemek elaina', m)
	
  conn.reply(m.chat, `
╭━━━━°「 *Memeknya ${text}* 」°
┃
┊• Nama : ${text}
┃• Memek : ${pickRandom(['Putih mulus','Hitam','Pink','Pink Mulus','Hitam mulus'])}
┊• Jembut : ${pickRandom(['Lebat','Tipis','Gada Jembut', 'Bersih'])}
┃• Lobang : ${pickRandom(['Perawan','Ga Perawan','Besar','Sempit'])}
╰═┅═━––––––๑
`.trim(), m)
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

export { pluginConfig as config, handler };
