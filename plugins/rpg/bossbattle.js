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


let { MessageType } = (await import('@itsliaaa/baileys')).default

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const pluginConfig = {
  name: "bossbattle",
  category: "rpg",
  description: "Imported from Rimuru MD V4.6",
  usage: "",
  example: "",
  isOwner: false,
  isPremium: false,
  isGroup: true,
  isPrivate: false,
  cooldown: 3,
  energi: 1,
  isEnabled: true,
};

async function handler(m, { sock }) {
    const conn = sock;
  try {
    global.db.data.monsters = global.db.data.monsters || ['Wither', 'Ender Dragon', 'Warden', 'Giant']

    let user = global.db.data.users[m.sender]
    if (!user) user = global.db.data.users[m.sender] = {}

    user.health = user.health || 100
    user.maxHealth = user.maxHealth || 100
    user.exp = user.exp || 0
    user.money = user.money || 0

    if (user.health <= 0) {
      return conn.reply(m.chat, '😓 Kamu tidak punya nyawa, gunakan *.heal* dulu!', m)
    }

    const boss = pickRandom(global.db.data.monsters)
    let bossHealth = 150
    let bossAttack = 20
    let round = 1
    let message = `👹 *Boss Battle: ${boss}*\n❤️ Kamu: ${user.health}/${user.maxHealth}\n❤️ ${boss}: ${bossHealth}\n\n`

    while (user.health > 0 && bossHealth > 0 && round <= 15) {
      let userAttack = Math.floor(Math.random() * 30) + 10
      bossHealth -= userAttack

      let damageToUser = bossAttack
      user.health -= damageToUser

      message += `🌀 *Ronde ${round}*\n⚔️ Seranganmu: ${userAttack}\n🔥 Serangan Boss: ${damageToUser}\n❤️ Kamu: ${Math.max(user.health, 0)}\n❤️ Boss: ${Math.max(bossHealth, 0)}\n\n`

      if (bossHealth <= 0) {
        let exp = Math.floor(Math.random() * 200) + 100
        let money = Math.floor(Math.random() * 100) + 50
        user.exp += exp
        user.money += money

        message += `🎉 *Kemenangan!*\n🌟 +${exp} Exp\n💰 +${money} Money\n`
        break
      }

      if (user.health <= 0) {
        message += `😵 Kamu kalah! Gunakan *.heal* untuk nyembuhin diri.`
        break
      }

      round++
    }

    conn.reply(m.chat, message, m)
  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❌ Error terjadi saat boss battle.', m)
  }
}

export { pluginConfig as config, handler };
