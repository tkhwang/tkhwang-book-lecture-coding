import { sort } from "../src/sort.js";

describe('Sorting numbers', () => {
  it('should return an empty array when given an empty array', () => {
    expect(sort([])).toEqual([]);
  });

  it('should return a single number when given a single number', () => {
    expect(sort([1])).toEqual([1]);
  });
})