//

import { games } from '../../src/lib/yalena-games.js'

games.register('tebaktebakan', {
    emoji: '😄',
    title: 'TEBAK-TEBAKAN',
    description: 'Tebak-tebakan receh'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebaktebakan', { name: 'tebak2an' })
export { pluginConfig as config, handler, answerHandler }
