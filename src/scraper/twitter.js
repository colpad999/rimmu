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

import axios from "axios"
import crypto from "crypto"

function generateCfToken() {
  return [
    '0',
    crypto.randomBytes(16).toString('hex'),
    crypto.randomBytes(32).toString('base64url'),
    crypto.randomBytes(64).toString('base64url'),
    crypto.randomBytes(32).toString('hex')
  ].join('.');
}

async function x2twitterDl(url) {
  try {
    const cfToken = generateCfToken();
    const sessionToken = crypto.randomBytes(16).toString('hex');

    const searchResponse = await axios.post('https://x2twitter.com/api/ajaxSearch', 
      new URLSearchParams({ q: url, lang: 'id', cftoken: cfToken }), 
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest',
          'Origin': 'https://x2twitter.com',
          'Referer': 'https://x2twitter.com/id',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Cookie': `_session=${sessionToken}; lang=id`
        }
      }
    );

    if (searchResponse.data.status !== 'ok') {
      return { error: true, message: 'Gagal mengambil data dari x2twitter.' };
    }

    const html = searchResponse.data.data;

    const thumbnail = (html.match(/<img\s+src="([^"]+)"/) || [])[1] || '-';
    const duration = (html.match(/<p>(\d+:\d+)<\/p>/) || [])[1] || '-';

    const tokenMatches = [...html.matchAll(/href="https:\/\/dl\.snapcdn\.app\/get\?token=([^"]+)"/g)].map(m => m[1]);
    const videos = tokenMatches.map(token => {
      try {
        const payloadBase64 = token.split('.')[1];
        const decoded = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf-8'));
        
        if (decoded.filename && /\.(jpg|jpeg|png)$/i.test(decoded.filename)) return null;

        return {
          resolution: decoded.filename ? decoded.filename.split('_').pop().replace('.mp4', '') : 'unknown',
          url: `https://dl.snapcdn.app/get?token=${token}`
        };
      } catch (e) {
        return null;
      }
    }).filter(Boolean);

    const audioUrl = (html.match(/data-audioUrl="([^"]+)"/) || [])[1];
    const mediaId = (html.match(/data-mediaId="([^"]+)"/) || [])[1];
    const hostConvert = (html.match(/k_url_convert\s*=\s*"([^"]+)"/) || [])[1] || 'https://s1.twcdn.net/api/json/convert';
    const exp = (html.match(/k_exp\s*=\s*"([^"]+)"/) || [])[1];
    const token = (html.match(/k_token\s*=\s*"([^"]+)"/) || [])[1];

    let audio = null;

    if (audioUrl && mediaId && exp && token) {
      try {
        const convertResponse = await axios.post(hostConvert, 
          new URLSearchParams({
            ftype: 'mp3',
            v_id: mediaId,
            audioUrl: audioUrl,
            audioType: 'video/mp4',
            fquality: '128',
            fname: 'X2Twitter.com',
            exp: exp,
            token: token
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              'Accept': '*/*',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
            }
          }
        );

        if (convertResponse.data && convertResponse.data.status === 'success') {
          audio = {
            title: 'X2Twitter.com.mp3',
            url: convertResponse.data.result
          };
        }
      } catch (err) {
        audio = null;
      }
    }

    return {
      code: 200,
      status: 'success',
      metadata: {
        thumbnail,
        duration
      },
      videos,
      audio
    };

  } catch (e) {
    return {
      error: true,
      message: e.message
    };
  }
}

export default x2twitterDl;