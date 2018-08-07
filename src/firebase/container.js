import { connect } from 'react-redux'
import { UserBar } from './components/UserBar'
import installFirebaseEvents from './install'
import {userLoggedIn, userLoggedOut} from './actions'
const UserBarMapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const UserBarMapDispatchToProps = (dispatch) => {
  const firebaseActions = installFirebaseEvents(dispatch)
  console.log(firebaseActions)
  return ({
    logout: () => firebaseActions.then(app => app.logout().then(dispatch(userLoggedOut()))),
    login: (email, password) => firebaseActions.then(app => app.loginWithEmail(email,password).then(user => dispatch(userLoggedIn(user)))),
    loginWithGoogle: () => firebaseActions.then(app => app.loginWithGoogle().then(user => dispatch(userLoggedIn(user))))
  })
}

export const UserBarContainer = connect(
  UserBarMapStateToProps,
  UserBarMapDispatchToProps
)(UserBar)
