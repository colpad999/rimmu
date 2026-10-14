//

import { games } from '../../src/lib/yalena-games.js'

games.register('tebakjkt48', {
    emoji: '🎀',
    title: 'TEBAK JKT48',
    description: 'Tebak member JKT48',
    hasImage: true
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebakjkt48', { name: 'jkt' })
export { pluginConfig as config, handler, answerHandler }
