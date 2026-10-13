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

/**
 * .bypass <url>
 * Contoh: .bypass sfl.gl/lqOU0
 */
const pluginConfig = {
  name: "bypasser",
  category: "tools",
  description: "Bypass shortlink / locked URL",
  usage: ".bypass <url>",
  example: ".bypass sfl.gl/lqOU0",
  isOwner: false,
  isPremium: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

const API_BASE = "https://albyoffc.my.id/api/bypass/all";
const API_KEY = "albymd-235b23e";

function normalizeUrl(input) {
  let u = String(input || "").trim();
  if (!u) return null;
  const m =
    u.match(/https?:\/\/[^\s<>"']+/i) ||
    u.match(/(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s<>"']*)?/i);
  if (m) u = m[0].replace(/[)\]>,.]+$/g, "");
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  try {
    new URL(u);
    return u;
  } catch {
    return null;
  }
}

function pickResult(data) {
  if (data == null) return null;
  if (typeof data === "string") return data;
  const keys = [
    "result",
    "url",
    "link",
    "destination",
    "target",
    "final",
    "bypass",
  ];
  for (const k of keys) {
    if (typeof data[k] === "string" && data[k]) return data[k];
  }
  if (data.data) {
    if (typeof data.data === "string") return data.data;
    for (const k of keys) {
      if (typeof data.data?.[k] === "string" && data.data[k]) return data.data[k];
    }
  }
  return null;
}

function box(title, lines) {
  const body = lines.filter(Boolean).join("\n");
  return `╭──━─━─━─━─━─━─━─━─╮\n│ *${title}*\n├──━─━─━─━─━─━─━─━─┤\n${body
    .split("\n")
    .map((l) => `│ ${l}`)
    .join("\n")}\n╰──━─━─━─━─━─━─━─━─╯`;
}

async function handler(m, { text, prefix, command }) {
  const pfx = prefix || ".";
  let raw = (text || "").trim();
  if (!raw && m.quoted?.text) {
    const qm =
      m.quoted.text.match(/https?:\/\/[^\s<>"']+/i) ||
      m.quoted.text.match(/(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s<>"']*)?/i);
    if (qm) raw = qm[0];
  }

  if (!raw) {
    return m.reply(
      box("BYPASS LINK", [
        `📦 Format: *${pfx}${command}* <url>`,
        `📌 Contoh: *${pfx}${command}* sfl.gl/lqOU0`,
        ``,
        `📋 Support: *${pfx}suppbypass*`,
      ])
    );
  }

  const url = normalizeUrl(raw);
  if (!url) return m.reply("❌ URL tidak valid.");

  try {
    await m.react?.("⏳");
    const apiUrl = `${API_BASE}?apikey=${encodeURIComponent(API_KEY)}&url=${encodeURIComponent(url)}`;
    const res = await fetch(apiUrl, { headers: { accept: "application/json" } });
    let data = null;
    const rawBody = await res.text();
    try {
      data = JSON.parse(rawBody);
    } catch {
      data = { raw: rawBody };
    }

    if (!res.ok) {
      await m.react?.("❌");
      return m.reply(
        box("BYPASS GAGAL", [
          `HTTP: ${res.status}`,
          `URL: ${url}`,
          String(data?.message || data?.msg || rawBody).slice(0, 500),
        ])
      );
    }

    if (data?.status === false || data?.success === false) {
      await m.react?.("❌");
      return m.reply(
        box("BYPASS GAGAL", [
          data.message || data.msg || "Gagal memproses link.",
          `URL: ${url}`,
        ])
      );
    }

    const result = pickResult(data);
    await m.react?.("✅");

    if (result) {
      return m.reply(
        box("BYPASS BERHASIL", [
          `🔗 Asal:`,
          url,
          ``,
          `✅ Hasil:`,
          result,
        ])
      );
    }

    // fallback full json (trimmed)
    const pretty = JSON.stringify(data, null, 2).slice(0, 3000);
    return m.reply(
      box("BYPASS RESULT", [
        `🔗 ${url}`,
        ``,
        "```json",
        pretty,
        "```",
      ])
    );
  } catch (e) {
    await m.react?.("❌");
    return m.reply(`❌ Error: ${e.message || e}`);
  }
}

export const config = pluginConfig;
export { handler, pluginConfig };
export default { config: pluginConfig, handler };