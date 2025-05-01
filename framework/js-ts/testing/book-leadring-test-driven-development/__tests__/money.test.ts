import { Money } from "../src/money";
import { Portfolio } from "../src/portfolio";
import { Bank } from "../src/bank";

describe("Money", () => {
  let bank: Bank;

  beforeEach(() => {
    bank = new Bank();
    bank.addExchangeRate("EUR", "USD", 1.2);
    bank.addExchangeRate("USD", "KRW", 1100);
  });

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

      expect(portfolio.evaluate(bank, "USD")).toStrictEqual(fifteenDollars);
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

        expect(portfolio.evaluate(bank, "USD")).toStrictEqual(seventeenDollars);
      });

      it("addition of dollar and won should work.", () => {
        const oneDollar = new Money(1, "USD");
        const krw1100 = new Money(1100, "KRW");
        const krw2200 = new Money(2200, "KRW");

        const portfolio = new Portfolio();
        portfolio.add(oneDollar, krw1100);

        expect(portfolio.evaluate(bank, "KRW")).toStrictEqual(krw2200);
      });

      it("환율 정의되어 있지 않은 화폐로 평가 시에는 예외가 발생한다.", () => {
        const oneDollar = new Money(1, "USD");
        const oneEuro = new Money(1, "EUR");
        const oneWon = new Money(1, "KRW");

        const portfolio = new Portfolio();
        portfolio.add(oneDollar, oneEuro, oneWon);

        expect(() => portfolio.evaluate(bank, "Kalganid")).toThrow(
          "Missing exchange rate"
        );
      });
    });
  });

  describe("bank", () => {
    it("addition of EUR and USD should work.", () => {
      const bank = new Bank();
      bank.addExchangeRate("EUR", "USD", 1.2);

      const tenEuros = new Money(10, "EUR");

      expect(bank.convert(tenEuros, "USD")).toStrictEqual(new Money(12, "USD"));
    });

    it("환율 정의되어 있지 않은 화폐로 평가 시에는 예외가 발생한다.", () => {
      const tenEuros = new Money(10, "EUR");

      const expectedError = new Error("EUR->Kalganid");

      expect(() => bank.convert(tenEuros, "Kalganid")).toThrow(expectedError);
    });
  });
});
