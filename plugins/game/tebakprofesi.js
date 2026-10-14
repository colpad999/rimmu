//

import { games } from '../../src/lib/yalena-games.js'

games.register('tebakprofesi', {
    emoji: '👨‍💼',
    title: 'TEBAK PROFESI',
    description: 'Tebak nama profesi'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebakprofesi')
export { pluginConfig as config, handler, answerHandler }
