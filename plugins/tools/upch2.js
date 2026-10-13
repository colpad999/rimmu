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


const channels = {}; 

const handler = async (m, { sock, text, command }) => {
  const user = m.sender;
  
  if (command === "setchid") {
    if (!text) return await m.reply("Gunakan: .setchid <id channel>");
    channels[user] = [text];
    return await m.reply(`ID channel berhasil disimpan: ${text}`);
  }

  if (command === "addchid") {
    if (!text) return await m.reply("Gunakan: .addchid <id channel>");
    if (!channels[user]) channels[user] = [];
    if (!channels[user].includes(text)) {
      channels[user].push(text);
      return await m.reply(`ID channel berhasil ditambahkan: ${text}`);
    } else {
      return await m.reply("ID channel sudah ada dalam daftar.");
    }
  }

  if (command === "getchid") {
    const chidList = channels[user];
    return await m.reply(chidList ? `ID channel Anda:\n${chidList.join("\n")}` : "Belum ada ID channel yang disimpan.");
  }

  const chidList = channels[user];
  if (!chidList || chidList.length === 0) return await m.reply("Set dulu ID channel dengan .setchid atau .addchid");

  if (!text && !m.quoted) return await m.reply("Masukkan teks atau reply media dengan teks");

  let messageOptions = {};

  if (m.quoted && m.quoted.mimetype) {
    let mime = m.quoted.mimetype;

    if (/image/.test(mime)) {
      messageOptions = {
        image: await m.quoted.download(),
        caption: text || m.quoted.text || ""
      };
    } else if (/video/.test(mime)) {
      messageOptions = {
        video: await m.quoted.download(),
        caption: text || m.quoted.text || "",
        mimetype: mime
      };
    } else if (/audio/.test(mime)) {
      messageOptions = {
        audio: await m.quoted.download(),
        mimetype: "audio/mp4",
        fileName: "audio.mp3",
        ptt: true,
        contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: chidList[0], 
            serverMessageId: null,
            newsletterName: "Ryo Yamada",
          },
          externalAdReplyOffOffOff: {
            title: "Cihuyy",
            body: text || "Pesan audio",
            thumbnailUrl: "https://files.catbox.moe/liodxn.jpg", // Ubah sama thumbnail bot kalian
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        }
      };
    } else if (/sticker/.test(mime)) {
      messageOptions = {
        sticker: await m.quoted.download()
      };
    }
  } else {
    messageOptions = { text: text };
  }

  for (const chid of chidList) {
    await sock.sendMessage(chid, messageOptions);
  }

  await m.reply("Pesan berhasil dikirim ke semua channel.");
};


export default handler;
const pluginConfig = {
  name: 'upch2',
  category: 'tools',
  description: 'Varian broadcast ke channel dari Tensura.',
  usage: '.upch2 <teks>',
  example: '.upch2 <teks>',
  isOwner: true,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

export { pluginConfig as config, handler };
