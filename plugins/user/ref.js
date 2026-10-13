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

import crypto from "crypto";
import { getDatabase } from "../../src/lib/rimuru-database.js";

const pluginConfig = {
  name: "ref",
  category: "user",
  description: "Sistem kode referral untuk mendapatkan EXP",
  usage: ".referal [kode]",
  example: ".referal atau .referal ABC123XYZ",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 0,
  isEnabled: true,
};

const XP_FIRST = 2500;
const XP_OWNER = 15000;
const BONUS = {
  5: 40000,
  10: 100000,
  20: 250000,
  50: 1000000,
  100: 10000000,
};

function makeCode() {
  return crypto.randomBytes(6).toString("hex").toUpperCase();
}

function getBotNumber(sock) {
  return String(sock?.user?.id || "")
    .split(":")[0]
    .replace(/[^0-9]/g, "");
}

async function handler(m, { sock }) {
  const db = getDatabase();
  const user = db.getUser(m.sender) || db.setUser(m.sender);
  if (!user) return m.reply("❌ Data user tidak dapat dibuat.");

  user.refCode ??= makeCode();
  user.refCount ??= 0;
  user.refUsed ??= false;
  db.setUser(m.sender, user);

  const code = String(m.args?.[0] || "").trim();

  if (code) {
    if (user.refUsed) {
      return m.reply("❌ Kamu sudah pernah menggunakan kode referral.");
    }

    const cleanCode = code.toUpperCase();
    const entries = Object.entries(db.data.users || {});
    const ownerEntry = entries.find(
      ([, u]) => String(u?.refCode || "").toUpperCase() === cleanCode,
    );

    if (!ownerEntry) {
      return m.reply("❌ Kode referral tidak valid.");
    }

    const [ownerJid, owner] = ownerEntry;
    const senderJid = String(m.sender).replace(/@.+/g, "");
    if (ownerJid === senderJid) {
      return m.reply("❌ Kamu tidak bisa memakai kode referral milik sendiri.");
    }

    const ownerUser = db.getUser(ownerJid) || db.setUser(ownerJid);
    if (!ownerUser) return m.reply("❌ Data pemilik referral tidak ditemukan.");

    ownerUser.refCount = Number(ownerUser.refCount || 0) + 1;
    const bonus = BONUS[ownerUser.refCount] || 0;

    db.updateExp(ownerJid, XP_OWNER + bonus);
    db.updateExp(m.sender, XP_FIRST);

    user.refUsed = true;
    db.setUser(m.sender, user);
    db.save();

    return m.reply(
      `🎉 *Referral berhasil digunakan!*\n\n` +
      `👤 Kamu: +${XP_FIRST.toLocaleString("id-ID")} EXP\n` +
      `👑 Pemilik kode: +${(XP_OWNER + bonus).toLocaleString("id-ID")} EXP\n\n` +
      `Total referral pemilik: *${ownerUser.refCount}*`,
    );
  }

  const botNumber = getBotNumber(sock);
  const link = botNumber
    ? `https://wa.me/${botNumber}?text=${encodeURIComponent(
        `${m.prefix}referal ${user.refCode}`,
      )}`
    : null;

  return m.reply(
    `🎁 *REFERRAL RIMURU*\n\n` +
      `Kode kamu: *${user.refCode}*\n` +
      `Sudah dipakai: *${user.refCount} orang*\n\n` +
      `💎 Hadiah pengguna baru: *+${XP_FIRST.toLocaleString("id-ID")} EXP*\n` +
      `👑 Hadiah pemilik kode: *+${XP_OWNER.toLocaleString("id-ID")} EXP*` +
      (link ? `\n\n🔗 Link referral:\n${link}` : ""),
  );
}

export { pluginConfig as config, handler };
