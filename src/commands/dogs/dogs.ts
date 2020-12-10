import { getAnimalFact } from "../../services/animals/get";
import { ANIMAL_FACTS_APIS } from "../../constants";

export async function dogs(): Promise<string> {
  return await getAnimalFact(ANIMAL_FACTS_APIS.DOGS);
}
