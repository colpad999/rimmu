//

import { games } from '../../src/lib/rimuru-games.js'

games.register('riddle', {
    emoji: '❓',
    title: 'RIDDLE',
    description: 'Riddle/tebak-tebakan'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('riddle', { name: 'tebaktebak' })
export { pluginConfig as config, handler, answerHandler }
