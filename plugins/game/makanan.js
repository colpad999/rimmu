//

import { games } from '../../src/lib/rimuru-games.js'

games.register('tebakmakanan', {
    emoji: '🍲',
    title: 'TEBAK MAKANAN',
    description: 'Tebak nama makanan',
    hasImage: true
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebakmakanan', { name: 'makanan' })
export { pluginConfig as config, handler, answerHandler }
