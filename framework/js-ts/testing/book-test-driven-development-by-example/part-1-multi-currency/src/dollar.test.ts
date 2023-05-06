import { Dollar } from "./dollar";

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
});

describe("franc class", () => {
  it("multiply() should work correctly.", () => {
    const five = new Franc(5);

    expect(new Franc(10).equals(five.times(2))).toBe(true);
    expect(new Franc(15).equals(five.times(3))).toBe(true);
  });
});
