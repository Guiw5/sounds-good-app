import React from 'react'
import { connect } from 'react-redux'

import { SongsList } from '../components/SongsList'
import * as selectors from '../store/reducers/selectors'

class Songs extends React.Component {
  render() {
    if (this.props.loading)
      return <p style={{ fontSize: '0.9rem' }}>Loading...</p>
    if (this.props.songs.length > 0)
      return <SongsList songs={this.props.songs} />
    return null
  }
}

const mapStateToProps = state => ({
  songs: selectors.getSongs(state),
  loading: selectors.getSongsLoading(state)
})

export default connect(
  mapStateToProps,
  null
)(Songs)
