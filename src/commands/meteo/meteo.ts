import { getMeteo } from "../../services/openWeather/get";
import { IFetchClient } from "../../services/FetchClient";

export async function meteo(client: IFetchClient, appKey: string, city: string): Promise<string> {
  return await getMeteo(client, appKey, city);
}