import { Dollar } from "./dollar";

describe("test dollar", () => {
  it("should multiply", () => {
    const five = new Dollar(5);
    five.times(2);

    expect(five.value).toBe(10);
  });
});
