import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as selectors from '../store/reducers/selectors'
import * as actions from '../store/actions/index'

class Playlists extends React.Component {
  componentDidMount() {
    this.props.getPlaylists()
  }

  render() {
    return null
  }
}

const mapStateToProps = state => ({
  playlists: selectors.getPlaylists(state),
  loading: selectors.getPlaylistsLoading(state)
})

const mapDispatchToProps = dispatch => ({
  getPlaylists: () => dispatch(actions.getPlaylists())
  // setPlalist: id => dispatch(actions.setPlalist(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlists)
