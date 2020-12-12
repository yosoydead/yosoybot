import getRandom from "../../src/utils/getRandomStringFromArray";

describe("Testing getRandomStringFromArray", () => {
  it("should return a random string from an array of strings", () => {
    const arr: string[] = ["a", "b", "c", "d", "e"];
    const result = getRandom(arr);
    expect(arr).toContain(result);
  });

  it("should not shit itself when receiving an empty array", () => {
    const arr: string[] = [];
    const result = getRandom(arr);
    
    expect(result).toEqual("");
    expect(result).not.toBe(undefined);
  });

  it("should not shit itself when receiving null or undefined param", () => {
    const undef = getRandom(undefined);
    const nul = getRandom(null);

    expect(undef).toEqual("");
    expect(nul).toEqual("");
  });
});