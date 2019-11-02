import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const response = await fetch('/me', { accept: 'application/json' })
        const data = await response.json()
        setPlaylists(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPlaylist()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>{playlists.map(x => x.name).join('asd')}</code> and save to
          reload.
        </p>
      </header>
    </div>
  )
}

export default App
