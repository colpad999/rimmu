//

import { games } from '../../src/lib/rimuru-games.js'

games.register('tebakepep', {
    emoji: '🔫',
    title: 'TEBAK EPEP',
    description: 'Tebak karakter Free Fire',
    hasImage: true
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebakepep', { name: 'tebakfreefire' })
export { pluginConfig as config, handler, answerHandler }