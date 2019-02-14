import React from "react"

import { UserBar } from "./UserBar"
import Enzyme from "enzyme"

import { EventBus, EventTypes } from "../eventBus"

describe("userBar testing", () => {
  const bus = new EventBus()

  test("mounts correctly", () => {
    Enzyme.shallow(<UserBar bus={bus} />)
  })
  test("User is logged out and it shows Loginform", () => {
    const wrapper = Enzyme.shallow(<UserBar bus={bus} />)
    const result = wrapper.find(".userBar")
    expect(result.text()).toBe("<LoginForm />")
  })

  test("Simulate User with Email only", () => {
    const user = {
      email: "test@42tg.de",
    }
    const wrapper = Enzyme.shallow(<UserBar bus={bus} user={user} />)
    const findMail = wrapper.find(".userBar").find("span")
    const findLogoutButton = wrapper.find(".userBar").find("button")
    expect(findMail.text()).toBe(user.email)
    expect(findLogoutButton.text()).toBe("Logout")
  })
  test("Simulate User with DisplayName and Email only", () => {
    const user = {
      displayName: "Testtimonial",
      email: "test@42tg.de",
    }
    const wrapper = Enzyme.shallow(<UserBar bus={bus} user={user} />)
    const findMail = wrapper.find(".userBar").find("span")
    const findLogoutButton = wrapper.find(".userBar").find("button")
    expect(findMail.text()).toBe(user.displayName)
    expect(findLogoutButton.text()).toBe("Logout")
  })

  test("Check event handling", () => {
    const user = {
      displayName: "Testtimonial",
      email: "test@42tg.de",
    }
    const callback = jest.fn()
    bus.on(EventTypes.USER_LOGOUT, callback)
    const wrapper = Enzyme.shallow(<UserBar bus={bus} user={user} />)

    wrapper
      .find(".userBar")
      .find("button")
      .simulate("click")
    expect(callback).toBeCalled()
  })
})
