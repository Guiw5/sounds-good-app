import React, { useEffect, useState } from 'react'

import { SpotifyPlayer } from './SpotifyPlayer'
import { Profile } from './Profile'

import { spotifyApi } from '../api/spotifyApi'
import WithLoading from '../hocs/WithLoading'

const ProfileWithLoading = WithLoading(Profile)

export const Home = props => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      const profile = await spotifyApi.getMe()
      setProfile(profile)
      setLoading(false)
    }
    fetchProfile()
  }, [])

  return (
    <div className="home">
      <ProfileWithLoading profile={profile} loading={loading} />
      <SpotifyPlayer />
    </div>
  )
}
