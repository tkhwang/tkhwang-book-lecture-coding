import { add, multiply } from "../src/example";

describe("Math functions", () => {
  describe("add function", () => {
    it("should add two positive numbers correctly", () => {
      expect(add(1, 2)).toBe(3);
    });

    it("should handle negative numbers", () => {
      expect(add(-1, -3)).toBe(-4);
      expect(add(-5, 3)).toBe(-2);
    });

    it("should handle zero", () => {
      expect(add(0, 5)).toBe(5);
      expect(add(5, 0)).toBe(5);
      expect(add(0, 0)).toBe(0);
    });
  });

  describe("multiply function", () => {
    it("should multiply two positive numbers correctly", () => {
      expect(multiply(2, 3)).toBe(6);
    });

    it("should handle negative numbers", () => {
      expect(multiply(-2, 3)).toBe(-6);
      expect(multiply(-2, -3)).toBe(6);
    });

    it("should handle zero", () => {
      expect(multiply(0, 5)).toBe(0);
      expect(multiply(5, 0)).toBe(0);
    });
  });
});
