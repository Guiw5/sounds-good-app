import axios from 'axios'

const server = axios.create({
  baseURL: 'http://localhost:8888/',
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json'
})

export { server }
