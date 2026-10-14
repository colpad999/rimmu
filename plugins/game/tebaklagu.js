//

import { games } from '../../src/lib/yalena-games.js'

games.register('tebaklagu', {
    emoji: '🎵',
    title: 'TEBAK LAGU',
    description: 'Tebak judul lagu'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebaklagu')
export { pluginConfig as config, handler, answerHandler }
