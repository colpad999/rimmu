//

import { games } from '../../src/lib/rimuru-games.js'

games.register('susunkata', {
    emoji: '🔠',
    title: 'SUSUN KATA',
    description: 'Susun kata dari huruf'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('susunkata', { name: 'scramble' })
export { pluginConfig as config, handler, answerHandler }
