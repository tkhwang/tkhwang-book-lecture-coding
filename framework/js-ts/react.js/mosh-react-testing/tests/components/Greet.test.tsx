import { render, screen } from "@testing-library/react"
import { it, expect, describe } from "vitest"
import Greet from "../../src/components/Greet"

describe("Greet", () => {
  it("should rnder Hello with the name when name is provide", () => {
    render(<Greet name="Mosh" />)

    screen.debug()
  })
})
