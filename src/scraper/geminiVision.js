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

import gemini from "./gemini.js";

function buildMessage({ message, history = [], imageBuffer = null }) {
  const parts = [];

  if (Array.isArray(history) && history.length > 0) {
    const historyText = history
      .slice(-10)
      .map((item) => {
        const role = item?.role === "assistant" ? "Assistant" : "User";
        const content = String(item?.content || "").trim();
        return content ? `${role}: ${content}` : "";
      })
      .filter(Boolean)
      .join("\n");

    if (historyText) {
      parts.push(`Riwayat percakapan:\n${historyText}`);
    }
  }

  if (imageBuffer) {
    parts.push(
      "User mengirim gambar. Jika model tidak bisa melihat gambar secara langsung, tetap jawab sebaik mungkin dari konteks teks yang ada.",
    );
  }

  parts.push(String(message || "").trim());

  return parts.filter(Boolean).join("\n\n").trim();
}

async function chat({
  message,
  instruction = "",
  imageBuffer = null,
  history = [],
} = {}) {
  const result = await gemini({
    message: buildMessage({ message, history, imageBuffer }),
    instruction,
  });

  return {
    text: result.text,
    raw: result.raw || result.text,
    model: result.model || "gemini",
    sessionId: result.sessionId || null,
  };
}

export { chat };
