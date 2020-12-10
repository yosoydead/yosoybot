import { getAnimalFact } from "../../services/animals/get";
import { ANIMAL_FACTS_APIS } from "../../constants";

export async function cats(): Promise<string> {
  return await getAnimalFact(ANIMAL_FACTS_APIS.CATS);
}