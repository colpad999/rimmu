//

import { games } from '../../src/lib/yalena-games.js'

games.register('asahotak', {
    emoji: '🧠',
    title: 'ASAH OTAK',
    description: 'Game asah otak - tebak jawaban'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('asahotak', { name: 'asah' })
export { pluginConfig as config, handler, answerHandler }
