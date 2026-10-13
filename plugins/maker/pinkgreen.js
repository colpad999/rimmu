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

import fs from "fs/promises";
import os from "os";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const pluginConfig = {
  name: "pinkgreen",
  category: "maker",
  description: "Efek pink-green bergaya Rimuru by Anita Putri Azzahra 2",
  usage: ".pinkgreen <reply/kirim gambar>",
  example: ".pinkgreen",
  isOwner: false,
  isPremium: false,
  cooldown: 8,
  energi: 5,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const qmsg = m.quoted || m;
  const mime = String(qmsg?.mimetype || qmsg?.msg?.mimetype || m.mimetype || m.msg?.mimetype || "");
  if (!/^image\//i.test(mime)) {
    return m.reply(`Reply/kirim gambar lalu gunakan *${m.prefix}pinkgreen*`);
  }

  const input = await (qmsg?.download ? qmsg.download() : m.download());
  if (!input) return m.reply("❌ Gagal mengunduh gambar.");

  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "rimuru-pinkgreen-"));
  const inputPath = path.join(tmpDir, "input.jpg");
  const outputPath = path.join(tmpDir, "output.png");

  try {
    await fs.writeFile(inputPath, input);
    const ffmpeg = process.env.FFMPEG_PATH || "ffmpeg";
    const filter = "format=gray,lutrgb=r='255*pow(val/255,0.6)':g='100+(5*pow(val/255,0.6))':b='180*pow(val/255,0.6)'";
    await execFileAsync(ffmpeg, ["-y", "-i", inputPath, "-vf", filter, "-frames:v", "1", outputPath], { maxBuffer: 10 * 1024 * 1024 });
    const output = await fs.readFile(outputPath);
    await sock.sendMessage(m.chat, { image: output, caption: "🌸 *PinkGreen*" }, { quoted: m });
    return m.react("✅");
  } catch (e) {
    console.error("[PINKGREEN]", e);
    await m.react("❌").catch(() => {});
    return m.reply(`❌ Gagal membuat efek pinkgreen: ${e.message}`);
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {});
  }
}

export { pluginConfig as config, handler };
