//

import { games } from '../../src/lib/yalena-games.js'

games.register('riddle', {
    emoji: '❓',
    title: 'RIDDLE',
    description: 'Riddle/tebak-tebakan'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('riddle')
export { pluginConfig as config, handler, answerHandler }
