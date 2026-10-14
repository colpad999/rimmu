//

import { games } from '../../src/lib/rimuru-games.js'

games.register('tebakkalimat', {
    emoji: '📖',
    title: 'TEBAK KALIMAT',
    description: 'Tebak kalimat atau peribahasa'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebakkalimat', { name: 'tkl' })
export { pluginConfig as config, handler, answerHandler }
