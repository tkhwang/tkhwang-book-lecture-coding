import { Calculator } from "./Calculator";

test("should calculate the sum of two numbers", () => {
  const calculator = new Calculator();
  expect(calculator.sum(2, 3)).toBe(5);
});
