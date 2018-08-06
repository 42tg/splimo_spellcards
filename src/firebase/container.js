import { connect } from 'react-redux'
import { UserBar } from './components/UserBar'
import installFirebaseEvents from './install'

const UserBarMapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const UserBarMapDispatchToProps = (dispatch) => {
  const firebaseActions = installFirebaseEvents(dispatch)
  console.log(firebaseActions)
  return ({
    logout: () => firebaseActions.then(app => app.logout().then(action => dispatch(action))),
    login: (email, password) => firebaseActions.then(app => app.loginWithEmail(email,password).then(action => dispatch(action))),
    loginWithGoogle: () => firebaseActions.then(app => app.loginWithGoogle().then(action => dispatch(action)))
  })
}

export const UserBarContainer = connect(
  UserBarMapStateToProps,
  UserBarMapDispatchToProps
)(UserBar)
