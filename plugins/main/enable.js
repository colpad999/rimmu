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

import config from '../../config.js'
import { getDatabase } from '../../src/lib/rimuru-database.js'

export const FEATURE_CREDIT = "Fitur By: Anita Putri Azzahra\nFitur SC Bot Rimuru MD 👑\nTiktok: https://tiktok.com/@anita.putri.azzah1\nSaluran Resmi: https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P";


const pluginConfig = {
  name: "enable",
  category: "main",
  description: "Imported from Rimuru MD V4.6",
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

async function handler(m, { sock, prefix, command, args, isOwner, isAdmin, isROwner }) {
    const conn = sock;
    const usedPrefix = prefix || m.prefix || ".";
  let isEnable = /^(enable|on)$/i.test(command)

  global.db.data.chats = global.db.data.chats || {}

  let chat = global.db.data.chats[m.chat]
  if (!chat) chat = global.db.data.chats[m.chat] = {}

  if (!('welcome' in chat)) chat.welcome = true
  if (!('delete' in chat)) chat.delete = true
  if (!('antiDelete' in chat)) chat.antiDelete = false
  if (!('antiLink' in chat)) chat.antiLink = false
  if (!('antiMedia' in chat)) chat.antiMedia = false
  if (!('antiBadword' in chat)) chat.antiBadword = false
  if (!('autogpt' in chat)) chat.autogpt = false
  if (!('autosimi' in chat)) chat.autosimi = false
  if (!('autodl' in chat)) chat.autodl = false
  if (!('antiPromosi' in chat)) chat.antiPromosi = false
  if (!('detect' in chat)) chat.detect = true
  if (!('rpgs' in chat)) chat.rpgs = true
  if (!('autolevelup' in chat)) chat.autolevelup = false
  if (global.autocorrect === undefined)
  global.autocorrect = true

  let type = (args[0] || '').toLowerCase()
  let isAll = false

  switch (type) {
    case 'welcome':
      if (m.isGroup && !isAdmin) return global.dfail('admin', m, conn)
      chat.welcome = isEnable
      break

    case 'delete':
      if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
      chat.delete = isEnable
      break

    case 'antidelete':
      if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
      chat.antiDelete = isEnable
      break

    case 'antilink':
      if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
      chat.antiLink = isEnable
      break

    case 'antibadword':
      if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
      chat.antiBadword = isEnable
      break
   case 'antipromosi':
  if (m.isGroup && !(isAdmin || isOwner))
    return global.dfail('admin', m, conn)
  chat.antiPromosi = isEnable
  break
  case 'antimedia':
  if (m.isGroup && !(isAdmin || isOwner))
    return global.dfail('admin', m, conn)
  chat.antiMedia = isEnable
  break
    case 'autogpt':
      if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
      chat.autogpt = isEnable
      break
   case 'autosimi':
  if (m.isGroup && !(isAdmin || isOwner))
    return global.dfail('admin', m, conn)
  chat.autosimi = isEnable
  break   
  case 'autodl':
  if (m.isGroup && !(isAdmin || isOwner))
    return global.dfail('admin', m, conn)
  chat.autodl = isEnable
  break
    case 'detect':
      if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
      chat.detect = isEnable
      break

    case 'rpg':
      if (m.isGroup && !(isAdmin || isOwner)) return global.dfail('admin', m, conn)
      chat.rpgs = isEnable
      break

    case 'autolevelup':
      isAll = true
      if (!isROwner) return global.dfail('rowner', m, conn)
      chat.autolevelup = isEnable
      break
    case 'autocorrect':
  isAll = true
  if (!isROwner) return global.dfail('rowner', m, conn)
  global.autocorrect = isEnable
  break

    case 'public':
      isAll = true
      if (!isROwner) return global.dfail('rowner', m, conn)
      global.opts.self = !isEnable
      config.mode = 'public'
      getDatabase().setting('botMode', 'public')
      break

    case 'autoread':
      isAll = true
      if (!isROwner) return global.dfail('rowner', m, conn)
      global.opts.autoread = isEnable
      break

    case 'pconly':
      isAll = true
      if (!isROwner) return global.dfail('rowner', m, conn)
      global.opts.pconly = isEnable
      break

    case 'gconly':
      isAll = true
      if (!isROwner) return global.dfail('rowner', m, conn)
      global.opts.gconly = isEnable
      break

    case 'self':
      isAll = true
      if (!isROwner) return global.dfail('rowner', m, conn)
      global.opts.self = isEnable
      config.mode = isEnable ? 'self' : 'public'
      getDatabase().setting('botMode', isEnable ? 'self' : 'public')
      break

    default: {
      let totalOn = [
        chat.welcome,
        chat.delete,
        chat.antiDelete,
        chat.antiLink,
        chat.antiBadword,
        chat.antiPromosi,
        chat.antiMedia,
        chat.detect,
        chat.autogpt,
        chat.autosimi,
        chat.autodl,
        chat.rpgs,
        !global.opts.self,
        global.opts.self,
        global.opts.autoread,
        global.opts.pconly,
        global.opts.gconly,
        chat.autolevelup,
        global.autocorrect
      ].filter(Boolean).length

      return m.reply(`
Settings Bot

[  GROUP  ]

❏ Welcome      : ${chat.welcome ? '✅' : '❌'}
❏ Delete       : ${chat.delete ? '✅' : '❌'}
❏ AntiDelete   : ${chat.antiDelete ? '✅' : '❌'}
❏ AntiLink     : ${chat.antiLink ? '✅' : '❌'}
❏ AntiBadword  : ${chat.antiBadword ? '✅' : '❌'}
❏ AntiPromosi  : ${chat.antiPromosi ? '✅' : '❌'}
❏ AntiMedia    : ${chat.antiMedia ? '✅' : '❌'}
❏ Detect       : ${chat.detect ? '✅' : '❌'}
❏ AutoGPT      : ${chat.autogpt ? '✅' : '❌'}
❏ AutoSimi     : ${chat.autosimi ? '✅' : '❌'}
❏ AutoDL       : ${chat.autodl ? '✅' : '❌'}
❏ RPG          : ${chat.rpgs ? '✅' : '❌'}

[  OWNER  ]

❏ Public       : ${!global.opts.self ? '✅' : '❌'}
❏ Self         : ${global.opts.self ? '✅' : '❌'}
❏ AutoRead     : ${global.opts.autoread ? '✅' : '❌'}
❏ PC Only      : ${global.opts.pconly ? '✅' : '❌'}
❏ GC Only      : ${global.opts.gconly ? '✅' : '❌'}
❏ AutoLevelUp  : ${chat.autolevelup ? '✅' : '❌'}
❏ AutoCorrect  : ${global.autocorrect ? '✅' : '❌'}

Status : ${totalOn} fitur aktif

Example:
${usedPrefix}enable antilink 
${usedPrefix}disable antilink 
`.trim())
    }
  }

  let target = isAll
    ? 'untuk bot ini'
    : m.isGroup
      ? 'untuk grup ini'
      : 'untuk chat ini'

  await global.db.write?.().catch(() => null)

  m.reply(`✅ Berhasil ${isEnable ? 'mengaktifkan' : 'menonaktifkan'} *${type}* ${target}`)
}

export { pluginConfig as config, handler };
