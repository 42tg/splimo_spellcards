import React from "react"
import Enzyme from "enzyme"

import { EventBus, EventTypes } from "../eventBus"

import { LoginForm } from "./LoginForm"

describe("Test of LoginForm", () => {
  const bus = new EventBus()
  let wrapper

  test("it mounts correctly", () => {
    wrapper = Enzyme.shallow(<LoginForm bus={bus} />)
  })

  test("on login value Change", () => {
    wrapper.find("#login").simulate("keyUp", { target: { value: "user" } })
    expect(wrapper.state("login")).toBe("user")
  })

  test("on password value Change", () => {
    wrapper.find("#password").simulate("keyUp", { target: { value: "pass" } })
    expect(wrapper.state("password")).toBe("pass")
  })

  test("event is emitted on form submit", () => {
    const fakeEvent = { preventDefault: jest.fn() }

    const callback = jest.fn()
    bus.on(EventTypes.USER_LOGIN, callback)

    wrapper.find("#loginForm").simulate("submit", fakeEvent)
    expect(fakeEvent.preventDefault).toBeCalled()
    expect(callback).toBeCalledWith({ login: "user", password: "pass" })
  })
})
