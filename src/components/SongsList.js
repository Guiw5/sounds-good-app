import React from 'react'

export const SongsList = ({ songs }) => {
  return (
    <div
      style={{
        height: '300px',
        fontSize: '0.8rem',
        width: '400px'
      }}
    >
      {songs.map((x, index) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '1px solid '
          }}
          key={index}
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
