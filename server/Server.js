const dotenv = require('dotenv')
dotenv.config()

//package to wrap UnhandledRejectionPromiseWarnings in Exceptions
require('express-async-errors')
const express = require('express')
const config = require('config')
const winston = require('winston')
const error = require('./middlewares/error')
const proxy = require('./middlewares/proxy')
const request = require('request') // "Request" library
const path = require('path')
// const cors = require('cors')
const querystring = require('querystring')
const cookieParser = require('cookie-parser')

require('./startup/logging')()

if (
  !config.get('clientId') ||
  !config.get('secretKey') ||
  !config.get('redirectUri') ||
  !config.get('clientPort')
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
const generateRandomString = function(length) {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const stateKey = 'spotify_auth_state'

const app = express()
  .use(express.static(path.join(__dirname, '/public')))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())

if (process.env.NODE_ENV === 'development') {
  app.use(proxy)
  app.get('/', (req, res) => {
    res.redirect('http://localhost:3006')
  })
}

app.get('/login', function(req, res) {
  const state = generateRandomString(16)
  res.cookie(stateKey, state)

  // your application requests authorization
  //Required scopes: ["streaming", "user-read-email", "user-read-private"]
  const scope = 'streaming user-read-private user-read-email'
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        show_dialog: true, //popup to change user logged
        state: state
      })
  )
})

app.get('/callback', function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null
  const state = req.query.state || null
  const storedState = req.cookies ? req.cookies[stateKey] : null

  if (state === null || state !== storedState) {
    res.redirect(
      'http://localhost:3006/login#' +
        querystring.stringify({
          error: 'state_mismatch'
        })
    )
  } else {
    res.clearCookie(stateKey)
    const authOptions = {
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
        const access_token = body.access_token
        const refresh_token = body.refresh_token
        //tokens expires in 3600 seconds => 1 hour

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + access_token },
          json: true
        }

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          winston.info(body)
        })

        // we can also pass the token to the browser to make requests from there
        res.cookie('SPOTIFY_ACCESS_TOKEN', access_token)
        res.cookie('SPOTIFY_REFRESH_TOKEN', refresh_token)

        if (process.env.NODE_ENV === 'development')
          res.redirect('http://localhost:3006/login#')
        else res.redirect(process.env.PROJECT_ROOT + '/login#')
      } else {
        //in case of error
        if (process.env.NODE_ENV === 'development')
          res.redirect(
            'http://localhost:3006/login#' +
              querystring.stringify({ error: 'invalid_token' })
          )
        else
          res.redirect(
            process.env.PROJECT_ROOT +
              '/login#' +
              querystring.stringify({ error: 'invalid_token' })
          )
      }
    })
  }
})

app.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token
  const authOptions = {
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
      const access_token = body.access_token
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
