import { getAnimalFact } from "../../services/animals/get";
import { ANIMAL_FACTS_APIS } from "../../constants";
import { IFetchClient } from "../../services/FetchClient";

export async function cats(client: IFetchClient): Promise<string> {
  return await getAnimalFact(client, ANIMAL_FACTS_APIS.CATS);
}