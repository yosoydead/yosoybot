import { Rejecting, Resolving} from "../../../mocks/fetchClient/MockedFetchClient";
import { cats } from "../../../src/commands/cats/cats";

const spy = jest.fn();
const resolve = new Resolving(spy, "some data");
const reject = new Rejecting(spy);

/* 
  - pentru ca deja am testat separat serviciul de GET, nu mai e nevoie sa testez si aici daca imi returneaza ceva predefinit sau nu
  - trebuie doar sa vad daca da trigger la request sau crapa la request si atat
  - se repeta ca la comanda dogs
*/
describe("cats command", () => {
  beforeEach(() => {
    spy.mockClear();
  });

  it("should trigger a get request through the client parameter that should resolve", async () => {
    expect(spy).toHaveBeenCalledTimes(0);

    cats(resolve);    
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should trigger a get request through the client parameter that should reject with some message", () => {
    expect(spy).toHaveBeenCalledTimes(0);
    
    cats(reject);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("am crapat la request");
  });
});