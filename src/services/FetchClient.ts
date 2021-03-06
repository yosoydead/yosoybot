import fetch from "node-fetch";
import { BOT_NAME } from "../constants";

export interface IFetchClient {
  get(url: string): Promise<any>;
  post(url: string, requestData: any): Promise<any>;
  update(url: string, requestData: any): Promise<any>;
}

export class FetchClient implements IFetchClient {
  get(url: string): Promise<any> {
    return fetch(url);
  }

  post(url: string, requestBody: any): Promise<any> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        "Sender": BOT_NAME
      }
    });
  }

  update(url: string, requestBody: any): Promise<any> {
    return fetch(url, {
      method: "PATCH",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        "Sender": BOT_NAME
      }
    });
  }
}