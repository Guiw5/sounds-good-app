import React from 'react'

export default function Layout(props) {
  return (
    <div className="App">
      <div className="App-header">{props.children}</div>
    </div>
  )
}
