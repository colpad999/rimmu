//

import { games } from '../../src/lib/rimuru-games.js'

games.register('tebakkata', {
    emoji: '📝',
    title: 'TEBAK KATA',
    description: 'Tebak kata dari petunjuk'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebakkata', { name: 'tk' })
export { pluginConfig as config, handler, answerHandler }
