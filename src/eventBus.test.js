import {EventBus, EventTypes} from './eventBus'

describe('EventBus', () => {
    test('setup callback and handle it', async (done) => {
        const Bus = new EventBus()
        const dummyCallback = jest.fn()
        
        await Bus.register(EventTypes.CARD_ADDED, dummyCallback)
        expect(dummyCallback).not.toBeCalled()

        await Bus.handle(EventTypes.CARD_ADDED, {test :'test'})

        expect(dummyCallback).toBeCalledWith({test :'test'})
        done()
    })

    test('with no handle target does not break', () => {
        const Bus = new EventBus()
        function causedErrors(){
            Bus.handle(EventTypes.CARD_DELETED)
        }
        expect(causedErrors).not.toThrow()
    })

})