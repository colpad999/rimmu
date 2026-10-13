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
  name: "latihan",
  category: "rpg",
  description: "Latihan untuk meningkatkan stats",
  usage: ".training <attack/defense/health>",
  example: ".training attack",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 180,
  energi: 1,
  isEnabled: true,
};

const TRAINING_TYPES = {
  attack: { name: "⚔️ Attack Training", stat: "attack", bonus: [1, 3], exp: 80, staminaCost: 20 },
  defense: { name: "🛡️ Defense Training", stat: "defense", bonus: [1, 2], exp: 70, staminaCost: 15 },
  health: { name: "❤️ Health Training", stat: "health", bonus: [5, 15], exp: 90, staminaCost: 25 },
  speed: { name: "💨 Speed Training", stat: "speed", bonus: [1, 2], exp: 75, staminaCost: 18 },
  luck: { name: "🍀 Luck Training", stat: "luck", bonus: [1, 2], exp: 85, staminaCost: 22 },
};

async function handler(m, { sock }) {
  const db = getDatabase();
  const user = db.getUser(m.sender);

  if (!user.rpg) user.rpg = {};

  const args = m.args || [];
  const trainType = args[0]?.toLowerCase();

  if (!trainType) {
    let txt = `🏋️ *ᴛʀᴀɪɴɪɴɢ sʏsᴛᴇᴍ*\n\n`;
    txt += `> Latihan untuk meningkatkan stats!\n\n`;
    txt += `*📊 *sᴛᴀᴛs ᴋᴀᴍᴜ:*
\n`;
    txt += `> ⚔️ Attack: *${user.rpg.attack || 10}*\n`;
    txt += `> 🛡️ Defense: *${user.rpg.defense || 5}*\n`;
    txt += `> ❤️ Health: *${user.rpg.health || 100}*\n`;
    txt += `> 💨 Speed: *${user.rpg.speed || 10}*\n`;
    txt += `> 🍀 Luck: *${user.rpg.luck || 5}*\n`;
    txt += `> ⚡ Stamina: *${user.rpg.stamina ?? 100}*\n`;
    txt += `\n\n`;
    txt += `*🏋️ *ᴛʀᴀɪɴɪɴɢ:*
\n`;
    for (const [key, train] of Object.entries(TRAINING_TYPES)) {
      txt += `> ${train.name}\n`;
      txt += `> ⚡ Stamina: ${train.staminaCost}\n`;
      txt += `> → \`${m.prefix}training ${key}\`\n> \n`;
    }
    txt += ``;
    return m.reply(txt);
  }

  const training = TRAINING_TYPES[trainType];
  if (!training) {
    return m.reply(`❌ Training tidak ditemukan!\n\n> Ketik \`${m.prefix}training\` untuk melihat daftar.`);
  }

  user.rpg.stamina = user.rpg.stamina ?? 100;

  if (user.rpg.stamina < training.staminaCost) {
    return m.reply(`⚡ *sᴛᴀᴍɪɴᴀ ᴋᴜʀᴀɴɢ*\n\n` + `> Butuh: ${training.staminaCost}\n` + `> Punya: ${user.rpg.stamina}\n\n` + `💡 Gunakan \`${m.prefix}rest\` atau makan makanan`);
  }

  user.rpg.stamina -= training.staminaCost;

  await m.react("🏋️");
  await m.reply(`🏋️ *ʟᴀᴛɪʜᴀɴ ${training.name.toUpperCase()}...*`);
  await new Promise((r) => setTimeout(r, 2500));

  const statBonus = Math.floor(Math.random() * (training.bonus[1] - training.bonus[0] + 1)) + training.bonus[0];
  const currentStat = user.rpg[training.stat] || (training.stat === "health" ? 100 : training.stat === "attack" ? 10 : 5);
  user.rpg[training.stat] = currentStat + statBonus;

  await addExpWithLevelCheck(sock, m, db, user, training.exp);
  db.save();

  await m.react("💪");
  return m.reply(
    `💪 *ᴛʀᴀɪɴɪɴɢ sᴇʟᴇsᴀɪ!*\n\n` +
      `*📊 *ʀᴇsᴜʟᴛ:*
\n` +
      `> 🏋️ Training: *${training.name}*\n` +
      `> 📈 ${training.stat}: *${currentStat} → ${currentStat + statBonus}* (+${statBonus})\n` +
      `> ⚡ Stamina: *-${training.staminaCost}*\n` +
      `> ✨ EXP: *+${training.exp}*\n` +
      ``,
  );
}

export { pluginConfig as config, handler };
