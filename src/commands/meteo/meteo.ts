import { getOpenWeatherData } from "../../services/openWeather/get";
import { IFetchClient } from "../../services/FetchClient";
import { MessageEmbed } from "discord.js";

export async function meteo(client: IFetchClient, appKey: string, city: string, countryCode: string = ""): Promise<MessageEmbed> {
  return await getOpenWeatherData(client, appKey, city, countryCode);
}