import { Dollar } from "./dollar";
import { Franc } from "./franc";

describe("franc class", () => {
  it("multiply() should work correctly.", () => {
    const five = new Franc(5);

    expect(new Franc(10).equals(five.times(2))).toBe(true);
    expect(new Franc(15).equals(five.times(3))).toBe(true);
  });

  it("Equality test", () => {
    expect(new Franc(5).equals(new Franc(5))).toBe(true);
    expect(new Franc(5).equals(new Franc(6))).toBe(false);
    expect(() => {
      new Dollar(5).equals(new Franc(5));
    }).toThrowError(Error);
  });
});
