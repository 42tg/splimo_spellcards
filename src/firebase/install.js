import { addCard, updateCard, deleteCard } from '../cards/actions'
import { userLoggedIn } from './actions'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import _ from 'lodash'

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

  await app.auth().onAuthStateChanged( async (user) => {
    if(user){
      dispatch(userLoggedIn(user))

      const rc = await registerCallbacks(app)(user.uid)
      //rc.getSavedCards(cards => cards.map(card => dispatch(addCard(card))))
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
      const provider = new firebase.auth.GoogleAuthProvider();
      return app.auth().signInWithPopup(provider).then(result => result.user.toJSON()).catch(console.error)
  },
  logout: async function() {
      if (app.auth.currentUser == null) return
      return await app.auth.signOut()
  }
})
}
const registerCallbacks = app => userId => ({
  getSavedCards: async function(callback) {

      try{
        const ref = await app.database().ref(`cards/${userId}`).once('value')
        const result = []
        ref.forEach((item) => {
          const tmp = item.val()
          tmp.id = item.key
          if(_.get(tmp, 'erfolgsgrade.verbesserung')) {
            console.log(tmp)
            if(!Array.isArray(_.get(tmp, 'erfolgsgrade.verbesserung')))
            {
              tmp.erfolgsgrade.verbesserung = tmp.erfolgsgrade.verbesserung.split(', ')
            }
          }
          result.push(tmp)
        })
        callback(result)
      } catch (err) {
        console.error(err)
      }
  },
  onCardAdded : async function(callback) {
    const ref = await app.database().ref(`cards/${userId}`)
    ref.on('child_added', (data) => {
      const card = data.val()
      card.id = data.key
      if(_.get(card, 'erfolgsgrade.verbesserung')) {
        console.log(card)
        if(!Array.isArray(_.get(card, 'erfolgsgrade.verbesserung')))
        {
          card.erfolgsgrade.verbesserung = card.erfolgsgrade.verbesserung.split(', ')
        }
      }
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
      ref.on('child_removed', (data) => {
        callback(data.key)
      })
  }
})

export default installFirebaseEvents
