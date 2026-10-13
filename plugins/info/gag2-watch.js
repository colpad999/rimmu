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

import axios from "axios";

const pluginConfig = {
  name: "gag2-watch",
  category: "info",
  description: "Cek informasi stok GAG2 Watch",
  usage: ".gag2-watch",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

async function handler(m) {
  await m.react("🕕");

  try {
    const response = await axios.get("https://my.izuka-api.xyz/api/tools/gag2-watch?watchItems=Seed");
    const data = response.data;

    if (!data.status || !data.data || !data.data.stock) {
      await m.react("❌");
      return m.reply(`Maaf, data GAG2 tidak ditemukan atau sistem sedang bermasalah.`);
    }

    const stock = data.data.stock;
    const weather = stock.weather;

    let txt = `🌱 *GAG2 STOCK MONITOR*\n\n`;
    txt += `*STATUS:* ${stock.message || '-'}\n`;
    txt += `*RESTOCK IN:* ${stock.restockInLabel || '-'}\n\n`;

    if (weather && weather.active) {
      txt += `⛅ *WEATHER:* ${weather.type.toUpperCase()}\n`;
      if (weather.effects && weather.effects.length > 0) {
        txt += `_Efek:_ ${weather.effects[0]}\n`;
      }
      txt += `\n`;
    }

    txt += `*SEEDS:*\n`;
    stock.seeds.forEach(s => {
      txt += `- ${s.name}: ${s.quantity}\n`;
    });
    txt += `\n`;

    txt += `*GEAR:*\n`;
    stock.gear.forEach(g => {
      txt += `- ${g.name}: ${g.quantity}\n`;
    });
    txt += `\n`;

    txt += `*CRATES:*\n`;
    stock.crates.forEach(c => {
      txt += `- ${c.name}: ${c.quantity}\n`;
    });

    await m.react("✅");
    await m.reply(txt);
  } catch (error) {
    console.error("[GAG-WATCH Plugin Error]", error);
    await m.react("☢");
    m.reply(`Terjadi kesalahan saat mengambil data GAG. Coba lagi nanti.`);
  }
}

export { pluginConfig as config, handler };
