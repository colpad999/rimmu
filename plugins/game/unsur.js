//

import { games } from '../../src/lib/rimuru-games.js'

games.register('tebakkimia', {
    emoji: '🧪',
    title: 'TEBAK KIMIA',
    description: 'Tebak unsur kimia',
    questionField: 'unsur',
    answerField: 'lambang'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebakkimia', { name: 'unsur' })
export { pluginConfig as config, handler, answerHandler }
