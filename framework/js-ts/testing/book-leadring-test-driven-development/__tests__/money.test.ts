import { Money } from "../src/money";

describe("Money", () => {
  describe("multiplication", () => {
    it("should work.", () => {
      const tenEuros = new Money(10, "EUR");
      const twentyEuros = new Money(20, "EUR");

      expect(tenEuros.times(2).equals(twentyEuros)).toBe(true);
    });
  });

  describe("division", () => {
    it("should work.", () => {
      const krw4002 = new Money(4002, "KRW");
      const krw4002_dividied_4 = new Money(4002 / 4, "KRW");

      expect(krw4002.divide(4).equals(krw4002_dividied_4)).toBe(true);
    });
  });
});
