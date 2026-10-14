//

import { games } from '../../src/lib/yalena-games.js'

games.register('kataacak', {
    emoji: '🔤',
    title: 'KATA ACAK',
    description: 'Susun huruf acak'
})

const { config: pluginConfig, handler, answerHandler } = games.createPlugin('kataacak', { name: 'ka' })
export { pluginConfig as config, handler, answerHandler }
