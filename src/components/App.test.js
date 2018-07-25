import 'jsdom-global/register';
import React from 'react';

import {EventBus} from '../eventBus'
import Enzyme from 'enzyme';

import firebase from 'firebase'
import App from './App';
import _ from 'lodash'

import MakeTestCard from './MakeTestCard'

const TestCard = MakeTestCard()

describe('Mount the app Card', () => {
  const Bus = new EventBus()
  const appWrapper = Enzyme.shallow(<App bus={Bus}/>)

  test('save Function from App', async (done) => {
    firebase.auth.Auth.Persistence.LOCAL = firebase.auth.Auth.Persistence.NONE
    await appWrapper.instance().login({login: 'test@42tg.de', password:'test1234'}).catch(err => done.fail(err))
    await appWrapper.instance().saveCard(TestCard).catch(err => done.fail(err))
    done()
  })

  test('delete Function from App', (done) => {
    appWrapper.instance().deleteCard(TestCard.id).then(done).catch(err => done.fail(err))
  })

  test('reset Function from App', (done) => {
    appWrapper.instance().resetAll().then(done).catch(err => done.fail(err))
  })

  test('complete functionality from App', async (done) => {
    const Card1 = _.clone(TestCard)
    const Card2 = _.clone(TestCard)
    await appWrapper.instance().saveCard(Card1).catch(err => done.fail(err))
    await appWrapper.instance().saveCard(Card2).catch(err => done.fail(err))
    await appWrapper.instance().deleteCard(Card1.id).catch(err => done.fail(err))
    await appWrapper.instance().resetAll().catch(err => done.fail(err))
    done()
  })
})
