import React from 'react'

export default function Layout(props) {
  return (
    <div className="App">
      <div className="wrapper">{props.children}</div>
    </div>
  )
}
