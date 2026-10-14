//

import { games } from '../../src/lib/yalena-games.js'

games.register('tebakkata', {
    emoji: '📝',
    title: 'TEBAK KATA',
    description: 'Tebak kata dari petunjuk'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebakkata', { name: 'guessword' })
export { pluginConfig as config, handler, answerHandler }
