const readline = require('readline')
const { DEFAULTS } = require('../settings/index')

const info = (host, port) => {
    console.log(`\n--- host: ${host}`);
    console.log(`--- port: ${port}\n`);
    console.log(`View in browser: http://${host}:${port}\n`)

};

const promptStart = () => {
    console.log(`=== Start ${DEFAULTS.APP_NAME} ===\n`);
}

const promptListen = (server) => {

    const host = server.address().address
    const port = server.address().port
    console.log('API is: \x1b[5;32mRUNNING\x1b[0m')
    info(host, port);
    console.log('\tBackend  stdout >>\n')
    readline.emitKeypressEvents(process.stdin);
    process.stdin.on('keypress', (ch, key) => {
        if (key.name == 'q' || key.sequence === '\x03') {
            server.close()
            process.stdin.pause();
            console.log('API is: \x1b[5;37mTERMINATING\x1b[0m')
        }
        if (ch === 'h') {
            console.log(`This is the host: --- ${host}`)
        }
        if (ch === 'b') {
            console.log(`View in browser: http://${host}:${port}`)
        }
        if (ch === 's') {
            info(host, port)
        }
        if (ch === '?') {
            console.log('Press [h] to show the host.')
            console.log('Press [b] to show the live preview link.')
            console.log('Press [q] or [ctrl+c] to quit.')
            console.log('[?] prompts this help.')
        }
    });
    process.stdin.setRawMode(true);
}

module.exports = {
    promptStart,
    promptListen
}
