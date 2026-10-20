//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


import axios from "axios";
import FormData from "form-data";
import te from "../../src/lib/yalena-error.js";

const pluginConfig = {
  name: ["fakediscord", "dcfake", "fakedc"],
  category: "elaina",
  description: "Membuat screenshot chat Discord palsu",
  usage: ".fakediscord nama|pesan (reply gambar opsional)",
  example: ".fakediscord Colpad|Halo semuanya",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

async function uploadImage(buffer) {
  const form = new FormData();
  form.append("file", buffer, { filename: "avatar.jpg", contentType: "image/jpeg" });

  const { data } = await axios.post("https://tmpfiles.org/api/v1/upload", form, {
    headers: form.getHeaders(),
    timeout: 30000,
    maxBodyLength: Infinity,
  });

  const url = data?.data?.url;
  if (!url) throw new Error("Upload avatar gagal.");
  const match = url.match(/tmpfiles\.org\/(\d+)/);
  if (!match) throw new Error("URL upload tidak valid.");
  return `https://tmpfiles.org/dl/${match[1]}/avatar.jpg`;
}

async function handler(m, { sock }) {
  const text = m.text?.trim();
  const parts = text ? text.split("|").map((v) => v.trim()) : [];
  if (parts.length < 2 || !parts[0] || !parts[1]) {
    return m.reply(
      `💬 *FAKE DISCORD*\n\n` +
      `Format: ${m.prefix}${m.command} nama|pesan\n\n` +
      `Reply gambar jika ingin memakai avatar.`
    );
  }

  const q = m.quoted;
  const mime = q?.mimetype || q?.msg?.mimetype || "";
  const hasImage = /^image\//i.test(mime);
  if (!hasImage) {
    return m.reply("❌ Reply gambar untuk avatar Discord.");
  }

  await m.react("⏳");
  try {
    const buffer = await q.download();
    const imageUrl = await uploadImage(buffer);

    const { data } = await axios.get(
      "https://zelapioffciall.koyeb.app/canvas/fakediscord",
      {
        params: {
          name: parts[0],
          text: parts.slice(1).join("|"),
          url: imageUrl,
        },
        responseType: "arraybuffer",
        timeout: 60000,
      }
    );

    await m.react("✅");
    return sock.sendMedia(m.chat, Buffer.from(data), `💬 *FAKE DISCORD*\n\n> ${parts[0]}: ${parts.slice(1).join("|")}`, m, { type: "image" });
  } catch (error) {
    await m.react("❌");
    return m.reply(`❌ *Fake Discord Error*\n\n${te(m.prefix, m.command, error?.message || "Gagal membuat gambar.")}`);
  }
}

export { pluginConfig as config, handler };
