import { weatherIcon } from "../../../src/services/openWeather/determineIcon";
import { STANDARD_EMOJI } from "../../../src/constants";

// that function only works for the OpenWeather API
// the codes are only valid for this API
// tests will cover the min and max value of the range for the weatherId
  // if the edges are valid, there is no point in testing in-between values
describe("determineIcon()", () => {
  it("should return shrug emoji if the parameter is not within range", () => {
    expect(weatherIcon(1)).toEqual(STANDARD_EMOJI.NU_STIU);
  });

  it("should return clear sky if the parameter is 800", () => {
    expect(weatherIcon(800)).toContain(STANDARD_EMOJI.CER_CURAT);
  });

  it("should return thunderstorm if the code is between 200 and 232", () => {
    expect(weatherIcon(200)).toContain(STANDARD_EMOJI.FURTUNA);
    expect(weatherIcon(232)).toContain(STANDARD_EMOJI.FURTUNA);
  });

  // there is no drizzle emote on discord so i used the rain one
  it("should return cloud rain for drizzle and rain", () => {
    expect(weatherIcon(300)).toContain(STANDARD_EMOJI.BURNITA);
    expect(weatherIcon(321)).toContain(STANDARD_EMOJI.BURNITA);

    //rain
    expect(weatherIcon(500)).toContain(STANDARD_EMOJI.PLOAIE);
    expect(weatherIcon(531)).toContain(STANDARD_EMOJI.PLOAIE);
  });

  it("should return snow if the code is between 600 and 622", () => {
    expect(weatherIcon(600)).toContain(STANDARD_EMOJI.ZAPADA);
    expect(weatherIcon(622)).toContain(STANDARD_EMOJI.ZAPADA);
  });

  // there are a lot of conditions covered by these codes like: sandstorm, ash, etc
  // i only used fog for all
  it("should return fog if the code is between 701 and 781", () => {
    expect(weatherIcon(701)).toContain(STANDARD_EMOJI.CEATA);
    expect(weatherIcon(781)).toContain(STANDARD_EMOJI.CEATA);
  });

  it("should return cloudy if the code is between 801 and 804", () => {
    expect(weatherIcon(801)).toContain(STANDARD_EMOJI.INNORAT);
    expect(weatherIcon(804)).toContain(STANDARD_EMOJI.INNORAT);
  });
});