import { ANIMAL_FACTS_APIS } from "../../src/constants";
import { IFetchClient } from "../../src/services/FetchClient";

export class Resolving implements IFetchClient {
  // folosesc returnData doar la functiile spy care chiar returneaza ceva anume
  // exemplu in services/get
  constructor(public spyFunction: any, private returnData: string) { console.log("constructor pentru resolving class"); }
  get(url: ANIMAL_FACTS_APIS): Promise<any> {
    return Promise.resolve(this.spyFunction(this.returnData));
  } 
}

export class Rejecting implements IFetchClient {
  constructor(public spyFunction: any) { console.log("constructor pentru rejecting class"); }
  get(url: ANIMAL_FACTS_APIS): Promise<any> {
    this.spyFunction("am crapat la request");
    return Promise.reject(new Error("plm"));
  }
}