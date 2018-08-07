import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* cardAdded(action){
  try{
    //add user here and
    console.log(action)
    yield put ({type: 'ADD_CARD_COMPLETE', card: action.card})
  } catch (e){
    yield put ({type: 'ADD_CARD_FAILED', card: action.card})
  }
}


function *CardSaga(){
  yield takeEvery("ADD_CARD", cardAdded)
}

export default CardSaga
