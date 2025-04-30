import { Dollar } from "../src/dollar";

describe("Dollar", () => {
  it("times method 동작해야 한다.", () => {
    const dollar = new Dollar(5);
    dollar.times(2);
    expect(dollar.amount).toBe(10);
  });
});
