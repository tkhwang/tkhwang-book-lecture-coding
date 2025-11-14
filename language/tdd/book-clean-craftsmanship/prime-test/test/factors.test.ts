import { factors } from "../src/factors.js";

describe("Factors test", () => {
    it("should return an empty array if the number is one.", () => {
        const result = factors(1);

        expect(result).toEqual([]);
    });

    it("should return 2 when the number is 2.", () => {
        const result = factors(2);

        expect(result).contains(2);
    });

    it("should return 3 when the number is 3.", () => {
        const result = factors(3);

        expect(result).contains(3);
    });
});
