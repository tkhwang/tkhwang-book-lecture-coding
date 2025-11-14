import { sort } from "../src/sort.js";

describe('Sorting numbers', () => {
  it('should return an empty array when given an empty array', () => {
    expect(sort([])).toEqual([]);
  });

  it('should return a single number when given a single number', () => {
    expect(sort([1])).toEqual([1]);
  });

  it('should return a sorted array when input length is 2 and it is already sorted.', () => {
    expect(sort([1, 2])).toEqual([1, 2]);
  });

  it('should return a sorted array when input length is 2 and it is not sorted.', () => {
    expect(sort([2, 1])).toEqual([1, 2]);
  });
})