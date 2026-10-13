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
  name: "mcstat",
  category: "general",
  description: "Mengecek status server Minecraft Java",
  usage: ".mcstatus <ip/domain[:port]>",
  example: ".mcstatus play.example.net",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 0,
  isEnabled: true,
};

async function handler(m) {
  const address = (m.args || []).join(" ").trim();
  if (!address) {
    return m.reply(
      `🎮 *MINECRAFT SERVER STATUS*\n\n` +
      `Masukkan IP/domain server Minecraft Java.\n\n` +
      `Contoh:\n${m.prefix}mcstatus play.example.net\n` +
      `${m.prefix}mcstat play.example.net:25565`,
    );
  }

  try {
    const url = `https://api.mcsrvstat.us/3/${encodeURIComponent(address)}`;
    const { data } = await axios.get(url, { timeout: 15000 });

    if (!data?.online) {
      return m.reply(`❌ Server *${address}* sedang offline atau tidak ditemukan.`);
    }

    const host = data.hostname || address;
    const port = data.port || 25565;
    const version = data.version || "Tidak diketahui";
    const online = data.players?.online ?? 0;
    const max = data.players?.max ?? 0;
    const motd = Array.isArray(data.motd?.clean)
      ? data.motd.clean.join(" ").trim()
      : String(data.motd?.clean || "").trim();

    let text =
      `🎮 *MINECRAFT SERVER STATUS*\n\n` +
      `🌐 Host: *${host}*\n` +
      `🔌 Port: *${port}*\n` +
      `🛠️ Version: *${version}*\n` +
      `👥 Players: *${online}/${max}*\n` +
      `🟢 Status: *Online*`;

    if (motd) text += `\n📝 MOTD: ${motd}`;

    if (data.players?.list?.length) {
      const players = data.players.list.slice(0, 10).map((p) => p.name).join(", ");
      text += `\n👤 Online: ${players}${data.players.list.length > 10 ? "..." : ""}`;
    }

    return m.reply(text);
  } catch (error) {
    console.error("[mcstatus]", error);
    return m.reply(
      `❌ Gagal mengecek server.\n\n` +
      `Pastikan IP/domain benar dan coba lagi beberapa saat.`,
    );
  }
}

export { pluginConfig as config, handler };
