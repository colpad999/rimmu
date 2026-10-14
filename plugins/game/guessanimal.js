//

import { games } from '../../src/lib/rimuru-games.js'

games.register('tebakhewan', {
    emoji: '🐾',
    title: 'TEBAK HEWAN',
    description: 'Tebak nama hewan',
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebakhewan', { name: 'guessanimal' })
export { pluginConfig as config, handler, answerHandler }