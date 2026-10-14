//

import { resetSider } from '../../src/lib/listsider.js';
const pluginConfig = {
name: 'risetsider',
category: 'group',
isGroup: true,
isAdmin: true,
cooldown: 10,
isEnabled: true
}

async function handler(m){

resetSider(m.chat)

m.reply(`✅ List sider di group ini sudah di riset.`)

}

export { pluginConfig as config, handler };
