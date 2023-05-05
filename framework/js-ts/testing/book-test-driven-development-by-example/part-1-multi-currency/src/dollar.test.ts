import { Dollar } from "./dollar";

describe("dollar class", () => {
  it("multiply() should work correctly.", () => {
    const five = new Dollar(5);
    let product = five.times(2);

    expect(product.amount).toBe(10);

    product = five.times(3);
    expect(product.amount).toBe(15);
  });

  it("equals() should work correctly.", () => {
    expect(new Dollar(5).equals(new Dollar(5))).toBe(true);

    expect(new Dollar(5).equals(new Dollar(6))).toBe(false);

    expect(() => {
      new Dollar(5).equals(5);
    }).toThrowError(Error);
  });
});
