import { assert, beforeAll, describe, expect, test } from "vitest"
import { MyStack } from "./stack"

describe("MyStack은", () => {
  let stack = null

  beforeAll(() => {
    stack = new MyStack()
  })

  test("stack을 생성할 수 있다", () => {
    expect(stack.isEmpty()).toBe(true)
  })

  test("0 push한 이후에는 stack은 empty가 아니다", () => {
    stack.push(0)
    expect(stack.isEmpty()).toBe(false)
  })

  test("0 push -> pop 이후에는 empty이다.", () => {
    stack.push(0)
    stack.pop()
    expect(stack.isEmpty()).toBe(true)
  })

  test("push 0 -> push 0 이후에는 사이즈가 2이어야 한다", () => {
    stack.push(0)
    stack.push(0)
    expect(stack.size).toBe(2)
  })
})
