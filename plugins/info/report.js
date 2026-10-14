//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


const pluginConfig = {
  name: "report",
  category: "info",
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
if (!text) {
return m.reply(`❏ Contoh Penggunaan

.lapor Ada bug pada fitur play

Tuliskan laporan atau saran yang ingin dikirim ke Owner 🌷`)
}

let owner = Array.isArray(global.owner)
? global.owner[0]
: global.owner

owner = owner.toString().replace(/[^0-9]/g, '')

let laporan = `🌷 Laporan Pengguna

❏ Nama : ${m.pushName}
❏ Laporan : ${text}
❏ Waktu : ${new Date().toLocaleString('id-ID')}

✨ 𝗠𝗘𝗚𝗔𝗠𝗜 𝗠𝗗 𝗠𝗨𝗟𝗧𝗜 𝗗𝗘𝗩𝗜𝗖𝗘`

await conn.sendMessage(owner + '@s.whatsapp.net', {
text: laporan
})

await m.reply(`🌷 Laporan berhasil dikirim

❏ Terima kasih atas laporan dan sarannya.
❏ Owner akan meninjau laporan yang dikirim.`)
}

export { pluginConfig as config, handler };
