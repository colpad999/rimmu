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
import FormData from 'form-data';
import { getAssetBuffer } from '../../src/lib/rimuru-asset-manager.js';
import { uploadTo0x0 } from '../../src/lib/rimuru-tmpfiles.js';
import te from '../../src/lib/rimuru-error.js';

const pluginConfig = {
  name: 'mlbbfake',
  category: 'canvas',
  description: 'Membuat fake ML profile card',
  usage: '.fakeml <nama> (reply/kirim foto)',
  example: '.fakeml Misaki',
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 10,
  energi: 1,
  isEnabled: true,
};

const CATBOX_URL = 'https://catbox.moe/user/api.php';
const FAKE_ML_API = 'https://api.nexray.web.id/maker/fakelobyml';

async function uploadImage(buffer) {
  const form = new FormData();
  form.append('reqtype', 'fileupload');
  form.append('fileToUpload', buffer, {
    filename: 'rimuru-fakeml-avatar.jpg',
    contentType: 'image/jpeg',
  });

  const response = await axios.post(CATBOX_URL, form, {
    headers: form.getHeaders(),
    timeout: 30000,
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    validateStatus: (status) => status >= 200 && status < 300,
  });

  const url = String(response.data || '').trim();
  if (!/^https?:\/\//i.test(url)) {
    throw new Error('Upload avatar tidak menghasilkan URL yang valid');
  }
  return url;
}

function isImageBuffer(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 4) return false;
  const hex = buffer.subarray(0, 12).toString('hex').toLowerCase();
  return (
    hex.startsWith('ffd8ff') ||
    hex.startsWith('89504e470d0a1a0a') ||
    hex.startsWith('47494638') ||
    (buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
      buffer.subarray(8, 12).toString('ascii') === 'WEBP')
  );
}

async function getInputImage(m, sock) {
  const quotedType = m.quoted?.mtype || m.quoted?.type || m.quoted?.msg?.mtype;
  if (m.quoted && quotedType === 'imageMessage' && typeof m.quoted.download === 'function') {
    return m.quoted.download();
  }

  const ownType = m.type || m.mtype;
  if (m.isMedia && ownType === 'imageMessage' && typeof m.download === 'function') {
    return m.download();
  }

  try {
    const profileUrl = await sock.profilePictureUrl(m.sender, 'image');
    const response = await axios.get(profileUrl, {
      responseType: 'arraybuffer',
      timeout: 15000,
    });
    const profileBuffer = Buffer.from(response.data);
    if (isImageBuffer(profileBuffer)) return profileBuffer;
  } catch {}

  return getAssetBuffer('pp-kosong');
}

async function handler(m, { sock, text }) {
  const name = String(text ?? m.text ?? '').trim();
  if (!name) {
    return m.reply(
      `🎮 *ꜰᴀᴋᴇ ᴍʟ ᴘʀᴏꜰɪʟᴇ*\n\n` +
      `> Masukkan nama untuk profile\n\n` +
      `*ᴄᴀʀᴀ ᴘᴀᴋᴀɪ:*\n` +
      `> 1. Kirim foto + caption \`${m.prefix}fakeml <nama>\`\n` +
      `> 2. Reply foto dengan \`${m.prefix}fakeml <nama>\``
    );
  }

  await m.react('🕕');

  try {
    const buffer = await getInputImage(m, sock);
    if (!isImageBuffer(buffer)) {
      throw new Error('Avatar tidak terbaca sebagai gambar');
    }

    let avatarUrl;
    try {
      avatarUrl = await uploadImage(buffer);
    } catch (uploadError) {
      // Fallback ke uploader internal lama agar fitur tetap punya jalur kedua.
      const uploaded = await uploadTo0x0(buffer, {
        filename: 'image.jpg',
        contentType: 'image/jpeg',
        timeoutMs: 30000,
      });
      avatarUrl = uploaded?.directUrl || uploaded?.url;
      if (!/^https?:\/\//i.test(String(avatarUrl || ''))) {
        throw uploadError;
      }
    }

    const apiUrl = `${FAKE_ML_API}?avatar=${encodeURIComponent(avatarUrl)}&nickname=${encodeURIComponent(name)}`;
    const response = await axios.get(apiUrl, {
      responseType: 'arraybuffer',
      timeout: 45000,
      headers: {
        Accept: 'image/*',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 16) AppleWebKit/537.36 Chrome/140 Mobile Safari/537.36',
      },
      validateStatus: (status) => status >= 200 && status < 300,
    });

    const result = Buffer.from(response.data);
    if (!isImageBuffer(result)) {
      const preview = result.toString('utf8').slice(0, 300);
      throw new Error(`API Fake ML tidak mengembalikan gambar${preview ? `: ${preview}` : ''}`);
    }

    await sock.sendMessage(
      m.chat,
      {
        image: result,
        caption: `🎮 *FAKE ML PROFILE*\n\n👤 *Nickname:* ${name}`,
      },
      { quoted: m }
    );

    await m.react('✅');
  } catch (error) {
    console.error('[FAKEML ERROR]', error);
    await m.react('❌');
    await m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
