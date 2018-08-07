import { put, takeEvery } from 'redux-saga/effects'


function* cardAdder(action){
  try{
    yield put ({type: 'ADD_CARD_COMPLETE', card: action.card})
  } catch (e){
    yield put ({type: 'ADD_CARD_FAILED', card: action.card})
  }
}

function* cardUpdater(action){
  try{
    yield put ({type: 'UPDATE_CARD_COMPLETE', card: action.card})
  } catch (e){
    yield put ({type: 'UPDATE_CARD_FAILED', card: action.card})
  }
}

function* cardDeleter(action){
  try{
    yield put ({type: 'DELETE_CARD_COMPLETE', card: action.card})
  } catch (e){
    yield put ({type: 'DELETE_CARD_FAILED', card: action.card})
  }
}
function* CardSaga(){
  yield takeEvery("ADD_CARD", cardAdder)
  yield takeEvery("UPDATE_CARD", cardUpdater)
  yield takeEvery("DELETE_CARD", cardDeleter)
}

export default CardSaga
