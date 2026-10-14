//

import { games } from '../../src/lib/rimuru-games.js'

games.register('tebakfilm', {
    emoji: '🎬',
    title: 'TEBAK FILM',
    description: 'Tebak judul film'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebakfilm')
export { pluginConfig as config, handler, answerHandler }
