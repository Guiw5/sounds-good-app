import React from 'react'

export default function Layout(props) {
  return (
    <div className="App">
      <header className="App-header">{props.children}</header>
    </div>
  )
}
