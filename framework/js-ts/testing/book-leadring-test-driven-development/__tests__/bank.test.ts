import { Bank } from "../src/bank";
import { Money } from "../src/money";

describe("Bank", () => {
  describe("missing exchange rate", () => {
    it("should throw error", () => {
      const bank = new Bank();
      const tenEuros = new Money(10, "EUR");

      const expectedError = new Error("EUR->Kalganid");

      expect(() => bank.convert(tenEuros, "Kalganid")).toThrow(expectedError);
    });
  });
});
