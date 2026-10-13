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


let effects = [
  'snow3d','anonymhacker','aovwallpaper','avatarlolnew','beautifulflower',
  'birthdaycake','birthdayday','cartoongravity','codwarzone','cutegravity',
  'fpslogo','freefire','galaxybat','galaxystyle','galaxywallpaper','glittergold',
  'greenbush','greenneon','heartshaped','hologram3d','juventusshirt','lighttext',
  'logogaming','lolbanner','luxurygold','metallogo','mlwallpaper','multicolor3d',
  'noeltext','pubgmaskot','puppycute','realvintage','royaltext','silverplaybutton',
  'starsnight','textbyname','textcake','valorantbanner','watercolor','wetglass',
  'wooden3d','writegalaxy'
]

const pluginConfig = {
  name: "textlogo",
  category: "maker",
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

async function handler(m, { sock, text, prefix, command }) {
    const conn = sock;
    const usedPrefix = prefix || m.prefix || ".";
  if (!text) {
    return m.reply(
`🖼️ *TEXT LOGO MAKER*

Contoh:
${usedPrefix + command} snow3d|Ryo Yamada

📜 *List Efek:*
${effects.map(v => '• ' + v).join('\n')}`
    )
  }

  let [effect, txt] = text.split('|')
  if (!effect || !txt) {
    return m.reply(`Gunakan format:\n${usedPrefix + command} efek|teks`)
  }

  effect = effect.toLowerCase().trim()
  txt = txt.trim()

  if (!effects.includes(effect)) {
    return m.reply(
`Efek tidak tersedia!

✨ *List Efek:*
${effects.map(v => '• ' + v).join('\n')}`
    )
  }

  await conn.sendMessage(m.chat, {
    react: { text: '🕒', key: m.key }
  })

  let url = `https://api.lolhuman.xyz/api/ephoto1/${effect}?apikey=${global.APIKeys['https://api.lolhuman.xyz']}&text=${encodeURIComponent(txt)}`

  await conn.sendFile(m.chat, url, 'textlogo.jpg', 'Done', m)
}

export { pluginConfig as config, handler };
