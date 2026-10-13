/*
╔══════════════════════════════════════════════╗
║       👑  𝑹𝑰𝑴𝑼𝑹𝑼 𝑴𝑫 〽️                        ║
╚══════════════════════════════════════════════╝

🪽 𝑵𝒐𝒕𝒆 :
Rimuru MD adalah SC hasil rename dari SC Ourin MD.

╭─────────────「 🜲 𝑰𝑵𝑭𝑶 𝑶𝑼𝑹𝑰𝑵 」─────────────╮
│ 👤 Developer : 𝑯𝒚𝒖𝒖 / 𝒁𝒂𝒏𝒏
│ 🎵 TikTok    : https://tiktok.com/@ourinmd
│ 📢 WhatsApp  : https://whatsapp.com/channel/0029VbB37bgBfxoAmAlsgE0t
╰─────────────────────────────────────────────╯

╭────────────「 ✦ 𝑰𝑵𝑭𝑶 𝑹𝑰𝑴𝑼𝑹𝑼 ✦ 」────────────╮
│ 👤 Developer Pihak Ketiga : 𝑨𝒏𝒊𝒕𝒂 𝑷𝒖𝒕𝒓𝒊 𝑨𝒛𝒛𝒂𝒉𝒓𝒂
│ 🎵 TikTok                 : https://tiktok.com/@anita.putri.azzah1
│ 📸 Instagram              : anit_aputriazzahrah
│ 📢 Saluran                : https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P
│ ▶️ YouTube                : https://youtube.com/@rimurumd
╰─────────────────────────────────────────────╯

        ⚠️ 𝑫𝑶 𝑵𝑶𝑻 𝑹𝑬𝑴𝑶𝑽𝑬 𝑪𝑹𝑬𝑫𝑰𝑻 ⚠️
              ❖ 𝐉𝐚𝐧𝐠𝐚𝐧 𝐡𝐚𝐩𝐮𝐬 𝐜𝐫𝐞𝐝𝐢𝐭 ❖

                 「 👑 𝑹𝑰𝑴𝑼𝑹𝑼 𝑴𝑫 👑 」
*/

export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Rimuru MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P";


const pluginConfig = {
  name: "murothal",
  category: "islamic",
  description: "Imported from Rimuru MD V4.6",
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

async function handler(m, { sock, prefix: _p }) {
    const conn = sock;
    const usedPrefix = prefix || m.prefix || ".";
let elaina = `
QUR'AN BOT:
Via Copas {SEBARKAN}

*YouTube:*
_~Drawl Nag_

Juz 1 ⇨ http://j.mp/2b8SiNO
Juz 2 ⇨ http://j.mp/2b8RJmQ
Juz 3 ⇨ http://j.mp/2bFSrtF
Juz 4 ⇨ http://j.mp/2b8SXi3
Juz 5 ⇨ http://j.mp/2b8RZm3
Juz 6 ⇨ http://j.mp/28MBohs
Juz 7 ⇨ http://j.mp/2bFRIZC
Juz 8 ⇨ http://j.mp/2bufF7o
Juz 9 ⇨ http://j.mp/2byr1bu
Juz 10 ⇨ http://j.mp/2bHfyUH
Juz 11 ⇨ http://j.mp/2bHf80y
Juz 12 ⇨ http://j.mp/2bWnTby
Juz 13 ⇨ http://j.mp/2bFTiKQ
Juz 14 ⇨ http://j.mp/2b8SUTA
Juz 15 ⇨ http://j.mp/2bFRQIM
Juz 16 ⇨ http://j.mp/2b8SegG
Juz 17 ⇨ http://j.mp/2brHsFz
Juz 18 ⇨ http://j.mp/2b8SCfc
Juz 19 ⇨ http://j.mp/2bFSq95
Juz 20 ⇨ http://j.mp/2brI1zc
Juz 21 ⇨ http://j.mp/2b8VcBO
Juz 22 ⇨ http://j.mp/2bFRxNP
Juz 23 ⇨ http://j.mp/2brItxm
Juz 24 ⇨ http://j.mp/2brHKw5
Juz 25 ⇨ http://j.mp/2brImlf
Juz 26 ⇨ http://j.mp/2bFRHF2
Juz 27 ⇨ http://j.mp/2bFRXno
Juz 28 ⇨ http://j.mp/2brI3ai
Juz 29 ⇨ http://j.mp/2bFRyBF
Juz 30 ⇨ http://j.mp/2bFREcc`
   await conn.relayMessage(m.chat,  {
    requestPaymentMessage: {
      currencyCodeIso4217: 'IDR',
      amount1000: 30 * 1000,
      requestFrom: '0@s.whatsapp.net',
      noteMessage: {
      extendedTextMessage: {
      text: elaina, 
      contextInfo: {
      mentionedJid: [m.sender],
      }}}}}, {})
}
handler.mods = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

export { pluginConfig as config, handler };
