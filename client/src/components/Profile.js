import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap'
import { authService } from '../services/authService'

export const Profile = withRouter(({ history, profile }) => {
  const [ddnOpen, setDdnOpen] = useState(false)
  const toggle = () => setDdnOpen(prevState => !prevState)

  const logOut = () => {
    authService.logout(() => history.push('/'))
  }

  if (!profile) return null

  return (
    <div className="profile">
      <Dropdown isOpen={ddnOpen} toggle={toggle}>
        <DropdownToggle caret>
          <img className="profile-pic" src={profile.images[0].url} />
          <span>{profile.display_name}</span>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Welcome</DropdownItem>
          <DropdownItem onClick={logOut}>Log Out</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
})
