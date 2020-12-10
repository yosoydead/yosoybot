import { ascii_art } from "./ascii_art";
import getRandomString from "../../utils/getRandomStringFromArray";

export default (): string => {
  return getRandomString(ascii_art);
};