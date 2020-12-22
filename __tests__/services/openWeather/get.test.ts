import { getOpenWeatherData, IOpenWeatherData } from "../../../src/services/openWeather/get";
import { Rejecting, Resolving } from "../../../mocks/fetchClient/MockedFetchClient";
import { IFetchClient } from "../../../src/services/FetchClient";


const dummyResponse: IOpenWeatherData = {
  "coord": {
    "lon": -122.08,
    "lat": 37.39
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 282.55,
    "feels_like": 281.86,
    "temp_min": 280.37,
    "temp_max": 284.26,
    "pressure": 1023,
    "humidity": 100
  },
  "wind": {
    "speed": 1.5,
    "deg": 350
  },
  "dt": 1560350645,
  "sys": {
    "type": 1,
    "id": 5122,
    "country": "US",
    "sunrise": 1560343627,
    "sunset": 1560396563
  },
  "timezone": -25200,
  "id": 420006353,
  "name": "Mountain View",
  "cod": 200
};                       
const resolveSpy = jest.fn((param: string) => {
  return Promise.resolve({
    json() {
      return Promise.resolve(dummyResponse);
    }
  });
});

const rejectSpy = jest.fn();

const resolve: IFetchClient = new Resolving(resolveSpy, "random fact about cats");
const reject: IFetchClient = new Rejecting(rejectSpy);

describe("OpenWeather API get service", () => {
  beforeEach(() => {
    rejectSpy.mockClear();
    resolveSpy.mockClear();
  });

  it("should return an empty string if the fetch fails", async () => {
    expect(rejectSpy).toHaveBeenCalledTimes(0);
    const result = await getOpenWeatherData(reject, "api_key", "fjdbsfls");

    expect(rejectSpy).toHaveBeenCalledTimes(1);
    expect(rejectSpy).toHaveBeenCalledWith("am crapat la request");
    expect(result.title).toEqual("Vremea :skull:");
  });

  it("should return an actual response with weather data for a given city", async () => {
    expect(resolveSpy).toHaveBeenCalledTimes(0);
    const result = await getOpenWeatherData(resolve, "api_key", "fjdbsfls");
    
    expect(resolveSpy).toHaveBeenCalledTimes(1);
    expect(result.title).toContain(":sun_with_face:");
    expect(result.fields[0].value).toContain(dummyResponse.main.temp);
  });
});