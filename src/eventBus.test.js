import {EventBus, EventTypes} from './eventBus'

describe('EventBus', () => {
    test('setup callback and emit it', async (done) => {
        const Bus = new EventBus()
        const dummyCallback = jest.fn()
        
        await Bus.on(EventTypes.CARD_ADDED, dummyCallback)
        expect(dummyCallback).not.toBeCalled()

        await Bus.emit(EventTypes.CARD_ADDED, {test :'test'})

        expect(dummyCallback).toBeCalledWith({test :'test'})
        done()
    })

    test('with no emitt target does not break', () => {
        const Bus = new EventBus()
        function causedErrors(){
            Bus.emit(EventTypes.CARD_DELETED)
        }
        expect(causedErrors).not.toThrow()
    })

    test('if its break when an exeption is callbacked', (done) => {
        const Bus = new EventBus()
        function causeError(){
           throw new Error('this is a test error')    
        }
 
        Bus.on(EventTypes.CARD_ADDED, causeError)

        Bus.emit(EventTypes.CARD_ADDED).catch((err) => {
            done()
        })
    })

    test('if each bus has its own stack', () => {
        const Bus1 = new EventBus()
        const Bus2 = new EventBus()

        const testFunc1 = jest.fn()
        const testFunc2 = jest.fn()

        Bus1.on('Test', testFunc1)
        Bus2.on('Test', testFunc2)

        Bus1.emit('Test')
        expect(testFunc1).toHaveBeenCalledTimes(1)
        expect(testFunc2).toHaveBeenCalledTimes(0)

        Bus2.on('Test', testFunc1)
        Bus2.emit('Test')
        expect(testFunc1).toHaveBeenCalledTimes(2)
        expect(testFunc2).toHaveBeenCalledTimes(1)
    })
})