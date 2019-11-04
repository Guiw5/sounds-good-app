import React from 'react'
import { connect } from 'react-redux'
import * as selectors from '../store/reducers/selectors'
import * as actions from '../store/actions/index'
import { MyCarousel } from '../components/MyCarousel'

class Playlists extends React.Component {
  componentDidMount() {
    this.props.getPlaylists()
  }

  render() {
    if (this.props.loading) return <p>Loading...</p>
    return (
      <MyCarousel
        items={this.props.playlists}
        setPlaylist={this.props.setPlaylist}
      />
    )
  }
}

const mapStateToProps = state => ({
  playlists: selectors.getPlaylists(state),
  loading: selectors.getPlaylistsLoading(state)
})

const mapDispatchToProps = dispatch => ({
  getPlaylists: () => dispatch(actions.getPlaylists()),
  setPlaylist: id => dispatch(actions.setPlaylist(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlists)
