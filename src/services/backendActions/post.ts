import { IFetchClient } from "../FetchClient";
import { ANIMAL_FACTS_APIS, REPLY_MESSAGES } from "../../constants";

// de aici o sa fac request pentru user/users, comment/comments si altele
export async function postData(client: IFetchClient, url: string, requestData: any) {
  try {
    const request = await client.post(url, requestData);
    const response = await request.json();

    return response;
  } catch(err) {
    return REPLY_MESSAGES.BACKEND_REQUEST_FAIL;
  }
}