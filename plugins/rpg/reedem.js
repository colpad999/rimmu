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
*Plugins : Rpg-Reedem*
*atur sesuai sc mu ya adick adick*
   *Credits :*
https://whatsapp.com/channel/0029VavBc6uHAdNdbgCgOK0k

*/


const pluginConfig = {
  name: "reedem",
  category: "rpg",
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

async function handler(m, { sock, args }) {
    const conn = sock;
  try {
    if (args.length === 0) return conn.reply(m.chat, '[❗] Silakan masukkan kode redeemnya', m)
    
    let kodeValid = ['zenzxcukiganteng']; // ganti aja
    let user = global.db.data.users[m.sender];
    
    if (!user.lastcode) user.lastcode = 0;
    
    if (kodeValid.includes(args[0])) {
      let waktuSekarang = new Date();
      let waktuTerakhir = new Date(user.lastcode);
      let selisihWaktu = waktuSekarang - waktuTerakhir;
      
      if (selisihWaktu > 86400000) { // 1 hari
        user.lastcode = waktuSekarang.getTime();
        user.exp += 250000;
        user.limit += 25;
        user.bank += 25000;
        user.money += 250000;
        conn.reply(m.chat, '*🎉🙀Congratulations!*\n\nKamu telah mendapatkan:\n+25000 XP\n+25000 Money\n+25000 Nabung Money\n+25 Limit', m)
      } else {
        conn.reply(m.chat, '[🐣]Kode sudah digunakan, harap tunggu sampai besok!', m)
      }
    } else {
      conn.reply(m.chat, '[❌] Kode redeem tidak valid!', m)
    }
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '[🐧]Terjadi kesalahan.', m)
  }
}

/*
https://whatsapp.com/channel/0029VavBc6uHAdNdbgCgOK0k   

Sesuaikan sama sc mu
*/

export { pluginConfig as config, handler };
