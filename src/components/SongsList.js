import React from 'react'
import { Media } from 'reactstrap'

export const SongsList = ({ songs }) => {
  console.log(songs[0])
  return (
    <div
      style={{
        height: '300px',
        fontSize: '0.8rem',
        width: '400px'
      }}
    >
      {songs.map(x => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '1px solid '
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'space-around'
            }}
          >
            <div>{x.name}</div>
            <div>{` - `}</div>
            <div>{x.artists.map(a => a.name).join(' ft ')}</div>
          </div>
          <div>Album: {x.album}</div>
        </div>
      ))}
    </div>
  )
}
