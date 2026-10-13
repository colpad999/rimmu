/*
╔══════════════════════════════════════════════╗
║       👑  𝑹𝑰𝑴𝑼𝑹𝑼 𝑴𝑫 〽️                        ║
╚══════════════════════════════════════════════╝

🪽 𝑵𝒐𝒕𝒆 :
Rimuru MD adalah SC hasil rename dari SC Ourin MD.

╭─────────────「 🜲 𝑰𝑵𝑭𝑶 𝑶𝑼𝑹𝑰𝑵 」─────────────╮
│ 👤 Developer : 𝑯𝒚𝒖𝒖 / 𝒁𝒂𝒏𝒏
│ 🎵 TikTok    : https://tiktok.com/@ourinmd
│ 📢 WhatsApp  : https://whatsapp.com/channel/0029VbB37bgBfxoAmAlsgE0t
╰─────────────────────────────────────────────╯

╭────────────「 ✦ 𝑰𝑵𝑭𝑶 𝑹𝑰𝑴𝑼𝑹𝑼 ✦ 」────────────╮
│ 👤 Developer Pihak Ketiga : 𝑨𝒏𝒊𝒕𝒂 𝑷𝒖𝒕𝒓𝒊 𝑨𝒛𝒛𝒂𝒉𝒓𝒂
│ 🎵 TikTok                 : https://tiktok.com/@anita.putri.azzah1
│ 📸 Instagram              : anit_aputriazzahrah
│ 📢 Saluran                : https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P
│ ▶️ YouTube                : https://youtube.com/@rimurumd
╰─────────────────────────────────────────────╯

        ⚠️ 𝑫𝑶 𝑵𝑶𝑻 𝑹𝑬𝑴𝑶𝑽𝑬 𝑪𝑹𝑬𝑫𝑰𝑻 ⚠️
              ❖ 𝐉𝐚𝐧𝐠𝐚𝐧 𝐡𝐚𝐩𝐮𝐬 𝐜𝐫𝐞𝐝𝐢𝐭 ❖

                 「 👑 𝑹𝑰𝑴𝑼𝑹𝑼 𝑴𝑫 👑 」
*/

/**
 * Credits & Thanks to
 * Developer = Lucky Archz ( Zann )
 * Lead owner = HyuuSATAN
 * Owner = Keisya
 * Designer = Danzzz
 * Wileys = Penyedia baileys
 * Penyedia API
 * Penyedia Scraper
 * 
 * JANGAN HAPUS/GANTI CREDITS & THANKS TO
 * JANGAN DIJUAL YA MEK
 * 
 * Saluran Resmi Rimuru:
 * https://whatsapp.com/channel/0029Vb8dmsUElagkVPIw9X2P 
 */

import fs from 'fs'
import path from 'path'
import { logger } from './rimuru-logger.js'
const RECONNECT_CONFIG = {
    maxAttempts: 10,
    initialDelay: 3000,
    maxDelay: 60000,
    backoffMultiplier: 1.5
}

let reconnectState = {
    attempts: 0,
    isReconnecting: false,
    lastAttempt: null,
    nextDelay: RECONNECT_CONFIG.initialDelay
}

function calculateNextDelay() {
    const delay = Math.min(
        reconnectState.nextDelay * RECONNECT_CONFIG.backoffMultiplier,
        RECONNECT_CONFIG.maxDelay
    )
    reconnectState.nextDelay = delay
    return delay
}

function resetReconnectState() {
    reconnectState = {
        attempts: 0,
        isReconnecting: false,
        lastAttempt: null,
        nextDelay: RECONNECT_CONFIG.initialDelay
    }
}

function shouldReconnect() {
    return reconnectState.attempts < RECONNECT_CONFIG.maxAttempts
}

function incrementAttempt() {
    reconnectState.attempts++
    reconnectState.lastAttempt = new Date()
    reconnectState.isReconnecting = true
}

function getReconnectInfo() {
    return {
        attempts: reconnectState.attempts,
        maxAttempts: RECONNECT_CONFIG.maxAttempts,
        nextDelay: reconnectState.nextDelay,
        isReconnecting: reconnectState.isReconnecting,
        lastAttempt: reconnectState.lastAttempt
    }
}

function formatDelay(ms) {
    if (ms < 1000) return `${ms}ms`
    return `${Math.round(ms / 1000)}s`
}

async function handleReconnect(startConnectionFn, options = {}) {
    if (!shouldReconnect()) {
        logger.error('Reconnect', `Max attempts reached (${RECONNECT_CONFIG.maxAttempts})`)
        return false
    }
    
    incrementAttempt()
    const delay = calculateNextDelay()
    
    logger.warn('Reconnect', `Attempt ${reconnectState.attempts}/${RECONNECT_CONFIG.maxAttempts} in ${formatDelay(delay)}`)
    
    return new Promise((resolve) => {
        setTimeout(async () => {
            try {
                await startConnectionFn(options)
                resetReconnectState()
                logger.success('Reconnect', 'Connection restored!')
                resolve(true)
            } catch (error) {
                logger.error('Reconnect', `Failed: ${error.message}`)
                resolve(await handleReconnect(startConnectionFn, options))
            }
        }, delay)
    })
}

function onConnectionSuccess() {
    if (reconnectState.isReconnecting) {
        logger.success('Reconnect', `Restored after ${reconnectState.attempts} attempts`)
    }
    resetReconnectState()
}

function onConnectionClose(reason) {
    reconnectState.isReconnecting = true
    logger.warn('Connection', `Closed: ${reason}`)
}

export { handleReconnect, shouldReconnect, resetReconnectState, getReconnectInfo, onConnectionSuccess, onConnectionClose, RECONNECT_CONFIG }