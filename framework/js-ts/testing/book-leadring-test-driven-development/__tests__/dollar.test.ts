import { Money } from "../src/money";

describe("Dollar", () => {
  describe("multiplication", () => {
    it("times method 동작해야 한다.", () => {
      const fiveDollars = new Money(5, "USD");
      const tenDollars = new Money(10, "USD");

      expect(fiveDollars.times(2).equals(tenDollars)).toBe(true);
    });
  });
});
