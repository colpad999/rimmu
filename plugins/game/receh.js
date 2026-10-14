//

import { games } from '../../src/lib/rimuru-games.js'

games.register('tebaktebakan', {
    emoji: '😄',
    title: 'TEBAK-TEBAKAN',
    description: 'Tebak-tebakan receh'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebaktebakan', { name: 'receh' })
export { pluginConfig as config, handler, answerHandler }
