import { factors } from "../src/factors.js";

describe("Factors test", () => {
    it("should return an empty array if the number is one.", () => {
        const result = factors(1);
        expect(result).toEqual([]);
    });

    it("should return the prime itself when the input is prime.", () => {
        expect(factors(13)).toEqual([13]);
    });

    it("should return repeated prime factors for composite numbers.", () => {
        expect(factors(12)).toEqual([2, 2, 3]);
    });

    it("should ignore non-integers and numbers below 2.", () => {
        expect(factors(0)).toEqual([]);
        expect(factors(1.5)).toEqual([]);
    });
});
