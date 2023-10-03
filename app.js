const express = require("express");
const cors = require("cors");
const logMiddleware =  require('./middlewares/log')
const http = require('http');
const db = require('./db');

const userRouter = require('./routers/userRouter');
const roomRouter = require('./routers/roomRouter');
const reservationRouter = require('./routers/reservationRouter')

const { promptListen, formatCli } = require('./utils/prompts');

const { DEFAULTS } = require('./settings/index');
const { errorMiddleware, notFoundMiddleware } = require("./middlewares/errors");

class Main {
    app = express()
    retryAttempts = DEFAULTS.RETRY

    #host
    #port

    constructor(host, port){
        this.#host = host || DEFAULTS.HOST
        this.#port = port || DEFAULTS.PORT
        // Set up
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(logMiddleware);
        // this.app.use(errorMiddleware);
        // this.app.use(notFoundMiddleware);
        this.app.locals.title = DEFAULTS.APP_NAME

        // Define routers
        this.app.use('/api/auth', userRouter)
        this.app.use('/api', reservationRouter)
        this.app.use('/api', roomRouter)

        // Create HTTP server
        this.server = http.createServer(this.app)
    }
    setPort(port) {
        this.#port = port
    }
    setHost(host) {
        this.#host = host
    }
    setDevEnv() {
        this.#host = DEFAULTS.DEV_HOST
        this.#port = DEFAULTS.PORT
    }
    runServer(input) {
        this.server.listen(this.#port, this.#host, () => {
            if (!input) promptListen(this.server)
        }).on('error', (e) => {
            const errorCode = e.code
            if (errorCode === 'EADDRINUSE') {
                if (this.retryAttempts > 0) {
                    console.error(`--- Address already in use, retry ${this.retryAttempts}/5...\n`);
                    setTimeout(() => {
                        this.server.close();
                        this.server.listen(this.#port, this.#host);
                        this.retryAttempts--;
                    }, 1000);
                }
                // format to label
                else console.warn(`\x1b[1;31m[ERROR]\x1b[0m Address ${e.address}:${e.port} is already in use`)
            }
        }).on('close', () => {
            db.close()
        });
    }

    close() {
        this.server.close()
    }
}


module.exports = new Main();

