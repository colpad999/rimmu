//

import { games } from '../../src/lib/rimuru-games.js'

games.register('siapakahaku', {
    emoji: '🎭',
    title: 'SIAPAKAH AKU',
    description: 'Tebak dari deskripsi'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('siapakahaku')
export { pluginConfig as config, handler, answerHandler }
