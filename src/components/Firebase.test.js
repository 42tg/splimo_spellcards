import {Auth, Database} from './Firebase'



describe('Test Auth cases', () => {
  
    test('if user is not logged in initialy', () => {
        expect(Auth().isLoggedIn()).toBe(false)
    })

    test('login User with email', async (done) => {
        await Auth().login('test@42tg.de', 'test1234')
        expect(Auth().isLoggedIn()).toBe(true)
        done()
    })

    test('log user out', async (done) => {
        await Auth().logout()
        expect(Auth().isLoggedIn()).toBe(false)
        done()
    })

    describe('test Logged in functions', () => {
        
        beforeAll(async (done) => {
            if(!Auth().isLoggedIn())
                await Auth().login('test@42tg.de', 'test1234')
            done()
        })

        test('Get User Data', () => {
            const userData = Auth().getUserData()
            expect(userData.email).toBe('test@42tg.de')
        })

        test('database connection', () => {
            const db = Database()
        })
        
        test('adding a card',async (done) => {
            const db = Database()
            await db.addCard({test: 'item'})
            done()
        })

        test('get List of cards', async (done) => {
            const items = await Database().getCards()
            items.map((item) => expect(item).toMatchObject({test: 'item'}))
            done()
        })

        test('deleting all cards', async (done) => {
            await Database().deleteAllCards()
            done()
        })

        afterAll(async (done) => {
            
            await Auth().logout()
            done()
        })
    })
})