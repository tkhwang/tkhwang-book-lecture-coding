import { Money } from "../src/money";

describe("Money", () => {
  it("times method 동작해야 한다.", () => {
    const tenEuros = new Money(10, "EUR");

    const twentyEuros = tenEuros.times(2);

    expect(twentyEuros.amount).toBe(20);
    expect(twentyEuros.currency).toBe("EUR");
  });
});
