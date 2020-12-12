import fetch from "node-fetch";
import { mocked } from "ts-jest/utils";
import { getAnimalFact } from "../../../src/services/animals/get";
import { ANIMAL_FACTS_APIS } from "../../../src/constants";

jest.mock("node-fetch");

describe("Get random facts about animal tested with mocked fetch module", () => {
  beforeEach(() => {
    mocked(fetch).mockClear();
  });

  it("returns fact about cat from mocked fetch request module", async () => {
    /* 
      * atunci cand folosesti fetch, default o sa fie GET request
      * fiecare request e un PROMISE
      * cand request e ok, fiecare PROMISE, o sa returneze si o functie json care returneaza la randul ei un PROMISE
    */
    mocked(fetch).mockImplementation((): Promise<any> => {
      return Promise.resolve({
        json() {
          return Promise.resolve({data: ["Random fact about cat"]});
        }
      });
    });

    const result = await getAnimalFact(ANIMAL_FACTS_APIS.CATS);

    expect(mocked(fetch).mock.calls.length).toBe(1);
    expect(result).toBeDefined();
    expect(result).toContain("cat");
  });

  it("returns fact about dog from mocked fetch request module", async () => {
    mocked(fetch).mockImplementation((): Promise<any> => {
      return Promise.resolve({
        json() {
          return Promise.resolve({facts: ["Random fact about a dog"]});
        }
      });
    });

    const result = await getAnimalFact(ANIMAL_FACTS_APIS.DOGS);

    expect(mocked(fetch).mock.calls.length).toBe(1);
    expect(result).toBeDefined();
    expect(result).toContain("dog");
  });

  it("returns an empty string if the fetch fails", async () => {
    mocked(fetch).mockImplementation((): Promise<any> => {
      return Promise.reject(new Error("plm"));
    });

    const result = await getAnimalFact(ANIMAL_FACTS_APIS.DOGS);

    expect(mocked(fetch).mock.calls.length).toBe(1);
    expect(result).toBeDefined();
    expect(result).toContain("");
  });
});