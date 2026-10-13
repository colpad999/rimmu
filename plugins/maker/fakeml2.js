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

import axios from 'axios';
import { withNetworkRetry, formatNetworkError } from '../../src/lib/rimuru-network.js';
import FormData from 'form-data';

const pluginConfig = {
  name: "fakeml2",
  category: "maker",
  description: "Membuat kartu profil Mobile Legends palsu (v2)",
  usage: ".fakeml2 username|rank|border (reply/kirim foto untuk avatar)",
  example: ".fakeml2 AlwaysCodex|imo|10",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

async function uploadToCatbox(buffer) {
  try {
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('fileToUpload', buffer, { filename: 'avatar.jpg' });

    const res = await axios.post('https://catbox.moe/user/api.php', form, {
      headers: form.getHeaders()
    });
    return res.data;
  } catch (err) {
    console.error('[CATBOX UPLOAD ERROR]', err);
    return null;
  }
}

async function handler(m, { sock, text }) {
  const input = (text || m.text?.split(' ').slice(1).join(' ') || '').trim();

  // Jika input kosong, tampilkan panduan & daftar opsi yang tersedia
  if (!input) {
    let guide = `🎮 *FAKEML2 - MOBILE LEGENDS CARD MAKER* 🎮\n\n`;
    guide += `Format penggunaan:\n`;
    guide += `\`${m.prefix || '.'}fakeml2 username|rank|border\`\n\n`;
    guide += `> _Kirim/reply gambar bersamaan dengan command untuk custom foto avatar!_\n\n`;
    
    guide += `🏆 *Daftar Pilihan Rank:* \n`;
    guide += `• \`gm\` (Grandmaster)\n`;
    guide += `• \`epic\` (Epic)\n`;
    guide += `• \`legend\` (Legend)\n`;
    guide += `• \`honor\` (Mythic Honor)\n`;
    guide += `• \`glory\` (Mythic Glory)\n`;
    guide += `• \`imo\` (Mythic Immortal)\n`;
    guide += `• \`mawi\` (Mawi)\n\n`;

    guide += `🖼️ *Daftar Pilihan Border:* \n`;
    guide += `• Angka \`0\` sampai \`16\`\n\n`;

    guide += `📌 *Contoh Penggunaan:*\n`;
    guide += `• \`${m.prefix || '.'}fakeml2 AlwaysCodex|imo|10\`\n`;
    guide += `• \`${m.prefix || '.'}fakeml2 ZennzXD|glory|5\`\n`;

    return m.reply(guide.trim());
  }

  const [usernameInput, rankInput, borderInput] = input.split('|').map(v => v ? v.trim() : '');

  if (!usernameInput) {
    return m.reply(`⚠️ Username harus diisi!\nContoh: \`${m.prefix || '.'}fakeml2 AlwaysCodex|imo|10\``);
  }

  const username = usernameInput;
  const rank = (rankInput || 'imo').toLowerCase();
  const border = borderInput || '10';

  await m.react('⏳');

  try {
    let avatarUrl = '';
    const q = m.quoted ? m.quoted : m;
    const isImage = q.mtype === 'imageMessage' || q.type === 'imageMessage' || (q.msg && q.msg.mtype === 'imageMessage');

    // 1. Ambil avatar dari gambar yang dikirim/direply
    if (isImage && typeof q.download === 'function') {
      const imgBuffer = await q.download();
      avatarUrl = await uploadToCatbox(imgBuffer);
    }

    // 2. Fallback ke Foto Profil WA Pengirim jika tidak ada gambar
    if (!avatarUrl) {
      try {
        avatarUrl = await sock.profilePictureUrl(m.sender, 'image');
      } catch {
        avatarUrl = 'https://files.catbox.moe/u8o0j2.jpg';
      }
    }

    const apiUrl = `https://api.nexray.web.id/maker/fakelobyml?username=${encodeURIComponent(username)}&rank=${encodeURIComponent(rank)}&border=${encodeURIComponent(border)}&avatar=${encodeURIComponent(avatarUrl)}`;

    const response = await withNetworkRetry(() => axios.get(apiUrl, {
      responseType: 'arraybuffer',
      timeout: 30000,
      headers: {
        Accept: 'image/*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      validateStatus: status => status >= 200 && status < 300
    }));

    const contentType = String(response.headers?.['content-type'] || '').toLowerCase();
    if (!contentType.startsWith('image/')) {
      throw new Error(`Nexray Fake ML mengembalikan content-type tidak valid: ${contentType || 'unknown'}`);
    }

    await sock.sendMessage(m.chat, {
      image: Buffer.from(response.data),
      caption: `🎮 *Fake ML Profile Card Generated!*\n\n👤 *Username:* ${username}\n🏆 *Rank:* ${rank}\n🖼️ *Border:* ${border}`
    }, { quoted: m });

    await m.react('✅');

  } catch (error) {
    console.error('[FAKEML2 ERROR]', error);
    await m.react('❌');
    await m.reply(`❌ *Gagal:* ${formatNetworkError(error, 'AlwaysCodex Fake ML')}`);
  }
}

export { pluginConfig as config, handler };
