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


/*
fitur : to esm to cjs 
creator : hilman
follow my channel https://whatsapp.com/channel/0029VbAYjQgKrWQulDTYcg2K
*/

const pluginConfig = {
  name: "tocjs",
  category: "tools",
  description: "Imported from Rimuru MD V4.6",
  usage: "",
  example: "",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { command }) {
  if (!m.quoted) return m.reply('✨ reply code nya')

  let q = m.quoted
  let text =
    q.text ||
    q.caption ||
    q.msg?.text ||
    q.msg?.caption ||
    q.msg?.conversation ||
    q.msg?.extendedTextMessage?.text ||
    q.message?.conversation ||
    q.message?.extendedTextMessage?.text ||
    ''

  let input = text.trim()
  let output = ''

  if (command === 'toesm') {
    output = input
      .replace(/const (.*?) = require\(['"](.*?)['"]\)/g, 'import $1 from "$2"')
      .replace(/let (.*?) = require\(['"](.*?)['"]\)/g, 'import $1 from "$2"')
      .replace(/var (.*?) = require\(['"](.*?)['"]\)/g, 'import $1 from "$2"')
      .replace(/module\.exports\s*=\s*/g, 'export default ')
      .replace(/exports\.(\w+)\s*=\s*/g, 'export const $1 = ')
  }

  if (command === 'tocjs') {
    output = input
      .replace(/import\s+(.*?)\s+from\s+['"](.*?)['"]/g, 'const $1 = require("$2")')
      .replace(/export default /g, 'module.exports = ')
      .replace(/export const (\w+)/g, 'exports.$1')
      .replace(/export function (\w+)/g, 'exports.$1 = function')
  }

  m.reply(output)
}

export { pluginConfig as config, handler };
