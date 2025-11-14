import { sortNumbers } from "../src/sortNumbers.js";

describe('Sorting numbers', () => {
  it('should return an empty array when given an empty array', () => {
    expect(sortNumbers([])).toEqual([]);
  });
})