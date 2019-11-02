import axios from 'axios'

const http = axios.create({
  baseURL: 'https://spotify.v1.api/',
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json'
})

export { http }
