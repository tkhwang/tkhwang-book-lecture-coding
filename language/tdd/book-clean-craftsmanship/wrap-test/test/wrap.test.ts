import { describe, it, expect } from 'vitest';
import { wrap } from '../src/wrap.js';

describe("Wrap test", () => {
  it("should return an empty string for empty input", () => {
    const result = wrap("", 1);

    expect(result).toBe("");
  });

  it("should return the same text for column width 1", () => {
    const text = "x";
    const result = wrap(text, 1);

    expect(result).toBe(text);
  });

  it("should return proper text for column width 1", () => {
    const text = "xx";
    const result = wrap(text, 1);

    expect(result).toBe("x\nx");
  });

  it("should return proper text for column width 1", () => {
    const text = "xxx";
    const result = wrap(text, 1);

    expect(result).toBe("x\nx\nx");
  });

  it("should return proper text having space.", () => {
    const text = "x x";
    const result = wrap(text, 1);

    expect(result).toBe("x\nx");
  });

  it("should return proper text having space.", () => {
    const text = "x x";
    const result = wrap(text, 21ㅋ₩₩);

    expect(result).toBe("x\nx");
  });

  it("should return the same text which has width less than column width", () => {
    const text = "Simple";

    expect(wrap(text, 10)).toBe(text);
  })
})