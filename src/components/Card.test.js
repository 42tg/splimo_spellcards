import React from 'react';
import ReactDOM from 'react-dom';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';

import {Card, EditableCard} from './Card';

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
describe('Mount a Test Card', () => {
    const wrapper = Enzyme.mount(
        <Card card={TestCard}/>
    )

    test('card name displays correctly', () => {    
        const result = wrapper.find('.name')
        expect(result.text()).toBe(TestCard.name)
    })

    test('card color matches correctly', () => {
        const result = wrapper.find('.block').at(0).prop('style')
        expect(result).toEqual({backgroundColor: TestCard.color})
    })

    test('card schule is displayed correctly, which is not rendering', () => {
        const result = wrapper.find('.schule')
        expect(result).toHaveLength(0);
    })

    test('card typus is displayed correctly, which is not rendering', () => {
        const result = wrapper.find('.typus')
        expect(result).toHaveLength(0);
    })

    test('card schwierigkeit is displayed correctly', () => {
        const result = wrapper.find('.schwierigkeit')
        expect(result.text()).toBe(TestCard.schwierigkeit)
    })
    test('card kosten is displayed correctly',() => {
        const result = wrapper.find('.kosten')
        expect(result.text()).toBe(TestCard.kosten)
    })
    test('card zauberdauer is displayed correctly',() => {
        const result = wrapper.find('.zauberdauer')
        expect(result.text()).toBe(TestCard.zauberdauer)
    })
    test('card reichweite is displayed correctly',() => {
        const result = wrapper.find('.reichweite')
        expect(result.text()).toBe(TestCard.reichweite)
    })
    test('card wirkungsdauer is displayed correctly',() => {
        const result = wrapper.find('.wirkungsdauer')
        expect(result.text()).toBe(TestCard.wirkungsdauer)
    })
    test('card wirkung is displayed correctly',() => {
        const result = wrapper.find('.wirkung')
        expect(result.text()).toBe(TestCard.wirkung)
    })

    test('card dont break if erfolgsgrade not exists', () => {
        const smallerTestCard = {}
        Object.assign(smallerTestCard, TestCard) //copy Object
        
        smallerTestCard.erfolgsgrade = undefined
        const smallWrapper = Enzyme.mount(
            <Card card={smallerTestCard}/>
        )
        const result = smallWrapper.find('.verbesserung')
        expect(result.text()).toBe('')
    })

    test('card verbesserung is displayed correctly',() => {
        const result = wrapper.find('.verbesserung')
        expect(result.text()).toBe(TestCard.erfolgsgrade.verbesserung)
    })
    test('card enchanted is displayed correctly',() => {

        const result = wrapper.find('.enchanted')
        expect(result.text()).toBe(TestCard.erfolgsgrade.enchanted)
    })
})

test('Editable Card', () => {
    const saveFunction = jest.fn()
    const resetFunction = jest.fn()
    const editableWrapper = Enzyme.shallow(
        <EditableCard card={TestCard} saveCallback={saveFunction} resetCallback={resetFunction} />
    )
    editableWrapper.instance().handleColorChange({hex: '#424242'})
    editableWrapper.instance().saveStateName()
    editableWrapper.instance().resetDefault()
    editableWrapper.instance().colorPalette()

    const saveSpell = editableWrapper.find('#saveSpell')
    saveSpell.simulate('click')
    const resetAll = editableWrapper.find('#resetAll')
    resetAll.simulate('click')
    expect(saveFunction.mock.calls.length).toBe(1);
    expect(resetFunction.mock.calls.length).toBe(1);
})