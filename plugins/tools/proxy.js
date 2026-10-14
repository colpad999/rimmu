//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


/**
 ╔══════════════════════
      ⧉  [proxy] — [tools]
╚══════════════════════

  ✺ Type     : Plugin ESM
  ✺ Source   : https://whatsapp.com/channel/0029VbAXhS26WaKugBLx4E05
  ✺ Creator  : SXZnightmare
  ✺ API     : https://zelapioffciall.koyeb.app
*/

const pluginConfig = {
  name: "proxy",
  category: "tools",
  description: "Imported from Yalena MD V4.6",
  usage: "",
  example: "",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock, prefix, command }) {
    const conn = sock;
    const usedPrefix = prefix || m.prefix || "."; 
    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
        
        const response = await fetch('https://zelapioffciall.koyeb.app/random/proxy');
        if (!response.ok) {
            throw new Error(`🍂 *HTTP Error!* Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.status || !data.proxy) {
            throw new Error('🍂 *Respons API tidak valid!* Format data tidak sesuai');
        }
        
        const proxy = data.proxy;
        const message = `
✅ *PROXY BERHASIL DITEMUKAN!*

📍 *IP Address:* ${proxy.ip}
🚪 *Port:* ${proxy.port}
🌍 *Country:* ${proxy.country}
🏢 *Organization:* ${proxy.org}
⚡ *Latency:* ${proxy.latency} ms
🕵️ *Anonymity:* ${proxy.anonymity}
🔗 *Full Address:* ${proxy.full}
        `.trim();
        
        await conn.reply(m.chat, message, m);
        
    } catch (error) {
        await conn.reply(m.chat, `🍂 *Gagal mengambil proxy!*\nError: ${error.message}`, m);
    } finally {
        await conn.sendMessage(m.chat, { react: { text: '', key: m.key } });
    }
};

handler.register = false; // true kan jika ada fitur register atau daftar di bot mu.

export { pluginConfig as config, handler };
