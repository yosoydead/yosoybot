// import fetch from "node-fetch";
// import { mocked } from "ts-jest/utils";
import { getAnimalFact } from "../../../src/services/animals/get";
import { ANIMAL_FACTS_APIS } from "../../../src/constants";
import { IFetchClient } from "../../../src/services/FetchClient";
import { Rejecting, Resolving } from "../../../mocks/fetchClient/MockedFetchClient";

// jest.mock("node-fetch");
const resolveSpy = jest.fn((param: string) => {
  return Promise.resolve({
    json() {
      return Promise.resolve({data: [param]});
    }
  });
});
const rejectSpy = jest.fn();

const resolve: IFetchClient = new Resolving(resolveSpy, "random fact about cats");
const reject: IFetchClient = new Rejecting(rejectSpy);

describe("Get random facts about animal tested with mocked fetch module", () => {
  beforeEach(() => {
    // mocked(fetch).mockClear();
    rejectSpy.mockClear();
    resolveSpy.mockClear();
  });

  it("returns fact about cat from mocked fetch request module", async () => {
    /* 
      * atunci cand folosesti fetch, default o sa fie GET request
      * fiecare request e un PROMISE
      * cand request e ok, fiecare PROMISE, o sa returneze si o functie json care returneaza la randul ei un PROMISE
      * o modalitate prin care sa faci mock la un node-fetch. il las aici in orice caz pentru viitor
    */
    // mocked(fetch).mockImplementation((): Promise<any> => {
    //   return Promise.resolve({
    //     json() {
    //       return Promise.resolve({data: ["Random fact about cat"]});
    //     }
    //   });
    // });
    expect(resolveSpy).toHaveBeenCalledTimes(0);
    const result = await getAnimalFact(resolve, ANIMAL_FACTS_APIS.CATS);

    expect(result).toBeDefined();
    expect(result).toContain("random fact");
    expect(resolveSpy).toHaveBeenCalledTimes(1);
  });

  it("returns an empty string if the fetch fails", async () => {
    // asta e un mod prin care sa fac mock la un promise.reject
    // mocked(fetch).mockImplementation((): Promise<any> => {
    //   return Promise.reject(new Error("plm"));
    // });

    const result = await getAnimalFact(reject, ANIMAL_FACTS_APIS.DOGS);
    expect(result).toBeDefined();
    expect(result).toEqual("");
    expect(rejectSpy).toHaveBeenCalledTimes(1);
    expect(rejectSpy).toHaveBeenCalledWith("am crapat la request");
  });

  it("should return a fact about dogs if i give it the right parameter", async () => {
    //the dogs api returns an object with a FACTS array, not DATA
    const spy = jest.fn((param: string) => {
      return Promise.resolve({
        json() {
          return Promise.resolve({facts: [param]});
        }
      });
    });
    const dogs = new Resolving(spy, "random dog fact");
    const result = await getAnimalFact(dogs, ANIMAL_FACTS_APIS.DOGS);

    expect(result).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("random dog fact");
  });
});