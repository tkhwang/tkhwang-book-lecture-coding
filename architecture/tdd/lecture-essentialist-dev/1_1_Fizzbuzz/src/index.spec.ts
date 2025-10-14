import { fizzbuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {
    it("should return string type", () => {
        const result = fizzbuzz(1);

        expect(typeof result).toBe("string");
    })

});
