import { Money } from "../src/money";

describe("Dollar", () => {
  it("times method 동작해야 한다.", () => {
    const dollar = new Money(5, "USD");

    const result = dollar.times(2);

    expect(result.amount).toBe(10);
    expect(result.currency).toBe("USD");
  });
});
