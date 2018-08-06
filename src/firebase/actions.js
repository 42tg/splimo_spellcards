const userLoggedIn = user => {
  console.log(user)
  return ({
  type: 'USER_LOGIN',
  user
})
}
const userLoggedOut = () => ({
  type: 'USER_LOGOUT',
})



