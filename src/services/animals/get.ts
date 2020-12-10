import { ANIMAL_FACTS_APIS } from "../../constants";
import fetch, {Response} from "node-fetch";

interface IRequestData {
  // pentru cats api
  data: string[];

  //pentru dogs api
  facts: string[];
}

export async function getAnimalFact(animalUrl: ANIMAL_FACTS_APIS): Promise<string> {
  try{
    const request: Response = await fetch(animalUrl);
    const requestData: IRequestData = await request.json();

    if (animalUrl === ANIMAL_FACTS_APIS.CATS) return requestData.data[0];
    else return requestData.facts[0];
  } catch(err) {
    return "";
  }
}