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

import { getCategories, getCommandsByCategory } from '../../src/lib/rimuru-plugins.js';

const pluginConfig = {
  name: 'menulist',
  category: 'info',
  description: 'Menampilkan ringkasan menu aktif Rimuru MD',
  usage: '.totalmenu',
  example: '.totalmenu',
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { db }) {
  const commands = getCommandsByCategory();
  const categories = getCategories().filter((cat) => (commands[cat] || []).length);
  const total = categories.reduce((n, cat) => n + (commands[cat]?.length || 0), 0);
  const owner = m.isOwner ? '\n• Owner: dapat melihat kategori Owner' : '';

  const text =
`╭─〔 ✦ 𝑹𝑰𝑴𝑼𝑹𝑼 𝑴𝑫 ✦ 〕─╮
│  𝑴𝒆𝒏𝒖 𝑨𝒌𝒕𝒊𝒇 : 𝑽𝟓 — 𝑳𝑽 𝟐
│  𝑲𝒂𝒕𝒆𝒈𝒐𝒓𝒊  : ${categories.length}
│  𝑭𝒊𝒕𝒖𝒓      : ${total}
│
│  Menu sudah dikunci ke tampilan V5 — LV 2.
│  Tampilan menu dikunci ke satu versi utama.
│  Pilih kategori melalui tombol 🌸 Pilih Menu.${owner}
╰────────────────────╯`;

  await m.reply(text);
}

export { pluginConfig as config, handler };
