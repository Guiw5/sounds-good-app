//package to wrap UnhandledRejectionPromiseWarnings in Exceptions
require('express-async-errors')
const express = require('express')
const config = require('config')
const winston = require('winston')
const error = require('./middlewares/error')

require('./startup/logging')()

if (!config.get('clientId') || !config.get('secretKey'))
  throw new Error('FATAL ERROR: Spotify Access Keys are not defined')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/me', async (req, res) => {
  const list = [{ name: 'juan' }, { name: 'pedro' }]
  res.send(list)
})

//error: middleware to write logs and send 500 status responses
app.use(error)

const port = process.env.PORT || 3000
const server = app.listen(port, () =>
  winston.info(`listening in port ${port}...`)
)

module.exports = server
