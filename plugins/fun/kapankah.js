//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


const pluginConfig = {
  name: "kapankah",
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
  conn.reply(m.chat, `
*Pertanyaan:* ${command} ${text}
*Jawaban:* ${pickRandom(['1','2','3','4','5','6','7','8','9','10'])} ${pickRandom(['detik','jam','menit','hari','bulan','tahun','abad','minggu','dekade'])} lagi...
`.trim(), m, m.mentionedJid ? {
    contextInfo: {
      mentionedJid: m.mentionedJid
    }
  } : {})
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

export { pluginConfig as config, handler };
