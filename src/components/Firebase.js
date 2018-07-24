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

export const Auth = function() {
  let user = firebase.auth().currentUser;

  return {
    isLoggedIn : function() { return user != null},
    getUserData : function() {
      if(user == null) return null
      return user.toJSON()
    },
    login: function(email, password, persistenceType) {
      return new Promise((resolve, reject) => {
        firebase.auth()
        .setPersistence(persistenceType || firebase.auth.Auth.Persistence.LOCAL)
        .then(firebase.auth()
            .signInWithEmailAndPassword(email, password).then(resolve))
        .catch(reject)
      })
    },
    loginWithGoogle: function() {
      return new Promise((resolve, reject) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(resolve).catch(reject)
      })
    },
    logout: function() {
      return new Promise(async (resolve, reject) => {
        if (user == null) reject()
        await firebase.auth().signOut()
        resolve()
      })
    },
    signUp: function(email, password) {
      return new Promise((resolve, reject) => {
        firebase.auth()
        .createUserWithEmailAndPassword(email, password).then(resolve)
        .catch(reject)
      })
    },
    onAuthStateChanged: function(callback){
      firebase.auth().onAuthStateChanged(callback)
    }
  }
}

export const Database = function() {
  if(firebase.auth().currentUser == null) throw new Error("User is not logged in please handle that first")
  const userId = firebase.auth().currentUser.uid
  return {
    addCard : function(card) {
      return new Promise(async (resolve, reject) => {
        try{
          const id = await firebase.database().ref(`cards/${userId}`).push(card)
          resolve(id.key)
        } catch (err){
          reject(err) //cannot test this need depency injection
        }
      })
    },
    getCards: function(){
      return new Promise(async (resolve,reject) => {
        try{
          const ref = await firebase.database().ref(`cards/${userId}`).once('value')
          const result = []
          ref.forEach((item) => {
            const tmp = item.val()
            tmp.id = item.key
            result.push(tmp)
          })
          resolve(result)
        } catch (err) {
          reject(err) //cannot test this need depency injection
        }
      })
    },
    deleteAllCards: function(){
      return new Promise(async(resolve, reject) => {
        try{
          await firebase.database().ref(`cards/${userId}`).remove()
          resolve()
        } catch (err){
          reject(err) //cannot test this need depency injection
        }
      })
    },
    deleteCard: function(cardId) {
      return new Promise( async (resolve, reject) => {
        try {
          await firebase.database().ref(`cards/${userId}/${cardId}`).remove()
          resolve()
        } catch(err) {
          reject (err)
        }
      })
    }
  }
}
