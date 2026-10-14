//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


// Jangan buly saya om saya cuma bercanda:)


const pluginConfig = {
  name: "benarkah",
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

async function handler(m, { sock, text }) {
    const conn = sock;
  conn.reply(m.chat, `
*Pertanyaan:* ${m.text}
*Jawaban:* ${pickRandom(['Iya','Sudah pasti','Sudah pasti bisa','Tidak','Tentu tidak','Sudah pasti tidak'])}
`.trim(), m, {quoted:{key : {participant : '0@s.whatsapp.net'},message: {documentMessage: {title: wm,jpegThumbnail: Buffer.alloc(0)}}}})
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

export { pluginConfig as config, handler };
