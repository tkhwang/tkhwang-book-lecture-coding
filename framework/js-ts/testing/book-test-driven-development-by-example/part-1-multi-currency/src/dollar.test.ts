import { Dollar } from "./dollar";
import { Franc } from "./franc";

describe("dollar class", () => {
  it("multiply() should work correctly.", () => {
    const five = new Dollar(5);

    expect(new Dollar(10).equals(five.times(2))).toBe(true);
    expect(new Dollar(15).equals(five.times(3))).toBe(true);
  });

  it("equals() should work correctly.", () => {
    expect(new Dollar(5).equals(new Dollar(5))).toBe(true);

    expect(new Dollar(5).equals(new Dollar(6))).toBe(false);

    expect(() => {
      new Dollar(5).equals(5);
    }).toThrowError(Error);
  });

  it("Equality test", () => {
    expect(new Dollar(5).equals(new Dollar(5))).toBe(true);
    expect(new Dollar(5).equals(new Dollar(6))).toBe(false);
    expect(() => {
      new Dollar(5).equals(new Franc(5));
    }).toThrowError(Error);
  });
});
