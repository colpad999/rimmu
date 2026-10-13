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
  name: 'hastag',
  category: 'user',
  description: 'Menampilkan template hastag KGR dengan tombol copy otomatis',
  usage: '.hastag',
  example: '.hastag',
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 0,
  isEnabled: true
};

async function handler(m, { sock, text }) {
  // Hanya Murni Hastag (Tanpa Nama)
  const tagStyle1 = "#margakageri";
  const tagStyle2 = "#kagerifamily";
  const tagStyle3 = "#margakgr";

  // Merapikan teks body / caption
  const caption = `Hai *${m.pushName || 'Kak'}*! ✌️\n` +
                  `Berikut adalah variasi format hastag Kageri (KGR).\n\n` +
                  `👇 _Klik tombol di bawah untuk langsung menyalin hastag:_`;

  if (m.react) await m.react("⏳");

  try {
    // Mengirim Interactive Message dengan format proto Baileys
    await sock.relayMessage(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              header: {
                title: "✨ *KAGERI HASTAG* ✨",
                hasMediaAttachment: false
              },
              body: {
                text: caption
              },
              footer: {
                text: "© KGR Official Center"
              },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: 'cta_copy',
                    buttonParamsJson: JSON.stringify({
                      display_text: '📋 Copy #margakageri',
                      id: 'copy_tag_1',
                      copy_code: tagStyle1
                    })
                  },
                  {
                    name: 'cta_copy',
                    buttonParamsJson: JSON.stringify({
                      display_text: '📋 Copy #kagerifamily',
                      id: 'copy_tag_2',
                      copy_code: tagStyle2
                    })
                  },
                  {
                    name: 'cta_copy',
                    buttonParamsJson: JSON.stringify({
                      display_text: '📋 Copy #margakgr',
                      id: 'copy_tag_3',
                      copy_code: tagStyle3
                    })
                  }
                ]
              }
            }
          }
        }
      },
      { quoted: m }
    );

    if (m.react) await m.react("✅");

  } catch (e) {
    console.error('[HASTAG ERROR]', e);
    if (m.react) await m.react("❌");
    return m.reply(`❌ *Gagal menampilkan tombol:* ${e.message}`);
  }
}

export { pluginConfig as config, handler };
