/*
╔══════════════════════════════════════════════╗
║       👑  𝑹𝑰𝑴𝑼𝑹𝑼 𝑴𝑫 〽️                        ║
╚══════════════════════════════════════════════╝

🪽 𝑵𝒐𝒕𝒆 :
AMPREM menggunakan API Hyerls.

📌 Command:
• .amprem email@example.com
• .amver email@example.com | link_verifikasi
• Reply pesan AMPREM dengan link verifikasi
*/

import axios from "axios";

const API_BASE = "https://hyerls.my.id/api/amprem.php";
const API_KEY = "ZANSPWK";
const SESSION_TTL = 10 * 60 * 1000;

const sessions = new Map();

const pluginConfig = {
  name: "amprem",
  alias: ["alightmotionprem", "amver"],
  category: "tools",
  description: "Alight Motion Premium melalui API Hyerls",
  usage: ".amprem email@example.com",
  example: ".amprem email@example.com",
  isOwner: false,
  isPremium: true,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

function sessionKey(m) {
  return `${m.chat}:${m.sender}`;
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function cleanText(value) {
  return String(value || "")
    .replace(/\r/g, "")
    .replace(/\n+/g, " ")
    .trim();
}

function extractLink(value) {
  const text = cleanText(value);
  if (!text) return "";

  const match = text.match(/https?:\/\/\S+/i);
  if (!match) return "";

  return match[0]
    .replace(/[\]}>,.;]+$/g, "")
    .trim();
}

