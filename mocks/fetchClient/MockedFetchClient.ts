import { ANIMAL_FACTS_APIS } from "../../src/constants";
import { IFetchClient } from "../../src/services/FetchClient";

export class Resolving implements IFetchClient {
  constructor(private spyFunction: any) { console.log("constructor pentru resolving class"); }
  get(url: ANIMAL_FACTS_APIS): Promise<any> {
    return Promise.resolve(this.spyFunction());
  } 
}

export class Rejecting implements IFetchClient {
  constructor(private spyFunction: any) { console.log("constructor pentru rejecting class"); }
  get(url: ANIMAL_FACTS_APIS): Promise<any> {
    this.spyFunction("am crapat la request");
    return Promise.reject(new Error("plm"));
  }
}