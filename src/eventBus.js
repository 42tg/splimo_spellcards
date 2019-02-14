class EventBus {
  events = {}
  async on(eventType, callback) {
    if (!this.events[eventType]) this.events[eventType] = []
    this.events[eventType].push(callback)
  }

  async emit(eventType, eventData) {
    if (!this.events[eventType]) return
    return Promise.all(
      this.events[eventType].map(callback => callback(eventData)),
    )
  }
}

const EventTypes = {
  CARD_SAVE: "CARD_SAVE",
  CARD_ADDED: "CARD_ADDED",
  CARD_EDIT: "CARD_EDIT",
  CARD_EDITED: "CARD_EDITED",
  CARD_DELETE: "CARD_DELETE",
  CARD_DELETED: "CARD_DELETED",
  CARD_DELETE_ALL: "CARD_DELETE_ALL",
  USER_LOGIN: "USER_LOGIN",
  USER_LOGOUT: "USER_LOGOUT",
  USER_GOOGLE_LOGIN: "USER_GOOGLE_LOGIN",
}
export { EventBus, EventTypes }
