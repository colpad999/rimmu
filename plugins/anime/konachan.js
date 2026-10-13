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

import searchKonachan from '../../src/scraper/konachan.js';

const pluginConfig = {
  name: "konachan",
  category: "anime",
  description: "Cari gambar anime dari konachan",
  usage: ".konachan <tags>",
  example: ".konachan long_hair blue_eyes",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { args, sock }) {
  if (!args[0]) {
    let txt = `🌸 *KONACHAN SEARCH* 🌸\n\n`;
    txt += `Halo kak! Lagi nyari referensi gambar anime keren? Sini aku carikan dari Konachan!\n\n`;
    txt += `*Cara Pakai:*\n`;
    txt += `👉 \`${m.prefix}konachan <tag1> <tag2>\`\n\n`;
    txt += `*Contoh:*\n`;
    txt += `\`${m.prefix}konachan long_hair\`\n`;
    txt += `\`${m.prefix}konachan naruto\`\n`;
    txt += `\`${m.prefix}konachan blue_eyes smile\`\n\n`;
    txt += `*Tags populer:*\n`;
    txt += `long_hair, blue_eyes, smile, school_uniform, nekomimi`;
    return m.reply(txt);
  }

  await m.react("🕕");

  try {
    const query = args.join(" ");
    const results = await searchKonachan(query);

    if (results.error) {
      await m.react("❌");
      return m.reply(`❌ Maaf kak, ada masalah saat nyari gambarnya!\nError: ${results.message}`);
    }

    if (!results || results.length === 0) {
      await m.react("❌");
      return m.reply(`❌ Aduh kak, gambarnya nggak ketemu nih! Coba ganti tag pencariannya ya. 😭\n\n*Contoh tag:*\n${args[0]} → coba pake tag lain kayak "anime", "wallpaper", atau yang lebih spesifik`);
    }

    // Batasin maksimal hasil
    const maxResults = Math.min(results.length, 20);
    const randomIdx = Math.floor(Math.random() * maxResults);
    const image = results[randomIdx];

    if (!image || !image.images || !image.images.preview) {
      await m.react("❌");
      return m.reply(`❌ Waduh kak, gambarnya ga bisa dimuat! Coba cari dengan tag lain ya~`);
    }

    // Format caption
    let caption = `🌸 *KONACHAN SEARCH RESULT* 🌸\n\n`;
    caption += `🔍 *Query:* ${query}\n`;
    caption += `📊 *Total found:* ${results.length} gambar\n`;
    caption += `🎲 *Random ke-${randomIdx + 1}*\n\n`;
    caption += `🏷️ *Tags:*\n`;
    
    // Tampilkan tags (batasi biar ga kepanjangan)
    const tagDisplay = image.tags.slice(0, 15).join(", ");
    caption += `${tagDisplay}${image.tags.length > 15 ? '...' : ''}\n\n`;
    caption += `🔗 *Source:*\n${image.details_page || 'https://konachan.net'}\n\n`;
    caption += `💕 *Rimuru:* Selamat menikmati darling~ ♡`;

    // Kirim gambar pake sendMessage (bukan sendMedia)
    await sock.sendMessage(m.chat, {
      image: { url: image.images.preview },
      caption: caption
    }, { quoted: m });

    await m.react("✅");
    
  } catch (e) {
    console.error('[Konachan] Error:', e);
    await m.react("❌");
    await m.reply(`❌ Maaf kak, sistem error! 😭\n\nError: ${e.message}\n\nCoba lagi nanti ya darling~ 💕`);
  }
}

export { pluginConfig as config, handler };
