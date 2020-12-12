import { getAnimalFact } from "../../../src/services/animals/get";
import { ANIMAL_FACTS_APIS } from "../../../src/constants";
import { mocked } from "ts-jest/utils";

jest.mock("../../../src/services/animals/get");

const mockedRequest = mocked(getAnimalFact, true);
// let mockResolve: jest.Mock<Promise<string>, [string, ANIMAL_FACTS_APIS]>; 

describe("Getting random fact about animals from an api", () => {
  beforeEach(() => {
    mockedRequest.mockClear();
  });

  it("mocked the promise resolve", async () => {
    const resolve = jest.fn((url: ANIMAL_FACTS_APIS) => Promise.resolve("random fact about url param"));
    mockedRequest.mockImplementation(resolve);
    const mockresult = await mockedRequest(ANIMAL_FACTS_APIS.CATS);
    
    expect(resolve).toHaveBeenCalledTimes(1);
    expect(resolve).toHaveBeenCalledWith(ANIMAL_FACTS_APIS.CATS);
    expect(resolve).not.toHaveBeenCalledWith(ANIMAL_FACTS_APIS.DOGS);
    expect(mockresult).toContain("random fact");
  });

  it("mocked the promise reject", async () => {
    const reject = jest.fn(() => Promise.reject(""));
    mockedRequest.mockImplementation(reject);
    await mockedRequest(ANIMAL_FACTS_APIS.DOGS)
      .catch(err => {
        expect(reject).toHaveBeenCalledTimes(1);
        expect(err).toEqual("");
        expect(reject).toHaveBeenCalledWith(ANIMAL_FACTS_APIS.DOGS);
      });
  });
});