//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


import fs from 'fs'
import path from 'path'

const handler = async (m, { text }) => {
  if (!text) throw 'Masukin keyword\nContoh: .grepplugin conn.'

  const dir = './plugins'
  let results = []

  function scan(folder) {
    let files = fs.readdirSync(folder)
    for (let file of files) {
      let full = path.join(folder, file)
      let stat = fs.statSync(full)

      if (stat.isDirectory()) {
        scan(full)
      } else if (file.endsWith('.js')) {
        let data = fs.readFileSync(full, 'utf-8')
        let lines = data.split('\n')

        lines.forEach((line, i) => {
          if (line.includes(text)) {
            results.push(`${full} (baris ${i + 1})`)
          }
        })
      }
    }
  }

  scan(dir)

  if (!results.length) {
    return m.reply(`Tidak ditemukan keyword: ${text}`)
  }

  let res = `📦 Hasil grep plugin\nKeyword: ${text}\n\n`
  res += results.map((v, i) => `${i + 1}. ${v}`).join('\n')

  m.reply(res)
}

handler.help = ['grepplugin <keyword>']
handler.tags = ['tools']
handler.command = /^grepplugin$/i
handler.owner = true
handler.limit = false

export default handler
