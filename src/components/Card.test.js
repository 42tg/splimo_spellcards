import 'jsdom-global/register'
import React from 'react'

import Enzyme from 'enzyme'

import {EventBus, EventTypes} from '../eventBus'

import {Card} from './Card'

import MakeTestCard from './MakeTestCard'

const TestCard = MakeTestCard()
describe('Mount a Test Card', () => {
  const Bus = new EventBus()
  const wrapper = Enzyme.shallow(<Card card={TestCard} bus={Bus} />)

  test('deleteButton is there', () => {
    const result = wrapper.find('.deleteButton')
    expect(result.text()).toBe('Löschen')
  })

  test('if deleteButton is not there when disabled', () => {
    const otherWrapper = Enzyme.shallow(<Card card={TestCard} bus={Bus} hideDeleteButton={true}/>)
    const result = otherWrapper.find('.deleteButton')
    expect(result).toHaveLength(0)
  })

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
    const smallWrapper = Enzyme.shallow(<Card card={smallerTestCard}/>)
    const result = smallWrapper.find('.verbesserung')
    expect(result.text()).toBe('')
  })

  test('card verbesserung is displayed correctly',() => {
    const result = wrapper.find('.verbesserung')
    expect(result.text()).toBe(TestCard.erfolgsgrade.verbesserung.join(", "))
  })
  test('card enchanted is displayed correctly',() => {
    const result = wrapper.find('.enchanted')
    expect(result.text()).toBe(TestCard.erfolgsgrade.enchanted)
  })
})
