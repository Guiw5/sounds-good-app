const dotenv = require('dotenv')
dotenv.config()

//package to wrap UnhandledRejectionPromiseWarnings in Exceptions
require('express-async-errors')
const express = require('express')
const config = require('config')
const winston = require('winston')
const error = require('./middlewares/error')
const request = require('request') // "Request" library
const path = require('path')
const cors = require('cors')
const querystring = require('querystring')
const cookieParser = require('cookie-parser')

require('./startup/logging')()

if (
  !config.get('clientId') ||
  !config.get('secretKey') ||
  !config.get('redirectUri')
)
  throw new Error('FATAL ERROR: Spotify Access Keys are not defined')

const client_id = config.get('clientId')
const client_secret = config.get('secretKey')
const redirect_uri = config.get('redirectUri')

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

var stateKey = 'spotify_auth_state'

const app = express()
  .use(express.static(__dirname + '/public'))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors())
  .use(cookieParser())

app.get('/login', function(req, res) {
  var state = generateRandomString(16)
  res.cookie(stateKey, state)

  // your application requests authorization
  var scope = 'user-read-private user-read-email'
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        show_dialog: true,
        state: state
      })
  )
})

app.get('/callback', function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null
  var state = req.query.state || null
  var storedState = req.cookies ? req.cookies[stateKey] : null

  if (state === null || state !== storedState) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch'
        })
    )
  } else {
    res.clearCookie(stateKey)
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(client_id + ':' + client_secret).toString('base64')
      },
      json: true
    }

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + access_token },
          json: true
        }

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          winston.info(body)
        })

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          'http://localhost:3006/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            })
        )
      } else {
        res.redirect(
          'http://localhost:3006/#' +
            querystring.stringify({
              error: 'invalid_token'
            })
        )
      }
    })
  }
})

app.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(client_id + ':' + client_secret).toString('base64')
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  }

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token
      res.send({
        access_token: access_token
      })
    }
  })
})

//error: middleware to write logs and send 500 status responses
app.use(error)

const port = config.get('port') || 3000
const server = app.listen(port, () =>
  winston.info(`listening in port ${port}...`)
)

module.exports = server
