import { assert, describe, expect, test } from "vitest"
import { MyStack } from "./stack"

describe("MyStack은", () => {
  const stack = new MyStack()

  test("stack을 생성할 수 있다", () => {
    expect(stack.isEmpty()).toBe(true)
  })

  test("push 할 수 있다", () => {
    stack.push(0)
    expect(stack.isEmpty()).toBe(false)
  })
})
