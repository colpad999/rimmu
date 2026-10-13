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
              ❖ 𝐉𝐚𝐧𝒈𝒂𝒏 𝒉𝒂𝒑𝒖𝒔 𝒄𝒓𝒆𝒅𝒊𝒕 ❖

                 「 👑 𝑹𝑰𝑴𝑼𝑹𝑼 𝑴𝑫 👑 」
*/

import axios from 'axios';

const COPY_API = 'https://copier.saveweb2zip.com/api';

const pluginConfig = {
  name: 'web2zip',
  category: 'tools',
  description: 'Salin website menjadi file ZIP',
  usage: '.web2zip <url>',
  example: '.web2zip https://example.com',
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 30,
  energi: 3,
  isEnabled: true
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function cloneSite(inputUrl) {
  const url = /^https?:\/\//i.test(inputUrl) ? inputUrl : `https://${inputUrl}`;
  const { data } = await axios.post(`${COPY_API}/copySite`, {
    url,
    renameAssets: true,
    saveStructure: true,
    alternativeAlgorithm: false,
    mobileVersion: false
  }, {
    timeout: 30000,
    headers: {
      accept: '*/*',
      'content-type': 'application/json',
      origin: 'https://saveweb2zip.com',
      referer: 'https://saveweb2zip.com/'
    }
  });
  if (!data?.md5) throw new Error('Gagal memulai proses cloning website.');

  for (let attempt = 0; attempt < 60; attempt++) {
    const { data: status } = await axios.get(`${COPY_API}/getStatus/${data.md5}`, {
      timeout: 15000,
      headers: { accept: '*/*', referer: 'https://saveweb2zip.com/' }
    });
    if (status?.isFinished) {
      if (status.errorCode && status.errorCode !== 0) throw new Error(status.errorText || `Error ${status.errorCode}`);
      return {
        url,
        files: status.copiedFilesAmount,
        downloadUrl: `${COPY_API}/downloadArchive/${status.md5 || data.md5}`
      };
    }
    await delay(2000);
  }
  throw new Error('Timeout, proses cloning terlalu lama.');
}

async function handler(m, { sock, text }) {
  const input = text?.trim();
  if (!input) return m.reply('🌐 *WEB2ZIP*\n\nKirim link website yang mau dicopy.\n\nContoh:\n.web2zip https://example.com');
  try {
    await m.react?.('🌐');
    const result = await cloneSite(input);
    const safeName = result.url.replace(/^https?:\/\//i, '').replace(/[^a-z0-9._-]+/gi, '_').slice(0, 80) || 'website';
    await sock.sendMessage(m.chat, {
      document: { url: result.downloadUrl },
      mimetype: 'application/zip',
      fileName: `${safeName}.zip`,
      caption: `╭───┈ *WEB CLONER* ┈───\n│ 🌐 *URL:* ${result.url}\n│ 📂 *Total File:* ${result.files ?? '-'}\n│ 💾 *Status:* Berhasil\n╰─────────────────────`
    }, { quoted: m });
    await m.react?.('✅');
  } catch (err) {
    console.error('[web2zip]', err);
    await m.react?.('❌');
    return m.reply(`❌ Gagal menyalin website: ${err.message}`);
  }
}

export { pluginConfig as config, handler };
