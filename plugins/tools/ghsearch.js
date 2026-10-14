//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


/**
 * Fitur    : GitHub Tools
 * Type     : Plugins ESM
 * Creator  : Hilman
 * Channel  : https://whatsapp.com/channel/0029VbAYjQgKrWQulDTYcg2K
 */

const pluginConfig = {
  name: "ghsearch",
  category: "tools",
  description: "Imported from Yalena MD V4.6",
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

async function handler(m, { text, prefix, command }) {
    const usedPrefix = prefix || m.prefix || ".";
  if (!text) throw `${usedPrefix}${command} query`

  try {

    if (command === 'ghuser') {
      let res = await fetch(`https://api.github.com/users/${text}`)
      let json = await res.json()

      return m.reply(`👤 ${json.login}
📦 Repo: ${json.public_repos}
👥 Followers: ${json.followers}
🔗 ${json.html_url}`)
    }

    if (command === 'ghsearch') {
      let res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(text)}`)
      let json = await res.json()

      let hasil = json.items.slice(0, 5).map(v => `
${v.full_name}
⭐ ${v.stargazers_count}
🔗 ${v.html_url}`).join('\n')

      return m.reply(hasil)
    }

    if (command === 'ghgist') {
      let url = text.trim()

      if (url.includes('gist.github.com')) {
        let id = url.split('/').pop()
        let res = await fetch(`https://api.github.com/gists/${id}`)
        let json = await res.json()

        for (let x in json.files) {
          let f = json.files[x]
          await m.reply('```' + f.content + '```')
        }

        return
      }

      if (url.includes('github.com')) {
        url = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/')
      }

      let res = await fetch(url)
      let textFile = await res.text()

      return m.reply('```' + textFile + '```')
    }

  } catch {
    throw 'Error'
  }
}

export { pluginConfig as config, handler };
