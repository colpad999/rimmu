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
const pluginConfig = {
  name: "hadiah",
  category: "rpg",
  description: "Beri hadiah ke pasangan untuk meningkatkan love",
  usage: ".gift <item> <jumlah>",
  example: ".gift diamond 1",
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 30,
  energi: 0,
  isEnabled: true,
};

async function handler(m, { sock }) {
  const db = getDatabase();
  const user = db.getUser(m.sender);

  if (!user.rpg) user.rpg = {};

  if (!user.rpg.spouse) {
    return m.reply(`❌ *ʙᴇʟᴜᴍ ᴍᴇɴɪᴋᴀʜ*\n\n` + `> Kamu belum menikah!\n` + `> Nikah dulu dengan \`.marry @user\``);
  }

  const args = m.args || [];
  const itemKey = args[0]?.toLowerCase();
  const amount = parseInt(args[1]) || 1;

  if (!itemKey) {
    return m.reply(
      `🎁 *ɢɪꜰᴛ*\n\n` +
        `*📋 *ᴜsᴀɢᴇ:*
\n` +
        `> > Pilih item untuk diberikan\n` +
        `> > \`.gift diamond 1\`\n` +
        ``,
    );
  }

  user.inventory = user.inventory || {};

  if ((user.inventory[itemKey] || 0) < amount) {
    return m.reply(`❌ *ɪᴛᴇᴍ ᴛɪᴅᴀᴋ ᴄᴜᴋᴜᴘ*\n\n` + `> Item *${itemKey}* kamu: ${user.inventory[itemKey] || 0}\n` + `> Butuh: ${amount}`);
  }

  const spouseJid = user.rpg.spouse;
  const partner = db.getUser(spouseJid);

  if (!partner) {
    return m.reply(`❌ *ᴘᴀsᴀɴɢᴀɴ ɴᴏᴛ ꜰᴏᴜɴᴅ*\n\n> Pasangan tidak ditemukan di database!`);
  }

  partner.inventory = partner.inventory || {};

  user.inventory[itemKey] -= amount;
  partner.inventory[itemKey] = (partner.inventory[itemKey] || 0) + amount;

  user.rpg.love = (user.rpg.love || 0) + amount * 10;
  if (partner.rpg) partner.rpg.love = (partner.rpg.love || 0) + amount * 10;

  db.save();

  let txt = `🎁 *ɢɪꜰᴛ sᴜᴋsᴇs*\n\n`;
  txt += `> 💝 Kamu memberikan ${amount}x ${itemKey}\n`;
  txt += `> 👤 Untuk: @${spouseJid.split("@")[0]}\n`;
  txt += `> 💕 Love: +${amount * 10}\n\n`;
  txt += `> _So sweet! 💖_`;

  await m.reply(txt, { mentions: [spouseJid] });
}

export { pluginConfig as config, handler };
