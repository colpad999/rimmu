//

import { games } from '../../src/lib/rimuru-games.js'

games.register('tebaklirik', {
    emoji: '🎤',
    title: 'TEBAK LIRIK',
    description: 'Tebak lirik lagu'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebaklirik')
export { pluginConfig as config, handler, answerHandler }
