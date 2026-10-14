//

import { games } from '../../src/lib/yalena-games.js'

games.register('siapakahaku', {
    emoji: '🎭',
    title: 'SIAPAKAH AKU',
    description: 'Tebak dari deskripsi'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('siapakahaku', { name: 'whoami' })
export { pluginConfig as config, handler, answerHandler }
