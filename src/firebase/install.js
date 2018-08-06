import { addCard, updateCard, deleteCard } from '../cards/actions'
import { userLoggedIn, userLoggedOut } from './actions'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyBRod4BNKoK7dDHPH6X3vMeaCuoCb9oOuo",
  authDomain: "splittermond-fd59e.firebaseapp.com",
  databaseURL: "https://splittermond-fd59e.firebaseio.com",
  projectId: "splittermond-fd59e",
  storageBucket: "splittermond-fd59e.appspot.com",
  messagingSenderId: "828939015214"
}
firebase.initializeApp(config)
const installFirebaseEvents = async (dispatch) => {
   const app = await firebase.app()

  app.auth().onAuthStateChanged((user) => {
    if(user){
      const rc = registerCallbacks(app)(user.id)
      rc.onCardAdded(card => dispatch(addCard(card)))
      rc.onCardChanged(card => dispatch(updateCard(card.id, card)))
      rc.onCardDeleted(id => dispatch(deleteCard(id)))
    }
  })

  return firebaseActions(app)(dispatch)
}

export const firebaseActions = app => dispatch =>{

 return ({
  loginWithEmail : function (email, password, persistenceType) {
    return app.auth().signInWithEmailAndPassword(email, password).then(result => result.user.toJSON()).catch(console.error)
  },
  loginWithGoogle : function() {
      const provider = new app.auth.GoogleAuthProvider();
      app.auth.signInWithPopup(provider).then(dispatch(userLoggedIn)).catch(console.error)
  },
  logout: async function() {
      if (app.auth.currentUser == null) return
      await app.auth.signOut()
      dispatch(userLoggedOut)
  }
})
}
const registerCallbacks = app => userId => ({
  onCardAdded : async function(callback) {
    const ref = await app.database().ref(`cards/${userId}`)
    ref.on('child_added', (data) => {
      const card = data.val()
      card.id = data.key
      callback(card)
    })
  },
  onCardChanged : async function(callback){
    const ref = await app.database().ref(`cards/${userId}`)
    ref.on('child_changed', (data) => {
      const card = data.val()
      card.id = data.key
      callback(card)
    })
  },
  onCardDeleted : async function(callback) {
      const ref = await app.database().ref(`cards/${userId}`)
      ref.on('child_removed', (data ) => {callback(data.key)} )
  }
})

export default installFirebaseEvents
