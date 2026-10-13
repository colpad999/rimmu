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
  name: "jomok",
  category: "fun",
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

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  let target = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : null;
  let nama = '';

  if (target) {
    nama = '@' + target.split('@')[0];
  } else if (text) {
    nama = text.trim();
  } else {
    return m.reply(`Gunakan: ${usedPrefix}${command} <nama atau tag orangnya>`);
  }

  const jomokLevel = Math.floor(Math.random() * 101);
  
  const jomokStatus = jomokLevel < 20 ? 'Warga Normal (Mencurigakan)' : 
                      jomokLevel < 40 ? 'Selingkuhan Rehan Wangsaf' : 
                      jomokLevel < 60 ? 'Murid Tetap Ironi Ngawi' : 
                      jomokLevel < 80 ? 'Kloning Mas Rusdi' : 
                      'Duta Amba Ngawi (RAJA JOMOK)';
  
  const deskripsi = jomokLevel < 20 ? 'Masih suci, tapi hatinya bergetar kalau denger lagu "Dreambull". Hati-hati tertular virus hitam manis.' : 
                    jomokLevel < 40 ? 'Agak waras, tapi di galeri hp-nya minimal ada satu video Mas Rusdi lagi senyum misterius.' :
                    jomokLevel < 60 ? 'Setengah jomok, setengah manusia. Sering ngomong "Ahhhh tuchhh" kalau lagi sendirian di kamar.' :
                    jomokLevel < 80 ? 'Sudah murtad dari jalan yang lurus. Suka nyari spek mas-mas berkumis tipis pemegang kunci surga Ngawi.' :
                    'AMBATUKAM!!! Orang ini sudah mencapai maqam tertinggi kejomokan. Kulitnya mulai menggelap, manis, dan siap mendesah bersama Mas Amba di Ngawi!';

  const pesan = `— DETEKSI KADAR JOMOK NGAWI —

😈 *Nama Korban:* ${nama}

🔥 *Level Jomok:* ${jomokLevel}%

🗣️ *Status Sekte:* ${jomokStatus}

📌 *Analisis:* "${deskripsi}"
`;

  await conn.sendMessage(m.chat, { 
    text: pesan, 
    mentions: target ? [target] : [] 
  }, { quoted: m });
};

handler.register = true;

export { pluginConfig as config, handler };
