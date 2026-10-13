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

const pluginConfig = {
  name: "notifch",
  category: "owner",
  description: "Mengatur notifikasi channel WhatsApp yang diikuti bot",
  usage: ".notifch <nomor>|on/off",
  example: ".notifch 1,3|on",
  isOwner: true,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  try {
    if (typeof sock.newsletterFetchAllParticipating !== "function") {
      return m.reply("❌ WhatsApp/Baileys pada versi ini tidak menyediakan fitur daftar channel.");
    }

    if (m.chat?.endsWith("@newsletter")) {
      const action = String(m.text || "").trim().toLowerCase();
      if (!['on', 'off'].includes(action)) {
        return m.reply(`Gunakan:\n${m.prefix}notifch on — matikan notifikasi channel ini\n${m.prefix}notifch off — aktifkan notifikasi channel ini`);
      }
      if (action === 'on' && typeof sock.newsletterMute === 'function') {
        await sock.newsletterMute(m.chat);
        return m.reply("🔕 Notifikasi channel ini berhasil dimatikan.");
      }
      if (action === 'off' && typeof sock.newsletterUnmute === 'function') {
        await sock.newsletterUnmute(m.chat);
        return m.reply("🔔 Notifikasi channel ini berhasil diaktifkan.");
      }
      return m.reply("❌ Method mute/unmute channel tidak tersedia pada Baileys ini.");
    }

    const channels = await sock.newsletterFetchAllParticipating();
    const list = Object.values(channels || {});
    if (!list.length) return m.reply("❌ Tidak ada channel yang diikuti bot.");

    const raw = String(m.text || "").trim();
    if (!raw) {
      const teks = list.map((ch, i) => `${i + 1}. ${ch.name || "Tanpa Nama"}\n   ID: ${ch.id}\n   Subs: ${ch.subscribers || 0}`).join("\n\n");
      return m.reply(`*📋 Channel yang Diikuti (${list.length})*\n\n${teks}\n\nGunakan:\n${m.prefix}notifch 1,3|on\n${m.prefix}notifch 2|off`);
    }

    const [idPart, actionRaw] = raw.split("|", 2).map(v => v?.trim());
    const action = actionRaw?.toLowerCase();
    if (!idPart || !['on', 'off'].includes(action)) {
      return m.reply(`Format: ${m.prefix}notifch 1,3|on atau ${m.prefix}notifch 2|off`);
    }

    const indexes = idPart.split(',').map(v => Number.parseInt(v.trim(), 10) - 1);
    const results = [];
    for (const idx of indexes) {
      const target = Number.isInteger(idx) ? list[idx] : null;
      if (!target?.id) continue;
      try {
        if (action === 'on') {
          if (typeof sock.newsletterMute !== 'function') throw new Error('newsletterMute tidak tersedia');
          await sock.newsletterMute(target.id);
          results.push(`🔕 ${target.name || target.id} dimute.`);
        } else {
          if (typeof sock.newsletterUnmute !== 'function') throw new Error('newsletterUnmute tidak tersedia');
          await sock.newsletterUnmute(target.id);
          results.push(`🔔 ${target.name || target.id} di-unmute.`);
        }
      } catch (e) {
        results.push(`⚠️ ${target.name || target.id}: ${e?.message || 'gagal diproses'}`);
      }
    }

    return m.reply(results.length ? results.join('\n') : "❌ Tidak ada nomor channel yang valid.");
  } catch (e) {
    console.error('[NotifCh]', e?.message || e);
    return m.reply(`❌ Gagal mengatur notifikasi channel: ${e?.message || 'unknown error'}`);
  }
}

export { pluginConfig as config, handler };
