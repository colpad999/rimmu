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

const RETRYABLE_CODES = new Set([
  'EAI_AGAIN',
  'ENOTFOUND',
  'ECONNRESET',
  'ECONNREFUSED',
  'ETIMEDOUT',
  'UND_ERR_CONNECT_TIMEOUT',
  'UND_ERR_SOCKET',
]);

function isNetworkError(error) {
  if (!error) return false;
  const code = String(error.code || error.cause?.code || '').toUpperCase();
  const message = String(error.message || '').toLowerCase();
  return RETRYABLE_CODES.has(code)
    || /enotfound|eai_again|econnreset|econnrefused|etimedout|network error|fetch failed|socket hang up|connect timeout/.test(message);
}

function formatNetworkError(error, service = 'layanan eksternal') {
  if (isNetworkError(error)) {
    return `Layanan ${service} sedang tidak dapat dijangkau. Silakan coba lagi beberapa saat lagi.`;
  }

  const status = error?.response?.status;
  if (status === 429) {
    return `Layanan ${service} sedang membatasi permintaan. Silakan tunggu sebentar lalu coba lagi.`;
  }
  if (status >= 500) {
    return `Server ${service} sedang bermasalah (${status}). Silakan coba lagi nanti.`;
  }

  const message = String(error?.message || 'Terjadi kesalahan.');
  return message.length > 180 ? `${message.slice(0, 177)}...` : message;
}

async function withNetworkRetry(task, {
  retries = 2,
  delayMs = 900,
  factor = 1.8,
  shouldRetry = isNetworkError,
} = {}) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await task(attempt);
    } catch (error) {
      lastError = error;
      const retryable = shouldRetry(error);
      if (!retryable || attempt >= retries) throw error;
      const delay = Math.round(delayMs * (factor ** attempt));
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Network request failed');
}

export { isNetworkError, formatNetworkError, withNetworkRetry };
