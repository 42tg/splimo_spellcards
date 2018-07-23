import {Auth, Database} from './Firebase'
import firebase from 'firebase'
describe('Test Auth cases', () => {
  test('if user is not logged in initialy', () => {
    expect(Auth().isLoggedIn()).toBe(false)
  })

  test('login User with email', async (done) => {
    await Auth().login('test@42tg.de', 'test1234', firebase.auth.Auth.Persistence.NONE).catch(err => done.fail(err))
    expect(Auth().isLoggedIn()).toBe(true)
    done()
  })

  test('log user out', async (done) => {
    await Auth().logout().catch(err => done.fail(err))
    expect(Auth().isLoggedIn()).toBe(false)
    done()
  })

  describe('test Logged in functions', () => {
    beforeAll(async (done) => {
      if(!Auth().isLoggedIn())
        await Auth().login('test@42tg.de', 'test1234', firebase.auth.Auth.Persistence.NONE).catch(err => done.fail(err))
      done()
    })

    test('Get User Data', async (done) => {
      const userData = await Auth().getUserData()
      expect(userData.email).toBe('test@42tg.de')
      done()
    })

    test('database connection', () => {
      const db = Database()
    })

    test('adding a card',async (done) => {
      const db = Database()
      await db.addCard({test: 'item'}).catch(err => done.fail(err))
      done()
    })

    test('get List of cards', async (done) => {
      const items = await Database().getCards().catch(err => done.fail(err))
      done()
    })

    test('deleting all cards', async (done) => {
      await Database().deleteAllCards().catch(err => done.fail(err))
      done()
    })

    afterAll(async (done) => {
      await Auth().logout().catch(err => done.fail(err))
      done()
    })
  })

  describe('test errors', () => {
    test('getUser Data without login', async () => {
      expect(Auth().getUserData()).toBeNull()
    })

    test('rejected logout', (done) => {
      Auth().logout().catch(() => done())
    })

    test('rejected login', (done) => {
      Auth().login('invalid', 'user').catch(() => done())
    })

    test('Database access without been logged in', () => {
      const shouldBreak = function() {
        Database()
      }
      expect(shouldBreak).toThrowError()
    })
  })
})
