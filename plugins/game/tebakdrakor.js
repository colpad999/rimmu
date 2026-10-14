//

import { games } from '../../src/lib/yalena-games.js'

games.register('tebakdrakor', {
    emoji: '🇰🇷',
    title: 'TEBAK DRAKOR',
    description: 'Tebak judul drama Korea',
    hasImage: true
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebakdrakor')
export { pluginConfig as config, handler, answerHandler }
