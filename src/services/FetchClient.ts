import fetch from "node-fetch";
import { ANIMAL_FACTS_APIS } from "../constants";

export interface IFetchClient {
  get(url: ANIMAL_FACTS_APIS): Promise<any>;
}

export class FetchClient implements IFetchClient {
  get(url: string): Promise<any> {
    return fetch(url);
  }
}