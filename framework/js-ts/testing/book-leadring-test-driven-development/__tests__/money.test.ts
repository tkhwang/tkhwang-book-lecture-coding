import { Money } from "../src/money";
import { Portfolio } from "../src/portfolio";

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

  describe("portpolio", () => {
    it("same currency addition should work.", () => {
      const fiveDollars = new Money(5, "USD");
      const tenDollars = new Money(10, "USD");
      const fifteenDollars = new Money(15, "USD");

      const portfolio = new Portfolio();
      portfolio.add(fiveDollars, tenDollars);

      expect(portfolio.evaluate("USD")).toStrictEqual(fifteenDollars);
    });
  });

  describe("multiple currencies", () => {
    describe("addition", () => {
      it("addition of dollar and euro should work.", () => {
        const fiveDollars = new Money(5, "USD");
        const tenEuros = new Money(10, "EUR");
        const seventeenDollars = new Money(17, "USD");

        const portfolio = new Portfolio();
        portfolio.add(fiveDollars, tenEuros);

        expect(portfolio.evaluate("USD")).toStrictEqual(seventeenDollars);
      });

      it("addition of dollar and won should work.", () => {
        const oneDollar = new Money(1, "USD");
        const krw1100 = new Money(1100, "KRW");
        const krw2200 = new Money(2200, "KRW");

        const portfolio = new Portfolio();
        portfolio.add(oneDollar, krw1100);

        expect(portfolio.evaluate("KRW")).toStrictEqual(krw2200);
      });
    });
  });
});
