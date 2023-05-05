import { Dollar } from "./dollar";

describe("dollar class", () => {
  it("multiply() should work correctly.", () => {
    const five = new Dollar(5);

    five.times(2);
    expect(five.amount).toBe(10);

    five.times(3);
    expect(five.amount).toBe(15);
  });

  it("equals() should work correctly.", () => {
    expect(new Dollar(5).equals(new Dollar(5))).toBe(true);
  });
});
