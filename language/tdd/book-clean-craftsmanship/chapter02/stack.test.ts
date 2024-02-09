import { assert, describe, expect, test } from "vitest"
import { MyStack } from "./stack"

describe("MyStack은", () => {
  const stack = new MyStack()

  test("stack을 생성할 수 있다", () => {
    expect(stack.isEmpty()).toBe(true)
  })

  test("0 push한 이후에는 stack은 empty가 아니다", () => {
    stack.push(0)
    expect(stack.isEmpty()).toBe(false)
  })
})
