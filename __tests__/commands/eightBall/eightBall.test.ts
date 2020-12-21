import func, { eightBall } from "../../../src/commands/eightBall/eightBall";

describe("8ball command", () => {
  it("should return a random string", () => {
    const result = func();

    expect(eightBall).toContain(result);
  });
});