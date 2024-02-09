import { assert, describe, expect, test } from "vitest"
import { MyStack } from "./stack"

describe("TDD", () => {
  test("myStack을 테스트할 수 있다", () => {
    const stack = new MyStack()

    stack.push(0)
    expect(stack.isEmpty()).toBe(false)
  })
})
