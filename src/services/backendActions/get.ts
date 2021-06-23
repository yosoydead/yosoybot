import { IFetchClient } from "../FetchClient";
import { ANIMAL_FACTS_APIS, REPLY_MESSAGES } from "../../constants";

// de aici o sa fac request pentru user/users, comment/comments si altele
export async function getData(client: IFetchClient, url: string) {
  try {
    const request = await client.get(url);
    const requestData = await request.json();

    return requestData;
  } catch(err) {
    return REPLY_MESSAGES.BACKEND_REQUEST_FAIL;
  }
}