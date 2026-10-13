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
import crypto from "crypto";
import {
  generateWAMessage,
  generateWAMessageFromContent,
  jidNormalizedUser,
} from "rimuru";
import { getDatabase } from "./rimuru-database.js";
import { logger } from "./rimuru-logger.js";
import { aiodl, detectPlatform } from "../scraper/aio.js";

const SUPPORTED_PATTERNS = [
  "youtube.com",
  "youtu.be",
  "tiktok.com",
  "vt.tiktok.com",
  "facebook.com",
  "fb.watch",
  "fb.com",
  "instagram.com",
  "pinterest.com",
  "pin.it",
  "capcut.com",
  "twitter.com",
  "x.com",
  "threads.net",
  "reddit.com",
];

function containsSupportedLink(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return SUPPORTED_PATTERNS.some((p) => lower.includes(p));
}

function extractUrl(text) {
  const match = text.match(/https?:\/\/[^\s]+/i);
  return match ? match[0] : null;
}

async function sendMediaItems(result, sock, m) {
  const media = result.media || [];
  if (!media.length) throw new Error("No media found");

  const images = media.filter((i) => i.type === "image");
  const videos = media.filter((i) => i.type === "video");
  const audios = media.filter((i) => i.type === "audio");

  if (images.length > 1) {
    const opener = generateWAMessageFromContent(
      m.chat,
      {
        messageContextInfo: { messageSecret: crypto.randomBytes(32) },
        albumMessage: {
          expectedImageCount: images.length,
          expectedVideoCount: 0,
        },
      },
      {
        userJid: jidNormalizedUser(sock.user.id),
        quoted: m,
        upload: sock.waUploadToServer,
      },
    );
    await sock.relayMessage(opener.key.remoteJid, opener.message, {
      messageId: opener.key.id,
    });
    for (const item of images) {
      const msg = await generateWAMessage(
        opener.key.remoteJid,
        { image: { url: item.url } },
        {
          upload: sock.waUploadToServer,
        },
      );
      msg.message.messageContextInfo = {
        messageSecret: crypto.randomBytes(32),
        messageAssociation: {
          associationType: 1,
          parentMessageKey: opener.key,
        },
      };
      await sock.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id,
      });
    }
  } else if (images.length === 1) {
    await sock.sendMedia(m.chat, images[0].url, result.title || null, m, {
      type: "image",
      contextInfo: { forwardingScore: 99, isForwarded: true },
    });
  }

  if (videos.length > 0) {
    const best =
      videos.find((v) => v.quality === "HD" || v.quality === "mp4") ||
      videos[0];
    await sock.sendMedia(m.chat, best.url, result.title || null, m, {
      type: "video",
      contextInfo: { forwardingScore: 99, isForwarded: true },
    });
  }

  if (audios.length > 0) {
    await sock.sendMessage(
      m.chat,
      { audio: { url: audios[0].url }, mimetype: "audio/mpeg" },
      { quoted: m },
    );
  }
}

async function handleAutoDownload(m, sock, text) {
  if (!m.isGroup) return;

  const db = getDatabase();
  const groupData = db.getGroup(m.chat);
  if (!groupData?.autodl) return;

  if (!containsSupportedLink(text)) return;

  const extractedUrl = extractUrl(text);
  if (!extractedUrl) return;

  m.react("🕕");

  try {
    const result = await aiodl(extractedUrl);
    await sendMediaItems(result, sock, m);
    m.react("✅");
  } catch (err) {
    m.react("😳");
    const platform = detectPlatform(extractedUrl) || "unknown";
    logger.error("AutoDL", `[${platform}] ${err.message}`);
  }
}

const SUPPORTED_PLATFORMS = SUPPORTED_PATTERNS;

export { handleAutoDownload, containsSupportedLink, SUPPORTED_PLATFORMS };
