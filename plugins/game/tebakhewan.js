//

import { games } from '../../src/lib/yalena-games.js'

games.register('tebakhewan', {
    emoji: '🐾',
    title: 'TEBAK HEWAN',
    description: 'Tebak nama hewan',
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebakhewan')
export { pluginConfig as config, handler, answerHandler }