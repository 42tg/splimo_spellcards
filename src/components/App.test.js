import React from 'react';
import ReactDOM from 'react-dom';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';

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
  const appWrapper = Enzyme.mount(
      <App/>
  )
  test('save Function from App', () => {
    appWrapper.instance().saveCard(TestCard);
  })
  test('delete Function from App', () => {
    appWrapper.instance().deleteCard(0)
  })
  test('reset Function from App', () => {
    appWrapper.instance().resetAll()
  })
  test('complete functionality from App', () => {
    appWrapper.instance().saveCard(TestCard)
    appWrapper.instance().saveCard(TestCard)
    appWrapper.instance().deleteCard(1)
    appWrapper.instance().resetAll()
  })

})






