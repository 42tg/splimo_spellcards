export default function() {
  return next => action => {
    console.log(action.type, action)
    const returnValue = next(action)
    return returnValue
  }
}
