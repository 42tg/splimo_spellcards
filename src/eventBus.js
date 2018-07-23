class EventBus {
  events = {}
  async on(eventType, callback) {
    if (!this.events[eventType]) this.events[eventType] = []
    this.events[eventType].push(callback)
  }

  async emit(eventType, eventData) {
    if (!this.events[eventType]) return
    return Promise.all(this.events[eventType].map(callback => callback(eventData)))
  }
}

const EventTypes = {
  CARD_ADDED: 'CARD_ADDED',
  CARD_DELETED: 'CARD_DELETED',
  CARD_DELETE_ALL: 'CARD_DELETE_ALL',
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT'
}
export {
  EventBus,
  EventTypes
}
