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

const pluginConfig = {
  name: "halah",
  category: "fun",
  description: "Ubah teks ke gaya Halah/Hilih",
  usage: ".halah <teks> / .hilih <teks>",
  example: ".halah congratulations",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
}

function gayaHalah(text) {
  if (/cangratalataans|laval|rala|raward|samakan|sarang|barantaraksa|nashakaga chasata/i.test(text)) return null
  return text.replace(/[aeou]/gi, "a").replace(/congratulations/gi, "cangratalataans").replace(/you/gi, "yaa").replace(/level/gi, "laval").replace(/role/gi, "rala").replace(/reward/gi, "raward").replace(/semakin/gi, "samakan").replace(/sering/gi, "sarang").replace(/berinteraksi/gi, "barantaraksa").replace(/dengan/gi, "dangan").replace(/nishikigi chisato/gi, "nashakaga chasata").replace(/money/gi, "manay")
}
function gayaHilih(text) {
  if (/cingritilitiins|livil|rili|riwird|simikin|siring|birintiriksi|nishikigi chisiti/i.test(text)) return null
  return text.replace(/[aeou]/gi, "i").replace(/congratulations/gi, "cingritilitiins").replace(/you/gi, "yii").replace(/level/gi, "livil").replace(/role/gi, "rili").replace(/reward/gi, "riwird").replace(/semakin/gi, "simikin").replace(/sering/gi, "siring").replace(/berinteraksi/gi, "birintiriksi").replace(/dengan/gi, "dingin").replace(/nishikigi chisato/gi, "nishikigi chisiti").replace(/money/gi, "miniy")
}

async function handler(m) {
  const text = m.text?.trim() || ""
  if (!text) return m.reply(`🔁 Kirim teks setelah \`${m.prefix}${m.command}\` atau reply ke pesan teks.`)
  const out = m.command === "hilih" ? gayaHilih(text) : gayaHalah(text)
  if (!out) return m.reply("🚫 Teks ini sudah pernah diubah sebelumnya.")
  return m.reply(out)
}

export { pluginConfig as config, handler }
