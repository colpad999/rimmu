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

export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Rimuru MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P";


import axios from 'axios';

const headers = {
  "Content-Type": "application/json; charset=UTF-8",
  "Origin": "https://enka.network",
  "Referer": "https://enka.network/",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.89 Safari/537.36",
};

const pluginConfig = {
  name: "genshinprofile",
  category: "game",
  description: "Imported from Rimuru MD V4.6",
  usage: "",
  example: "",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 3,
  energi: 0,
  isEnabled: true,
};

const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return m.reply('Harap masukkan UID Genshin Impact yang valid!');
  }

  const text = args[0];

  try {
    m.reply('Wait...');
    
    let res = await axios.get(`https://enka.network/api/uid/${text.trim()}`, { headers });
    const player = res.data.playerInfo;
    const screenshot = `https://mini.s-shot.ru/990x810/PNG/975/Z100/?https://enka.network/u/${res.data.uid}/`;

    const caption = `
*====== \`[Genshin Profile Info]\` ======*
- Nickname: ${player.nickname}
- Level: ${player.level}
- World Level: ${player.worldLevel}
- Achievement: ${player.finishAchievementNum}
- Card ID: ${player.nameCardId}
- Spiral Abyss: ${player.towerFloorIndex} - ${player.towerLevelIndex}

- Detail: https://enka.network/u/${res.data.uid}
- UID: ${res.data.uid}
    `.trim();
    
    await conn.sendMessage(
      m.chat,
      { image: { url: screenshot }, caption },
      { quoted: m }
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    m.reply(`Terjadi kesalahan: ${error.message}`);
  }
};

export { pluginConfig as config, handler };
