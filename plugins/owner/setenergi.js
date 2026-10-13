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

import { getPlugin } from "../../src/lib/rimuru-plugins.js";
import { getDatabase } from "../../src/lib/rimuru-database.js";

const config = {
  name: "setenergi",
  category: "owner",
  description: "Mengubah potongan energi banyak fitur sekaligus",
  usage: ".capenergi <nama_fitur1> <nama_fitur2> ... <jumlah>",
  example: ".capenergi hd fakedev 5",
  isOwner: true,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 0,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  if (m.args.length < 2) {
    return m.reply(
      `⚙️ *SISTEM CAP ENERGI*\n\n` +
      `Sistem untuk mengubah secara dinamis jumlah energi yang dipotong untuk banyak fitur sekaligus.\n\n` +
      `*PENGGUNAAN:*\n` +
      `- *${m.prefix}capenergi <nama_fitur1> <nama_fitur2> ... <jumlah>*\n\n` +
      `*CONTOH PENGGUNAAN:*\n` +
      `- *${m.prefix}capenergi hd jpm 5* (Fitur HD & JPM memotong 5 energi)\n` +
      `- *${m.prefix}capenergi hd 0* (Fitur HD menjadi gratis energi)\n\n` +
      `*PENJELASAN:*\n` +
      `1. Masukkan satu atau banyak nama fitur yang ingin diubah.\n` +
      `2. Di akhiran (kata terakhir) harus berupa ANGKA (jumlah potongan energi).`
    );
  }

  const rawCost = m.args[m.args.length - 1];
  const cost = parseInt(rawCost);
  
  if (isNaN(cost) || cost < 0) {
    return m.reply(`❌ *GAGAL*\n\nJumlah energi (di argumen paling akhir) harus berupa angka 0 atau lebih.`);
  }

  const commands = m.args.slice(0, -1);

  await m.react("🕕");
  
  const db = getDatabase();
  const overrides = db.setting("capenergi") || {};
  
  let successList = [];
  let failedList = [];
  
  for (const cmd of commands) {
    const targetCommand = cmd.toLowerCase();
    const plugin = getPlugin(targetCommand);
    if (!plugin) {
      failedList.push(targetCommand);
    } else {
      overrides[plugin.config.name] = cost;
      successList.push(plugin.config.name);
    }
  }
  
  db.setting("capenergi", overrides);
  await db.save();

  await m.react("✅");
  
  let msg = `✅ *POTONGAN ENERGI BERHASIL DIUBAH*\n\n`;
  if (successList.length > 0) {
    msg += `*Berhasil diubah jadi ${cost} Energi:*\n${successList.map(f => `- ${f}`).join("\n")}\n\n`;
  }
  if (failedList.length > 0) {
    msg += `*Gagal (Tidak ditemukan):*\n${failedList.map(f => `- ${f}`).join("\n")}\n\n`;
  }
  
  msg += `_Pengaturan tersimpan ke dalam database dan langsung berlaku._`;
  return m.reply(msg.trim());
}

export { config, handler };
