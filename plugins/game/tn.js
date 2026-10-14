//

import { games } from '../../src/lib/rimuru-games.js'

games.register('tebaknegara', {
    emoji: '🌍',
    title: 'TEBAK NEGARA',
    description: 'Tebak nama negara'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebaknegara', { name: 'tn' })
export { pluginConfig as config, handler, answerHandler }
