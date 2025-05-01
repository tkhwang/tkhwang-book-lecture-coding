import { Bank } from "../src/bank";
import { Money } from "../src/money";

describe("Bank", () => {
  let bank: Bank;

  beforeEach(() => {
    bank = new Bank();
    bank.addExchangeRate("EUR", "USD", 1.2);
    bank.addExchangeRate("USD", "KRW", 1100);
  });

  describe("missing exchange rate", () => {
    it("should throw error", () => {
      const bank = new Bank();
      const tenEuros = new Money(10, "EUR");

      const expectedError = new Error("EUR->Kalganid");

      expect(() => bank.convert(tenEuros, "Kalganid")).toThrow(expectedError);
    });
  });

  describe("convert", () => {
    it("should convert from EUR to USD", () => {
      const tenEuros = new Money(10, "EUR");
      expect(bank.convert(tenEuros, "USD").equals(new Money(12, "USD"))).toBe(
        true
      );
    });

    it("should use new value if exchange rate is changed", () => {
      bank.addExchangeRate("EUR", "USD", 1.3);

      const tenEuros = new Money(10, "EUR");

      expect(bank.convert(tenEuros, "USD").equals(new Money(13, "USD"))).toBe(
        true
      );
    });
  });
});
