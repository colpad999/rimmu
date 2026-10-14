//

import { games } from '../../src/lib/rimuru-games.js'

games.register('tebakgambar', {
    emoji: '🖼️',
    title: 'TEBAK GAMBAR',
    description: 'Tebak kata dari gambar',
    timeout: 90000,
    hasImage: true,
    questionField: null,
    hintCount: 3
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebakgambar', { name: 'tg' })
export { pluginConfig as config, handler, answerHandler }
