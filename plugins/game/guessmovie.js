//

import { games } from '../../src/lib/yalena-games.js'

games.register('tebakfilm', {
    emoji: '🎬',
    title: 'TEBAK FILM',
    description: 'Tebak judul film'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebakfilm', { name: 'guessmovie' })
export { pluginConfig as config, handler, answerHandler }
