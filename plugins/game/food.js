//

import { games } from '../../src/lib/yalena-games.js'

games.register('tebakmakanan', {
    emoji: '🍲',
    title: 'TEBAK MAKANAN',
    description: 'Tebak nama makanan',
    hasImage: true
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebakmakanan', { name: 'food' })
export { pluginConfig as config, handler, answerHandler }
