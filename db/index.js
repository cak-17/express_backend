const mongoose = require('mongoose');
const { DATABASE } = require('../settings/index')
const { logger } = require('../utils/logger')

const dbUri = `${DATABASE.DB_USER}:${DATABASE.DB_PASS}@${DATABASE.DB_HOST}`

const uri = `mongodb+srv://${dbUri}/?retryWrites=true&w=majority`

mongoose
    .connect(uri, {
        useNewUrlParser: true,
    })
    .then(() => logger.info(`${DATABASE.DB_USER} connected on ${DATABASE.DB_HOST} `))
    .catch(err => {
        logger.error(`Connection Error: ${err.message}`)
    })

const db = mongoose.connection

db.on('close', () => {
    logger.info(`Connection with ${DATABASE.DB_HOST} was terminated`)
})
module.exports = db;

