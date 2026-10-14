//

export const FEATURE_CREDIT = "Fitur By: Colpad\nFitur SC Bot Yalena MD 👑\nTiktok: https://tiktok.com/@sibrosup\nSaluran Resmi: https://www.whatsapp.com/channel/0029VazvN8I9xVJgSsIBv02Y";


import { generateWAMessageFromContent } from '@itsliaaa/baileys'

let handler = async (m, { sock }) => {
  const msg = generateWAMessageFromContent(
    m.chat,
    {
      interactiveMessage: {
        header: {
          title: 'Owner Bot',
          subtitle: 'Informasi & Kontak'
        },
        body: {
          text: `Hai, jika ada pertanyaan, laporan bug, atau keperluan lainnya silakan hubungi owner melalui tombol di bawah ini.`
        },
        footer: {
          text: global.wm
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: 'cta_call',
              buttonParamsJson: JSON.stringify({
                display_text: 'Hubungi Owner',
                phone_number: global.nomorown
              })
            },
            {
              name: 'cta_url',
              buttonParamsJson: JSON.stringify({
                display_text: 'Chat WhatsApp',
                url: `https://wa.me/${global.nomorown}`
              })
            },
            {
              name: 'cta_url',
              buttonParamsJson: JSON.stringify({
                display_text: 'Saluran WhatsApp',
                url: global.linkch
              })
            },
            {
              name: 'cta_copy',
              buttonParamsJson: JSON.stringify({
                display_text: 'Salin Nomor Owner',
                copy_code: global.nomorown
              })
            },
            {
              name: 'single_select',
              buttonParamsJson: JSON.stringify({
                title: 'Navigasi Cepat',
                sections: [
                  {
                    title: 'Menu Bot',
                    rows: [
                      {
                        title: 'Menu Utama',
                        description: 'Buka menu bot',
                        id: '.menu'
                      },
                      {
                        title: 'Cek Status Bot',
                        description: 'Lihat kecepatan respon bot',
                        id: '.ping'
                      }
                    ]
                  }
                ]
              })
            }
          ]
        }
      }
    },
    {
      quoted: m
    }
  )

  await sock.relayMessage(
    m.chat,
    msg.message,
    { messageId: msg.key.id }
  )
}
const pluginConfig = {
  name: 'creator2',
  category: 'main',
  description: 'Varian kontak owner dari Tensura.',
  usage: '.creator2',
  example: '.creator2',
  isOwner: false,
  isPremium: false,
  isGroup: false,
  isPrivate: false,
  cooldown: 5,
  energi: 1,
  isEnabled: true,
};

export { pluginConfig as config, handler };
