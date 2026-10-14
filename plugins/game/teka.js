//

import { games } from '../../src/lib/rimuru-games.js'

games.register('tekateki', {
    emoji: '🧩',
    title: 'TEKA-TEKI',
    description: 'Game teka-teki tradisional'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tekateki', { name: 'teka' })
export { pluginConfig as config, handler, answerHandler }
