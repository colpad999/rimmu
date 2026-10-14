//

import { games } from '../../src/lib/rimuru-games.js'

games.register('tebakprofesi', {
    emoji: '👨‍💼',
    title: 'TEBAK PROFESI',
    description: 'Tebak nama profesi'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('tebakprofesi', { name: 'tp' })
export { pluginConfig as config, handler, answerHandler }
