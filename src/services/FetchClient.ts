import fetch, { Response } from "node-fetch";
import { ANIMAL_FACTS_APIS } from "../constants";

export interface IFetchClient {
  get(url: ANIMAL_FACTS_APIS): Promise<Response>;
}

export class FetchClient implements IFetchClient {
  get(url: string): Promise<Response> {
    return fetch(url);
  }
}