import fs from "fs";
import os from "os";
import path from "path";
import { randomUUID } from "crypto";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import { downloadContentFromMessage, prepareWAMessageMedia, generateWAMessageFromContent } from "rimuru";

try {
  if (ffmpegInstaller?.path) ffmpeg.setFfmpegPath(ffmpegInstaller.path);
} catch (error) {
  console.warn("[FOTOLIVE] FFmpeg:", error?.message || error);
}

const config = {
  name: "fotolive",
  alias: ["livephoto", "livepic"],
  category: "tools",
  description: "Membuat Foto Live dari video",
  usage: ".fotolive (reply video)",
  example: ".fotolive (reply video)",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

async function createThumbnail(videoFile, thumbFile) {
  await new Promise((resolve, reject) => {
    ffmpeg(videoFile)
      .outputOptions(["-vframes 1", "-q:v 2"])
      .output(thumbFile)
      .on("end", resolve)
      .on("error", reject)
      .run();
  });
}

async function handler(m, { sock }) {
  const videoFile = path.join(os.tmpdir(), `fotolive_${Date.now()}_${randomUUID()}.mp4`);
  const thumbFile = path.join(os.tmpdir(), `fotolive_thumb_${Date.now()}_${randomUUID()}.jpg`);

  try {
    const target = m.quoted || m;
    const mime = (target.msg || target).mimetype || target.mimetype || '';

    if (!mime.includes('video')) {
      return m.reply('Balas/reply video yang valid untuk dijadikan Live Photo ya kak~');
    }

    if (m.react) await m.react("⏳");

    let videoBuffer;
    if (typeof target.download === 'function') {
      videoBuffer = await target.download();
    } else {
      const msgObj = target.msg || target;
      const stream = await downloadContentFromMessage(msgObj, 'video');
      let chunks = [];
      for await (const chunk of stream) chunks.push(chunk);
      videoBuffer = Buffer.concat(chunks);
    }

    if (!videoBuffer?.length) throw new Error("Video gagal didownload.");

    await fs.promises.writeFile(videoFile, videoBuffer);
    await createThumbnail(videoFile, thumbFile);

    const thumbBuffer = await fs.promises.readFile(thumbFile);

    const imageMedia = await prepareWAMessageMedia(
      { image: thumbBuffer },
      { upload: sock.waUploadToServer }
    );
    const videoMedia = await prepareWAMessageMedia(
      { video: videoBuffer },
      { upload: sock.waUploadToServer }
    );

    const photoMsg = generateWAMessageFromContent(
      m.chat,
      {
        imageMessage: {
          ...imageMedia.imageMessage,
          contextInfo: { pairedMediaType: 5, statusSourceType: 0 }
        }
      },
      { quoted: m }
    );

    await sock.relayMessage(m.chat, photoMsg.message, { messageId: photoMsg.key.id });

    await sock.relayMessage(
      m.chat,
      {
        videoMessage: {
          ...videoMedia.videoMessage,
          contextInfo: { pairedMediaType: 6, statusSourceType: 0 }
        },
        messageContextInfo: {
          messageAssociation: { associationType: 12, parentMessageKey: photoMsg.key }
        }
      },
      {}
    );

    if (m.react) await m.react("✅");

  } catch (error) {
    console.error("[FOTOLIVE]", error?.stack || error);
    if (m.react) await m.react("❌");
    await m.reply(`Gagal membuat Foto Live: ${error?.message || error}`);
  } finally {
    await Promise.allSettled([
      fs.promises.rm(videoFile, { force: true }),
      fs.promises.rm(thumbFile, { force: true }),
    ]);
  }
}

export { config, handler };