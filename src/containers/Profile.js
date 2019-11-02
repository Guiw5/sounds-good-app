import React from 'react'
import { connect } from 'react-redux'
import * as selectors from '../store/reducers/selectors'
import * as actions from '../store/actions/index'

class Profile extends React.Component {
  componentDidMount() {
    this.props.getProfile()
  }

  render() {
    if (this.props.loading) return <p>Loading...</p>

    if (this.props.profile !== null) {
      const { display_name, images } = this.props.profile

      return (
        <>
          <div>Hi {display_name}!! Welcome to SoundsGood</div>
          <img src={images[0].url} />
        </>
      )
    }
    return null
  }
}

const mapStateToProps = state => ({
  profile: selectors.getProfile(state),
  loading: selectors.getProfileLoading(state)
})

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(actions.getProfile())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
