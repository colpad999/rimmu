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

import config from "../../config.js";
import te from "../../src/lib/rimuru-error.js";
import { sendToolsPreview, saluranCtx } from "../../src/lib/rimuru-context.js";
const pluginConfig = {
  name: "ipinfo",
  category: "tools",
  description: "Lookup informasi IP address",
  usage: ".ipwho <ip>",
  example: ".ipwho 8.8.8.8",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const ip = m.args?.[0];

  if (!ip) {
    return m.reply(
      `⚠️ *ᴄᴀʀᴀ ᴘᴀᴋᴀɪ*\n\n` +
        `> \`${m.prefix}ipwho <ip>\`\n\n` +
        `> Contoh:\n` +
        `> \`${m.prefix}ipwho 8.8.8.8\``,
    );
  }

  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipRegex.test(ip)) {
    return m.reply(`❌ *ғᴏʀᴍᴀᴛ ᴛɪᴅᴀᴋ ᴠᴀʟɪᴅ*\n\n> Contoh: \`8.8.8.8\``);
  }

  await m.react("🕕");
  await m.reply(`🕕 *ᴍᴇɴᴄᴀʀɪ ɪɴꜰᴏ ɪᴘ...*`);

  try {
    const res = await fetch(`https://ipwho.is/${ip}`);
    const data = await res.json();

    if (!data.success) {
      await m.react("❌");
      return m.reply(`❌ *ɪᴘ ᴛɪᴅᴀᴋ ᴅɪᴛᴇᴍᴜᴋᴀɴ*\n\n> IP ${ip} tidak valid`);
    }

    if (data.latitude && data.longitude) {
      await sock.sendMessage(
        m.chat,
        {
          location: {
            degreesLatitude: data.latitude,
            degreesLongitude: data.longitude,
          },
        },
        { quoted: m },
      );
    }

    const text =
      `🌐 *ɪᴘ ʟᴏᴏᴋᴜᴘ*\n\n` +
      `╭┈┈⬡「 📍 *ʟᴏᴋᴀsɪ* 」\n` +
      `┃ 🔢 IP: ${data.ip}\n` +
      `┃ 🌍 Country: ${data.country} ${data.country_code}\n` +
      `┃ 🏙️ City: ${data.city || "-"}\n` +
      `┃ 📍 Region: ${data.region || "-"}\n` +
      `┃ 🌐 Continent: ${data.continent || "-"}\n` +
      `┃ 📮 Postal: ${data.postal || "-"}\n` +
      `┃ ⏰ Timezone: ${data.timezone?.id || "-"}\n` +
      `╰┈┈┈┈┈┈┈┈⬡\n\n` +
      `╭┈┈⬡「 🔌 *ᴋᴏɴᴇᴋsɪ* 」\n` +
      `┃ 🏢 ISP: ${data.connection?.isp || "-"}\n` +
      `┃ 🌐 ORG: ${data.connection?.org || "-"}\n` +
      `┃ 📡 ASN: ${data.connection?.asn || "-"}\n` +
      `╰┈┈┈┈┈┈┈┈⬡\n\n` +
      `╭┈┈⬡「 🛡️ *sᴇᴄᴜʀɪᴛʏ* 」\n` +
      `┃ 🔒 VPN: ${data.security?.vpn ? "✅ Yes" : "❌ No"}\n` +
      `┃ 🌐 Proxy: ${data.security?.proxy ? "✅ Yes" : "❌ No"}\n` +
      `┃ 🤖 Tor: ${data.security?.tor ? "✅ Yes" : "❌ No"}\n` +
      `╰┈┈┈┈┈┈┈┈⬡`;

    await m.react("✅");
    await sendToolsPreview(sock, m.chat, text, "🌐 *ɪᴘ ʟᴏᴏᴋᴜᴘ*", data.country, {
      quoted: m,
    });
  } catch (e) {
    await m.react("☢");
    m.reply(te(m.prefix, m.command, m.pushName));
  }
}

export { pluginConfig as config, handler };
