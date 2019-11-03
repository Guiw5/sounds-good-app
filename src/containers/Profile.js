import React from 'react'
import { connect } from 'react-redux'
import * as selectors from '../store/reducers/selectors'
import * as actions from '../store/actions/index'

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap'

class Profile extends React.Component {
  componentDidMount() {
    this.props.getProfile()
  }

  render() {
    if (this.props.loading) return <p>Loading...</p>

    if (this.props.profile !== null) {
      const { display_name, images, email } = this.props.profile

      return (
        <div className={'profile'}>
          <Card>
            <CardImg
              top
              src={images[0].url}
              alt={`${display_name} Profile's Picture`}
              className={'picture'}
            />
            <CardBody>
              <CardTitle>{`Hi ${display_name}!!`} </CardTitle>
              <CardSubtitle>{'Welcome to SoundsGood'}</CardSubtitle>
              <CardText>{email}</CardText>
              <Button>LogOut</Button>
            </CardBody>
          </Card>
        </div>
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
