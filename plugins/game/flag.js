//

import { games } from '../../src/lib/yalena-games.js'

games.register('tebakbendera', {
    emoji: '🏳️',
    title: 'TEBAK BENDERA',
    description: 'Tebak negara dari bendera',
    dataFile: 'tebakbendera2.json',
    answerField: 'name',
    hasImage: true
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebakbendera', { name: 'flag' })
export { pluginConfig as config, handler, answerHandler }
