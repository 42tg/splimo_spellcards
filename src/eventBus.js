class EventBus{
  async register(eventType, callback){
    if(!this[eventType]) this[eventType] = []
    this[eventType].push(callback)
  }
  
  async handle(eventType, eventData){
    if(!this[eventType]) return
    
    return this[eventType].map(callback => callback(eventData))
  }
}

const EventTypes = {
  CARD_ADDED: 'CARD_ADDED',
  CARD_DELETED: 'CARD_DELETED'
}
export {EventBus, EventTypes}