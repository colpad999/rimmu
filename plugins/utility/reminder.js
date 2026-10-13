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

// Simpan memori reminder aktif di memori (bisa dikembangkan ke database jika diperlukan)
const activeReminders = new Map();

const pluginConfig = {
  name: "reminder",
  category: "utility",
  description: "Membuat pengingat otomatis dengan durasi waktu tertentu",
  usage: ".remind <waktu> <pesan>",
  example: ".remind 30m Meeting dengan klien",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const text = m.text?.trim();
  const prefix = m.prefix || ".";
  const command = m?.command || "remind";

  // Parsing argumen: contoh ".remind 10m jangan lupa mandi"
  const args = text.split(" ");
  const timeArg = args[0];
  const reminderMessage = args.slice(1).join(" ");

  if (!timeArg || !reminderMessage) {
    if (m.react) await m.react("❌");
    return m.reply(
      `📌 *Format Salah!*\n\n` +
      `Gunakan format:\n*${prefix + command} <waktu> <pesan>*\n\n` +
      `Contoh:\n*${prefix + command} 30s Cek masakan di kompor*\n` +
      `*${prefix + command} 5m Meeting kantor*\n` +
      `*${prefix + command} 2h Istirahat sejenak*\n\n` +
      `*Keterangan waktu:*\n` +
      `• s = Detik (contoh: 30s)\n` +
      `• m = Menit (contoh: 5m)\n` +
      `• h = Jam (contoh: 1h)\n` +
      `• d = Hari (contoh: 1d)`
    );
  }

  // Ekstrak angka dan unit waktu (s/m/h/d)
  const match = timeArg.match(/^(\d+)([smhd])$/i);
  if (!match) {
    if (m.react) await m.react("❌");
    return m.reply("❌ Format waktu tidak valid! Gunakan akhiran *s* (detik), *m* (menit), *h* (jam), atau *d* (hari). Contoh: `10m`");
  }

  const value = parseInt(match[1]);
  const unit = match[2].toLowerCase();

  let multiplier = 1000; // default milidetik
  let unitName = "detik";

  if (unit === "s") {
    multiplier = 1000;
    unitName = "detik";
  } else if (unit === "m") {
    multiplier = 60 * 1000;
    unitName = "menit";
  } else if (unit === "h") {
    multiplier = 60 * 60 * 1000;
    unitName = "jam";
  } else if (unit === "d") {
    multiplier = 24 * 60 * 60 * 1000;
    unitName = "hari";
  }

  const durationMs = value * multiplier;
  
  // Batasan maksimal pengingat (misal maks 7 hari agar tidak membebani RAM)
  if (durationMs > 7 * 24 * 60 * 60 * 1000) {
    if (m.react) await m.react("❌");
    return m.reply("❌ Maksimal durasi pengingat adalah 7 hari!");
  }

  if (m.react) await m.react("⏳");

  const targetChat = m.chat;
  const senderId = m.sender || m.key.participant || m.chat;

  m.reply(
    `⏰ *Reminder Berhasil Dipasang!*\n\n` +
    `📝 *Pesan:* ${reminderMessage}\n` +
    `⏳ *Waktu:* ${value} ${unitName} dari sekarang.\n` +
    `🤖 Bot akan mengingatkanmu nanti!`
  );

  // Set Timer untuk mengirim pengingat
  const timerId = setTimeout(async () => {
    try {
      await sock.sendMessage(
        targetChat,
        {
          text: `🔔 *WAKTUNYA REMINDER!* @${senderId.split("@")[0]}\n\n📝 *Pesan:* ${reminderMessage}`,
          mentions: [senderId]
        },
        { quoted: m }
      );
    } catch (err) {
      console.error("[REMIND ERROR]", err);
    } finally {
      activeReminders.delete(timerId);
    }
  }, durationMs);

  // Simpan ke map aktif
  activeReminders.set(timerId, {
    targetChat,
    reminderMessage,
    time: Date.now() + durationMs
  });
}

export { pluginConfig as config, handler };