function validLink(link) {
  try {
    const url = new URL(link);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function getApiMessage(data, status) {
  if (typeof data === "string") {
    return data.trim() || `HTTP ${status}`;
  }

  if (data && typeof data === "object") {
    const message =
      data.message ??
      data.msg ??
      data.error ??
      data.result ??
      data.data?.message ??
      data.data?.msg ??
      data.data?.error;

    if (message !== undefined && message !== null) {
      return typeof message === "string"
        ? message
        : JSON.stringify(message);
    }

    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return `HTTP ${status}`;
    }
  }

  return `HTTP ${status}`;
}

async function apiRequest(action, params = {}) {
  const response = await axios.get(API_BASE, {
    params: {
      key: API_KEY,
      action,
      ...params,
    },
    timeout: 45_000,
    headers: {
      Accept: "application/json, text/plain, */*",
      "User-Agent": "Rimuru-MD/AMPREM-Hyerls",
    },
    validateStatus: () => true,
  });

  const data = response.data;

  if (response.status < 200 || response.status >= 300) {
    throw new Error(getApiMessage(data, response.status));
  }

  if (
    data &&
    typeof data === "object" &&
    (data.success === false || data.status === false || data.ok === false)
  ) {
    throw new Error(getApiMessage(data, response.status));
  }

  return data;
}

function deleteExpiredSessions() {
  const now = Date.now();

  for (const [key, session] of sessions) {
    if (now - session.createdAt > SESSION_TTL) {
      sessions.delete(key);
    }
  }
}

setInterval(deleteExpiredSessions, 60_000).unref?.();

async function registerEmail(m, email) {
  const key = sessionKey(m);

  if (sessions.has(key)) {
    const old = sessions.get(key);

    if (Date.now() - old.createdAt <= SESSION_TTL) {
      return m.reply(
        `⏳ *SESI AMPREM MASIH AKTIF*\n\n` +
        `📧 Email: *${old.email}*\n\n` +
        `Reply pesan AMPREM sebelumnya dengan full link verifikasi.\n` +
        `Atau gunakan:\n` +
        `> ${m.prefix || "."}amver ${old.email} | link_verifikasi`
      );
    }

    sessions.delete(key);
  }

  await m.react?.("⏳");

  try {
    const result = await apiRequest("register", { email });

    const prompt = await m.reply(
      `✅ *LINK VERIFIKASI TERKIRIM*\n\n` +
      `📧 Email: *${email}*\n\n` +
      `📬 Cek *Inbox / Spam / Junk* email kamu.\n` +
      `📋 Setelah mendapatkan link dari email, *reply pesan ini* dengan full link verifikasi.\n\n` +
      `🔁 Kalau reply tetap tidak terbaca, gunakan:\n` +
      `> ${m.prefix || "."}amver ${email} | https://link-verifikasi-kamu\n\n` +
      `⏱️ Sesi berlaku selama *10 menit*.\n\n` +
      `📦 *RESPON API:*\n${getApiMessage(result, 200)}`
    );

    sessions.set(key, {
      email,
      createdAt: Date.now(),
      promptId: prompt?.key?.id || prompt?.id || null,
      stage: "waiting_link",
    });

    await m.react?.("✅");
    return prompt;
  } catch (error) {
    await m.react?.("❌");

    return m.reply(
      `❌ *GAGAL MENGIRIM LINK*\n\n` +
      `> ${error?.message || "Terjadi kesalahan pada API Hyerls."}`
    );
  }
}

async function verifyEmail(m, email, link) {
  if (!validEmail(email)) {
    return m.reply("❌ Format email tidak valid.");
  }

  const cleanLink = extractLink(link) || cleanText(link);

  if (!cleanLink || !validLink(cleanLink)) {
    return m.reply(
      `❌ *LINK VERIFIKASI TIDAK VALID*\n\n` +
      `Gunakan full link yang diterima dari email.\n\n` +
      `Contoh:\n` +
      `> ${(m.prefix || ".")}amver ${email} | https://link-verifikasi`
    );
  }

  await m.react?.("⏳");

  try {
    const result = await apiRequest("login", {
      email,
      link: cleanLink,
    });

    sessions.delete(sessionKey(m));

    await m.react?.("✅");

    return m.reply(
      `✅ *VERIFIKASI BERHASIL*\n\n` +
      `📧 Email: *${email}*\n` +
      `📅 Status: *Active*\n\n` +
      `🎉 Proses Alight Motion Premium selesai.\n\n` +
      `📦 *RESPON API:*\n${getApiMessage(result, 200)}`
    );
  } catch (error) {
    await m.react?.("❌");

    return m.reply(
      `❌ *VERIFIKASI GAGAL*\n\n` +
      `📧 Email: *${email}*\n` +
      `> ${error?.message || "Terjadi kesalahan pada API Hyerls."}`
    );
  }
}

async function handler(m, { text, command, prefix }) {
  const input = cleanText(text || m.text);
  const cmd = String(command || m.command || "amprem").toLowerCase();
  const usedPrefix = prefix || m.prefix || ".";

  // .amver email | link_verifikasi
  if (cmd === "amver") {
    if (!input || !input.includes("|")) {
      return m.reply(
        `📌 *CARA PAKAI AMVER*\n\n` +
        `> ${usedPrefix}amver email@example.com | link_verifikasi\n\n` +
        `Contoh:\n` +
        `> ${usedPrefix}amver anitaputriazzahra53@gmail.com | https://link-verifikasi`
      );
    }

    const parts = input.split("|");
    const email = cleanText(parts.shift());
    const link = cleanText(parts.join("|"));

    return verifyEmail(m, email, link);
  }

  // .amprem email | link juga didukung sebagai fallback.
  if (input.includes("|")) {
    const parts = input.split("|");
    const email = cleanText(parts.shift());
    const link = cleanText(parts.join("|"));

    return verifyEmail(m, email, link);
  }

  // .amprem email
  if (!input) {
    return m.reply(
      `✨ *ALIGHT MOTION PREMIUM*\n\n` +
      `1. Kirim email:\n` +
      `> ${usedPrefix}amprem email@example.com\n\n` +
      `2. Bot mengirim link verifikasi.\n` +
      `3. *Reply pesan bot tersebut* dengan full link dari email.\n\n` +
      `4. Kalau reply bermasalah, gunakan:\n` +
      `> ${usedPrefix}amver email@example.com | link_verifikasi`
    );
  }

  if (!validEmail(input)) {
    return m.reply("❌ Format email tidak valid.");
  }

  return registerEmail(m, input);
}

async function ampremReplyHandler(m) {
  const key = sessionKey(m);
  const session = sessions.get(key);

  if (!session || session.stage !== "waiting_link") {
    return false;
  }

  if (Date.now() - session.createdAt > SESSION_TTL) {
    sessions.delete(key);

    await m.reply(
      `⌛ *SESI AMPREM KEDALUWARSA*\n\n` +
      `Silakan ulangi:\n` +
      `> ${m.prefix || "."}amprem ${session.email}`
    );

    return true;
  }

  // Handler utama SC sudah memastikan pesan ini adalah reply (m.quoted ada).
  // Tidak memakai pencocokan promptId agar kompatibel dengan serializer SC.
  if (!m.quoted) {
    return false;
  }

  const replyText = cleanText(
    m.body ||
    m.text ||
    m.message?.conversation ||
    m.msg?.conversation ||
    m.msg?.extendedTextMessage?.text ||
    ""
  );

  const link = extractLink(replyText) || replyText;

  if (!link || !validLink(link)) {
    await m.reply(
      `❌ *LINK TIDAK VALID*\n\n` +
      `Reply pesan AMPREM dengan *full link verifikasi* dari email.\n\n` +
      `Atau gunakan:\n` +
      `> ${(m.prefix || ".")}amver ${session.email} | https://link-verifikasi`
    );

    return true;
  }

  await verifyEmail(m, session.email, link);
  return true;
}

export {
  pluginConfig as config,
  handler,
  ampremReplyHandler,
};

export default handler;