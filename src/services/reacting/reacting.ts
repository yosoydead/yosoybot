import { IFetchClient } from "../FetchClient";
import { ANIMAL_FACTS_APIS } from "../../constants";
import { postData } from "./post";
import { updateData } from "./update";

export async function addComment(client: IFetchClient, url: string, requestData: any) {
  return await postData(client, url, requestData);
}

export async function addMoney(client: IFetchClient, url: string, requestData: any) {
  return await updateData(client, url, requestData);
}
