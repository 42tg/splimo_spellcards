import React from "react"

import Enzyme from "enzyme"

import { EventBus, EventTypes } from "../eventBus"

import { CardAddForm } from "./CardAddForm"

import MakeTestCard from "./MakeTestCard"

const TestCard = MakeTestCard()

describe("Card add form test", () => {
  const Bus = new EventBus()
  let wrapper = null

  test("Form mounts", () => {
    wrapper = Enzyme.shallow(<CardAddForm bus={Bus} />)
  })

  test("Set name", () => {
    wrapper
      .find("#name")
      .simulate("change", { target: { value: TestCard.name } })
    expect(wrapper.state().card.name).toBe(TestCard.name)
  })

  test("Set schwierigkeit", () => {
    wrapper
      .find("#schwierigkeit")
      .simulate("change", { target: { value: TestCard.schwierigkeit } })
    expect(wrapper.state().card.schwierigkeit).toBe(TestCard.schwierigkeit)
  })

  test("Set kosten", () => {
    wrapper
      .find("#kosten")
      .simulate("change", { target: { value: TestCard.kosten } })
    expect(wrapper.state().card.kosten).toBe(TestCard.kosten)
  })

  test("Set zauberdauer", () => {
    wrapper
      .find("#zauberdauer")
      .simulate("change", { target: { value: TestCard.zauberdauer } })
    expect(wrapper.state().card.zauberdauer).toBe(TestCard.zauberdauer)
  })

  test("Set reichweite", () => {
    wrapper
      .find("#reichweite")
      .simulate("change", { target: { value: TestCard.reichweite } })
    expect(wrapper.state().card.reichweite).toBe(TestCard.reichweite)
  })

  test("Set wirkungsdauer", () => {
    wrapper
      .find("#wirkungsdauer")
      .simulate("change", { target: { value: TestCard.wirkungsdauer } })
    expect(wrapper.state().card.wirkungsdauer).toBe(TestCard.wirkungsdauer)
  })

  test("Set wirkung", () => {
    wrapper
      .find("#wirkung")
      .simulate("change", { target: { value: TestCard.wirkung } })
    expect(wrapper.state().card.wirkung).toBe(TestCard.wirkung)
  })

  test("Set erfolgsgrade.verbesserung", () => {
    wrapper
      .find("#verbesserung")
      .simulate("change", {
        target: {
          options: [
            { value: "Auslösezeit", selected: true },
            { value: "Verstärken (s.u.)", selected: true },
          ],
        },
      })
    expect(wrapper.state().card.erfolgsgrade.verbesserung).toEqual(
      TestCard.erfolgsgrade.verbesserung,
    )
  })

  test("Set erfolgsgrade.enchanted", () => {
    wrapper
      .find("#enchanted")
      .simulate("change", {
        target: { value: TestCard.erfolgsgrade.enchanted },
      })
    expect(wrapper.state().card.erfolgsgrade.enchanted).toBe(
      TestCard.erfolgsgrade.enchanted,
    )
  })

  test("Color change", () => {
    wrapper.instance().handleColorChange({ hex: TestCard.color })
    expect(wrapper.state().card.color).toBe(TestCard.color)
  })

  test("final submit", () => {
    const callback = jest.fn()
    Bus.on(EventTypes.CARD_SAVE, callback)
    wrapper.find(".CardForm").simulate("submit", { preventDefault: jest.fn() })
    expect(callback).toBeCalledWith(TestCard)
  })

  test("call reset", () => {
    wrapper.find(".CardForm").simulate("reset")
    expect(wrapper.state().card).toEqual({
      name: "",
      color: "",
      schwierigkeit: "",
      kosten: "",
      zauberdauer: "",
      reichweite: "",
      wirkungsdauer: "",
      wirkung: "",
      erfolgsgrade: {
        verbesserung: "",
        enchanted: "",
      },
    })
  })
})
