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

import fs from "fs";
import os from "os";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const pluginConfig = {
  name: "resizevid",
  category: "tools",
  description: "Mengubah resolusi video tanpa mengubah rasio",
  usage: ".resizevideo [lebar] (reply video)",
  example: ".resizevideo 640",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 30,
  energi: 2,
  isEnabled: true,
};

function getVideo(m) {
  if (m?.quoted?.isVideo || m?.quoted?.type === "videoMessage") return m.quoted;
  if (m?.isVideo) return m;
  return null;
}

async function handler(m, { sock }) {
  const q = getVideo(m);
  if (!q) {
    return m.reply(
      `📹 *RESIZE VIDEO*\n\n` +
      `Reply video lalu gunakan:\n` +
      `${m.prefix}resizevideo\n` +
      `${m.prefix}resizevideo 640\n\n` +
      `Ukuran yang tersedia: 360, 480, 640, 720, 1080`,
    );
  }

  const widthArg = Number.parseInt(m.args?.[0] || "", 10);
  const allowed = [360, 480, 640, 720, 1080];

  try {
    const buffer = await q.download?.();
    if (!buffer?.length) throw new Error("Video gagal diunduh.");
    if (buffer.length > 60 * 1024 * 1024) {
      return m.reply("❌ Ukuran video terlalu besar. Maksimal 60 MB.");
    }

    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "rimuru-resize-"));
    const input = path.join(tempDir, "input.mp4");
    const output = path.join(tempDir, "output.mp4");
    fs.writeFileSync(input, buffer);

    const metadata = await new Promise((resolve, reject) => {
      ffmpeg.ffprobe(input, (err, data) => {
        if (err) return reject(err);
        const stream = data.streams?.find((s) => s.codec_type === "video");
        if (!stream?.width || !stream?.height) {
          return reject(new Error("Resolusi video tidak dapat dibaca."));
        }
        resolve({ width: stream.width, height: stream.height });
      });
    });

    if (!Number.isFinite(widthArg)) {
      const list = allowed
        .map((w) => {
          const h = Math.round((w / metadata.width) * metadata.height);
          return `• ${w}x${h}`;
        })
        .join("\n");
      fs.rmSync(tempDir, { recursive: true, force: true });
      return m.reply(
        `📐 Resolusi asli: *${metadata.width}x${metadata.height}*\n\n` +
        `Ukuran yang tersedia:\n${list}\n\n` +
        `Contoh: ${m.prefix}resizevideo 640`,
      );
    }

    const targetWidth = Math.min(
      allowed.reduce((best, n) =>
        Math.abs(n - widthArg) < Math.abs(best - widthArg) ? n : best,
      allowed[0]),
      metadata.width,
    );
    const targetHeight = Math.round(
      (targetWidth / metadata.width) * metadata.height,
    );

    await m.reply(
      `⏳ Meresize video ke *${targetWidth}x${targetHeight}*...`,
    );

    await new Promise((resolve, reject) => {
      ffmpeg(input)
        .videoFilters([
          `scale=${targetWidth}:${targetHeight}:force_original_aspect_ratio=decrease`,
        ])
        .outputOptions(["-c:v libx264", "-preset veryfast", "-crf 23", "-c:a aac"])
        .on("end", resolve)
        .on("error", reject)
        .save(output);
    });

    await sock.sendMessage(
      m.chat,
      {
        video: fs.readFileSync(output),
        caption: `✅ Video berhasil diresize ke *${targetWidth}x${targetHeight}*`,
      },
      { quoted: m },
    );

    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch (error) {
    console.error("[resizevideo]", error);
    return m.reply(`❌ Gagal resize video: ${error.message}`);
  }
}

export { pluginConfig as config, handler };
