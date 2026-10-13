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

import te from "../../src/lib/rimuru-error.js";

const config = {
  name: "filsuf",
  category: "quotes",
  description: "Mendapatkan kata-kata bijak / quote acak dari filsuf terkenal",
  usage: ".quotefilsuf",
  example: ".quotefilsuf",
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

const API_URL = "https://raw.githubusercontent.com/Ditzzx-vibecoder/Assets/main/filsuf-quotes.json";

function normalizeQuotes(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.quotes)) return data.quotes;
  if (Array.isArray(data.result)) return data.result;
  if (Array.isArray(data.data)) return data.data;
  return [];
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

async function handler(m, { sock }) {
  m.react("📜");

  try {
    const res = await fetch(API_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json,text/plain,*/*"
      }
    });

    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      throw new Error("Gagal memproses data JSON");
    }

    const quotes = normalizeQuotes(json);
    const selected = pickRandom(quotes);

    if (!selected) {
      m.react("❌");
      return m.reply("❌ Tidak ada quote yang ditemukan.");
    }

    const quoteText = selected.quote || selected.text || selected.kata || "Tidak ada teks quote.";
    const philosopherName = selected.philosopher || selected.author || selected.filsuf || selected.name || "Anonim";
    const philosopherImage = selected.image || selected.img || selected.avatar || null;

    let caption = `📜 *QUOTES FILSUF*\n\n`;
    caption += `_"${quoteText}"_\n\n`;
    caption += `— *${philosopherName}*`;

    m.react("🏛️");

    // Kirim berupa gambar jika JSON menyediakan URL foto filsuf
    if (philosopherImage && typeof philosopherImage === "string" && philosopherImage.startsWith("http")) {
      await sock.sendMessage(m.chat, {
        image: { url: philosopherImage },
        caption: caption
      }, { quoted: m });
    } else {
      await m.reply(caption);
    }

  } catch (e) {
    console.error(e);
    m.react("❌");

    if (typeof te === "function") {
      m.reply(te(m.prefix, m.command, m.pushName));
    } else {
      m.reply("❌ Terjadi kesalahan saat mengambil quote filsuf.");
    }
  }
}

export { config, handler };
