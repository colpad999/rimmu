//

import { games } from '../../src/lib/rimuru-games.js'

games.register('caklontong', {
    emoji: '🤔',
    title: 'CAK LONTONG',
    description: 'Game cak lontong - jawaban receh'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('caklontong', { name: 'cak' })
export { pluginConfig as config, handler, answerHandler }
