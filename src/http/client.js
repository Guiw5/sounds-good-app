import axios from 'axios'

const http = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json'
})

export { http }
