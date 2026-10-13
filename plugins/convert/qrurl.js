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
  name: "qrurl",
  category: "tools",
  description: "Convert link menjadi QR Code",
  usage: ".tocodeqr <link>",
  example: ".tocodeqr https://youtube.com",
  cooldown: 3,
  energi: 0,
  isOwner: false,
  isGroup: false,
  isPrivate: false,
  isPremium: false,
  isEnabled: true,
};

async function handler(m, { sock }) {

  const text = m.args[0]

  if (!text) {
    return m.reply(
`🌸 *RIMURU QR GENERATOR*

Konichiwa darling ${m.pushName || ""} ✨

Gunakan seperti ini yaa :

.tocodeqr https://example.com

Rimuru akan mengubah link itu
menjadi QR Code yang bisa discan 😋`
    )
  }

  try {

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(text)}`

    await sock.sendMessage(m.chat, {
      image: { url: qrUrl },
      caption:
`💗 *RIMURU QR CODE*

🔗 Link :
${text}

✨ Scan QR ini untuk membuka link nya yaa darling`
    }, { quoted: m })

  } catch (err) {

    m.reply(
`❌ *ERROR*

Rimuru gagal membuat QR Code 😢

${err.message}`
    )

  }

}

export { pluginConfig as config, handler };
