const config = require('config')
const path = require('path')
const winston = require('winston')

const client = config.get('clientPort')
const proxy = 'http://localhost:' + client

function proxyHandler(req, res, next) {
  res.header('Access-Control-Allow-Origin', proxy)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
}

module.exports = proxyHandler
