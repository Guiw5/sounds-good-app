import React, { useState, useEffect } from 'react'
import './App.css'
import { server } from './http/axios'

function App() {
  // const [playlists, setPlaylists] = useState([])

  // useEffect(() => {
  //   async function fetchPlaylist() {
  //     try {
  //       const response = await fetch('/login', {
  //         accept: 'application/json'
  //       })
  //       const data = await response.json()
  //       setPlaylists(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchPlaylist()
  // }, [])

  return (
    <div className="App">
      <a href="http://localhost:8888/login">Login to spotify</a>
    </div>
  )
}

export default App
