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

export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Rimuru MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P";


/**
 ╔══════════════════════
      ⧉  [twitterstalk] — [tools]
╚══════════════════════

  ✺ Type     : Plugin ESM
  ✺ Source   : https://whatsapp.com/channel/0029VbAXhS26WaKugBLx4E05
  ✺ Creator  : SXZnightmare
  ✺ Scrape      : 
  [ https://gist.github.com/ZenzzXD/001f8f53090e83f9a3d6f6eb9d649aa8 ]
  [ https://whatsapp.com/channel/0029Vap84RE8KMqfYnd0V41A/3425 ]
  ✺ Scrape Maker : [ Zenz ]
*/

import crypto from "crypto";

const pluginConfig = {
  name: "twstalk",
  category: "stalker",
  description: "Imported from Rimuru MD V4.6",
  usage: "",
  example: "",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock, text, prefix, command }) {
    const conn = sock;
    const usedPrefix = prefix || m.prefix || ".";
    try {
        if (!text) return m.reply(`*Contoh:* ${usedPrefix + command} mrbeast`);
        await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

        const username = text.replace(/^@/, "").trim();

        const chRes = await fetch("https://twittermedia.b-cdn.net/challenge/", {
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 10)",
                "Accept": "application/json",
                "Origin": "https://snaplytics.io",
                "Referer": "https://snaplytics.io/"
            }
        });

        const ch = await chRes.json();
        if (!ch.challenge_id) throw new Error("Challenge gagal");

        const hash = crypto
            .createHash("sha256")
            .update(String(ch.timestamp) + ch.random_value)
            .digest("hex")
            .slice(0, 8);

        const dataRes = await fetch(
            `https://twittermedia.b-cdn.net/viewer/?data=${encodeURIComponent(username)}&type=profile`,
            {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Linux; Android 10)",
                    "Accept": "application/json",
                    "Origin": "https://snaplytics.io",
                    "Referer": "https://snaplytics.io/",
                    "X-Challenge-ID": ch.challenge_id,
                    "X-Challenge-Solution": hash
                }
            }
        );

        const json = await dataRes.json();
        if (!json || !json.profile) throw new Error("Data tidak ditemukan");

        const p = json.profile;

        let caption = `
🧭 *Hasil Pelacakan Profil X*

👤 *Nama Pengguna:* ${p.name || "Tidak Ditemukan"}
🔖 *Username / Handle:* @${username}
${p.verified ? "✅ *Akun Terverifikasi*" : "❌ *Akun Tidak Terverifikasi*"}
📝 *Bio / Deskripsi:*
${p.bio ? `"${p.bio}"` : "(Tidak ada bio)"}

📊 *Statistik Akun*
━━━━━━━━━━━━━━━━━━
📈 *Jumlah Postingan:* ${p.stats?.tweets ?? 0}
👁️ *Sedang Mengikuti:* ${p.stats?.following ?? 0}
⭐ *Jumlah Pengikut:* ${p.stats?.followers ?? 0}
━━━━━━━━━━━━━━━━━━

📌 *Catatan:* Data ini diambil pada ${new Date().toLocaleDateString("id-ID")}.
`.trim();

        if (p.banner_url) {
            await conn.sendMessage(
                m.chat,
                {
                    image: { url: p.banner_url },
                    caption
                },
                { quoted: m }
            );
        } else if (p.avatar_url) {
            await conn.sendMessage(
                m.chat,
                {
                    image: { url: p.avatar_url },
                    caption
                },
                { quoted: m }
            );
        } else {
            await m.reply(caption);
        }
    } catch (e) {
        await m.reply(`🍂 *Gagal mengambil data Twitter*\n\n📩 ${e.message}`);
    } finally {
        await conn.sendMessage(m.chat, { react: { text: "", key: m.key } });
    }
};

handler.register = false; // true kan jika ada fitur register atau daftar di bot mu.

export { pluginConfig as config, handler };
