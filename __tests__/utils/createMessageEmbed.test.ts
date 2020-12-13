import { createMessageEmbed } from "../../src/utils/createMessageEmbed";
import { MESSAGE_COLORS } from "../../src/constants";

describe("createMessageEmbed()", () => {
  it("should consider empty strings from parameters", () => {
    const result = createMessageEmbed(MESSAGE_COLORS.DEFAULT, "", "", [], "", "");
    const colorHex = parseInt(MESSAGE_COLORS.DEFAULT.substring(1), 16);
    
    expect(result).toBeDefined();
    expect(result.title).toContain("unknown");

    expect(result.color).toEqual(colorHex);
  });

  it("should return a MessageEmbed object if parameters are ok", () => {
    const result = createMessageEmbed(
      MESSAGE_COLORS.CHANNEL_LEFT,
      "yosoydead",
      "writting unit tests",
      [],
      "yosoydead",
      "footer text"
    );
    const colorHex = parseInt(MESSAGE_COLORS.CHANNEL_LEFT.substring(1), 16);

    expect(result).toBeDefined();
    expect(result.title).toEqual("yosoydead");
    expect(result.color).toEqual(colorHex);
    expect(result.fields).toEqual([]);
  });
});