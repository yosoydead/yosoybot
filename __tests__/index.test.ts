describe("index", () => {
  test("true", () => {
    expect(2+2).toEqual(4);
  });

  test("false", () => {
    expect(2+2).not.toEqual(5);
  });
});