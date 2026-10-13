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
import yts from "yt-search";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import config from "../../config.js";
import { VoipClient } from "rimuru";

const pluginConfig = {
  name: "telepon",
  category: "search",
  description: "Putar musik dari YouTube lewat telpon",
  usage: ".playcall <query>",
  example: ".playcall komang",
  cooldown: 15,
  energi: 2,
  isEnabled: true,
};

async function handler(m, { sock, text }) {
  const query = m.text?.trim();
  if (!query)
    return m.reply(`🎵 *ᴘʟᴀʏ ᴄᴀʟʟ*\n\n> Masukkan judul lagunya\n\`Contoh: ${m.prefix}playcall surat cinta untuk starla\``);

  if (!global.voipClient) {
    return m.reply("Fitur panggilan suara tidak diaktifkan (VoipClient belum ready).");
  }

  m.react("📞");

  try {
    console.log("[PlayCall] Searching for:", query);
    
    const search = await yts(query);
    if (!search.videos.length) throw new Error("Video tidak ditemukan");
    const video = search.videos[0];
    
    const res = await axios.get(`https://api.azbry.com/api/download/ytmp3?url=${encodeURIComponent(video.url)}`, { timeout: 60000 });
    const data = res.data;
    
    if (!data.status || !data.result || !data.result.download) {
       throw new Error("Gagal mengambil audio dari API");
    }
    
    await m.react("🕕")
    
    console.log("[PlayCall] Downloading audio from:", data.result.download);
    const audioRes = await axios.get(data.result.download, { responseType: "arraybuffer", timeout: 60000 });
    const audioBuffer = Buffer.from(audioRes.data);
    
    console.log("[PlayCall] Audio downloaded successfully, buffer size:", audioBuffer.length);

    const tmpDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
    const tmpFile = path.join(tmpDir, `call_${crypto.randomBytes(4).toString("hex")}.mp3`);
    fs.writeFileSync(tmpFile, audioBuffer);

    let call;
    const targetJid = (!m.isGroup && typeof m.chat === "string" && m.chat.endsWith("@s.whatsapp.net"))
      ? m.chat
      : m.sender;
    const targetNumber = targetJid.split("@")[0];

    if (m.isGroup) {
      await m.reply(`_📞 Panggilan grup tidak didukung oleh library saat ini. Memanggil nomormu secara privat (${targetNumber})..._`);
    } else {
      await m.reply(`_📞 Memanggil nomormu (${targetNumber})..._`);
    }

    try {
      call = await global.voipClient.call(targetNumber, {
        audioSource: tmpFile,
        durationMs: 300000,
      });
    } catch (firstError) {
      const msg = String(firstError?.message || firstError);
      if (!/connection\s*closed|not connected|socket/i.test(msg)) throw firstError;

      // Recreate the VoIP engine once when its shared socket became stale.
      try {
        await global.voipClient?.disconnect?.();
      } catch {}
      global.voipClient = new VoipClient();
      await global.voipClient.connectWithSocket(sock);
      call = await global.voipClient.call(targetNumber, {
        audioSource: tmpFile,
        durationMs: 300000,
      });
    }

    call.on("connected", () => {
      m.reply(`✅ *TERHUBUNG*\nLagu *${video.title}* sedang diputar di telpon!`);
    });

    call.on("ended", (reason) => {
      if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
      m.reply(`📵 Panggilan diakhiri: ${reason}`);
    });

    call.on("error", (err) => {
      console.error("[VoIP Call Error]", err);
    });

  } catch (err) {
    console.error("[PlayCall]", err);
    m.react("😭");
    m.reply(`Gagal menelpon / memainkan lagu: ${err.message}`);
  }
}

export { pluginConfig as config, handler };
