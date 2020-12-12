import { weeb, doesMessageContainWeebAndTag} from "../../../src/commands/weeb/weeb";
import { ascii_art } from "../../../src/commands/weeb/ascii_art";

describe("Testing the weeb command and if the message contains a tag or not", () => {
  it("weeb() will return a ascii anime character", () => {
    const result = weeb();

    expect(ascii_art).toContain(result);
  });

  it("doesMessageContainWeebAndTag() returns a default object if the parameter array doesn't contain a tag or the word weeb", () => {
    const emptyArgument = doesMessageContainWeebAndTag([]);
    const noTagOrWeeb = doesMessageContainWeebAndTag(["salut", "cf"]);

    expect(emptyArgument.tagging).toBeFalsy();
    expect(emptyArgument.weeb).toBeFalsy();

    expect(noTagOrWeeb.weeb).toBeFalsy();
    expect(noTagOrWeeb.tagging).toBeFalsy();
  });

  it("doesMessageContainWeebAndTag() detects whether there is a tag or the word weeb, but not both", () => {
    const withWeeb = doesMessageContainWeebAndTag(["you", "fucking", "weeb"]);
    const tagWithNoWeeb = doesMessageContainWeebAndTag(["salut", "cf", "<@!455464565161>"]);

    expect(withWeeb.weeb).toBeTruthy();
    expect(withWeeb.tagging).toBeFalsy();

    expect(tagWithNoWeeb.tag).toContain("<@");
    expect(tagWithNoWeeb.tagging).toBeTruthy();
  });

  it("doesMessageContainWeebAndTag() detects whether there is a tag and the word weeb", () => {
    const result = doesMessageContainWeebAndTag(["hei", "you", "fucking", "weeb", "<@564646465>"]);

    expect(result.weeb).toBeTruthy();
    expect(result.tagging).toBeTruthy();
    expect(result.tag).toContain("<@56");
  });
});