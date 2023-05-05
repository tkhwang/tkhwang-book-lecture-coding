describe("test dollar", () => {
  it("should multiply", () => {
    const five = new Dollar(5);
    five.times(2);

    expect(five.amount).toBe(10);
  });
});
