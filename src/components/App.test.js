import 'jsdom-global/register';
import React from 'react';

import {EventBus} from '../eventBus'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import firebase from 'firebase'
import App from './App';
import _ from 'lodash'
Enzyme.configure({ adapter: new Adapter() });

const TestCard = {
  name: 'TestCard',
  color: 'purple',
  schule: 'Beherrschung  0',
  typus: 'Einstellung',
  schwierigkeit: 'GW',
  kosten: 'K1',
  zauberdauer: '3 T',
  reichweite: 'B',
  wirkungsdauer: 'K',
  wirkung: 'Der Zauberer verbessert die Einstellung des Ziels gegenüber einer von ihm bestimmten Person, Idee oder Sache um 1 Stufe (maximal auf Aufgeschlossen). Dieser Zauber benötigt weder Formel noch Geste.',
  erfolgsgrade: {
    verbesserung: 'Auslösezeit, Verstärken',
    enchanted : '2 EG (Kosten +K1V1): Die Einstellung verbessert sich um insgesamt 2 Stufen (maximal auf Hilfsbereit).',
  }
}
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
