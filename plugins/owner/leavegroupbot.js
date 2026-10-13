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

import { generateWAMessageFromContent } from 'rimuru';

const pluginConfig = {
  name: 'leavegroupbot',
  category: 'owner',
  description: 'Memilih grup tertentu untuk bot tinggalkan dari satu menu',
  usage: '.remoteleave',
  example: '.remoteleave',
  isOwner: true,
  cooldown: 10,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock, text, prefix }) {
  if (!m.isOwner && !m.isCreator) return m.reply('❌ Fitur ini hanya untuk owner.');

  try {
    const groups = Object.values(await sock.groupFetchAllParticipating());
    if (!groups.length) return m.reply('❌ Bot tidak terdaftar di grup manapun.');

    const requested = (text || '').trim();
    if (requested) {
      const target = groups.find((g) => g.id === requested);
      if (!target) return m.reply('❌ ID grup tidak ditemukan pada daftar grup bot.');

      await m.reply(`🚪 Meninggalkan *${target.subject || 'grup'}*...`);
      await sock.groupLeave(target.id);
      return;
    }

    const rows = groups.slice(0, 100).map((g) => ({
      title: (g.subject || 'Grup').slice(0, 28),
      description: `${(g.participants || []).length} member • ${g.id}`,
      id: `${prefix || '.'}remoteleave ${g.id}`,
    }));

    const sections = [];
    for (let i = 0; i < rows.length; i += 10) {
      sections.push({ title: `Grup ${i + 1}–${Math.min(i + 10, rows.length)}`, rows: rows.slice(i, i + 10) });
    }

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
          interactiveMessage: {
            body: {
              text:
                `🚪 *ʀᴇᴍᴏᴛᴇ ʟᴇᴀᴠᴇ*\n\n` +
                `Total grup: *${groups.length}*\n` +
                `Pilih grup yang ingin ditinggalkan bot.\n\n` +
                `⚠️ *Aksi tidak dapat dibatalkan.*`,
            },
            nativeFlowMessage: {
              buttons: [{
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: 'PILIH GRUP',
                  sections,
                }),
              }],
            },
          },
        },
      },
    }, { quoted: m }, {});

    await sock.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
  } catch (e) {
    return m.reply(`❌ *Remote leave gagal:* ${String(e.message).slice(0, 180)}`);
  }
}

export { pluginConfig as config, handler };
