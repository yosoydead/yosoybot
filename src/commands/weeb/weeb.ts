import { ascii_art } from "./ascii_art";
import getRandomString from "../../utils/getRandomStringFromArray";

interface IContainsTagAndWeeb {
  weeb: boolean;
  tagging: boolean;
  tag: string;
}

export function weeb(): string {
  return getRandomString(ascii_art);
}

export function doesMessageContainWeebAndTag(splitMessage: string[]): IContainsTagAndWeeb {
  const containsWeebAndTag: IContainsTagAndWeeb = {
    tagging: false,
    weeb: false,
    tag: ""
  };

  for(let i = 0; i < splitMessage.length; i++) {
    const currentValue: string = splitMessage[i];
    if (currentValue.toLowerCase() === "weeb" && containsWeebAndTag.weeb === false) containsWeebAndTag.weeb = true;
    if ((currentValue.substring(0, 3) === "<@!" && currentValue[currentValue.length -1] === ">") && containsWeebAndTag.tagging === false) {
      containsWeebAndTag.tagging = true;
      containsWeebAndTag.tag = splitMessage[i];
    }
    console.log(containsWeebAndTag);
    
    if (containsWeebAndTag.tagging === true && containsWeebAndTag.weeb === true) return containsWeebAndTag;
  }

  return containsWeebAndTag;
}