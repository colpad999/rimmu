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

import { getDatabase } from "../../src/lib/rimuru-database.js";
import { addExpWithLevelCheck } from "../../src/lib/rimuru-level.js";

const pluginConfig = {
  name: "adv",
  category: "rpg",
  description: "Berpetualang untuk mendapat Exp dan hadiah",
  usage: ".adventure",
  example: ".adventure",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 120,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const db = getDatabase();
  const user = db.getUser(m.sender);

  if (!user.rpg) user.rpg = {};
  user.rpg.health = user.rpg.health || 100;

  if (user.rpg.health < 30) {
    return m.reply(`Aduh kak, HP kamu sekarat nih! 😭💔\n\nMinimal butuh *30 HP* buat berpetualang biar nggak mati di jalan.\nSekarang HP kamu cuma sisa *${user.rpg.health} HP*. Yuk nge-heal dulu! 💉✨`);
  }

  const locations = ["🌲 Hutan Gelap", "🏔️ Gunung Es Abadi", "🏜️ Padang Pasir Kematian", "🌋 Gunung Berapi", "🏰 Kastil Tua Berhantu", "🌊 Pantai Misterius"];
  const location = locations[Math.floor(Math.random() * locations.length)];

  await m.react("🗺️");
  await m.reply(`Mengepak ransel dan menyalakan obor... Memasuki *${location}*... ⚔️🗺️\nHati-hati ya kak, auranya lumayan mencekam!`);
  await new Promise((r) => setTimeout(r, 2500));

  const isWin = Math.random() < 0.6;

  if (isWin) {
    const expGain = Math.floor(Math.random() * 2000) + 500;
    const moneyGain = Math.floor(Math.random() * 10000) + 2000;

    user.koin = (user.koin || 0) + moneyGain;
    const levelResult = await addExpWithLevelCheck(sock, m, db, user, expGain);

    db.save();

    let txt = `🗡️ *PETUALANGAN BERHASIL!!* 🗡️\n\n`;
    txt += `📍 Lokasi: *${location}*\n\n`;
    txt += `Wah hebat kak! Kamu berhasil ngalahin monster penjaga dan nemuin peti harta karun!\n`;
    txt += `💰 Koin: *+Rp ${moneyGain.toLocaleString("id-ID")}*\n`;
    txt += `📈 EXP: *+${expGain.toLocaleString("id-ID")}*\n\n`;
    txt += `Kembali dengan selamat! Lanjut petualang lagi nanti ya kak! 🚀✨`;

    await m.reply(txt);
  } else {
    const healthLoss = Math.floor(Math.random() * 30) + 10;
    user.rpg.health = Math.max(0, user.rpg.health - healthLoss);

    let msg = `☠️ *DISERGAP MONSTER!!* ☠️\n\n`;
    msg += `📍 Lokasi: *${location}*\n\n`;
    msg += `Aduh kak! Langkah kamu ketahuan, sekelompok monster nyerang bertubi-tubi!\n`;
    msg += `❤️ HP Berkurang: *-${healthLoss} HP* (Sisa: ${user.rpg.health})\n\n`;

    if (user.rpg.health <= 0) {
      user.rpg.health = 0;
      user.exp = Math.floor((user.exp || 0) / 2);
      msg += `💀 *KAMU MATI!*\nYaampun kak... Kamu tewas di tempat. EXP kamu kena penalti 50% nih. 💔🥀`;
    } else {
      msg += `Untung kamu masih sempet kabur kak! Mending istirahat dulu buat ngeheal ya! 🏃💨`;
    }

    db.save();
    await m.reply(msg);
  }
}

export { pluginConfig as config, handler };
