import { IFetchClient } from "../FetchClient";
import { MessageEmbed, EmbedField } from "discord.js";
import { createMessageEmbed } from "../../utils/createMessageEmbed";
import { createEmbedFields } from "../../utils/createEmbedFields";
import { MESSAGE_COLORS, REPLY_MESSAGES } from "../../constants";
import { weatherIcon } from "./determineIcon";

type Coords = {
  lon: number,
  lat: number
};

type Weather = {
  id: number,
  main: string,
  description: string,
  icon: string
}

type Main = {
  temp: number,
  feels_like: number,
  temp_min: number,
  temp_max: number,
  pressure: number,
  humidity: number
}

type Wind = {
  speed: number,
  deg: number
}

type Sys = {
  type: number,
  id: number,
  country: string,
  sunrise: number,
  sunset: number
}

interface IOpenWeatherData {
  coord: Coords,
  weather: [Weather],
  base: string,
  main: Main,
  wind: Wind,
  timezone: number,
  id: number,
  name: string,
  cod: number,
  sys: Sys,
  dt: number,
}

export async function getOpenWeatherData(client: IFetchClient, appKey: string, city: string, countryCode: string = ""): Promise<MessageEmbed> {
  const url = countryCode === "" 
    ? `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appKey}&units=metric`
    : `http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${appKey}&units=metric`;
  try{
    const request = await client.get(url);
    // weather o sa fie mereu un array
    // pentru vremea curenta, cel mai simplu e sa iei index 
    // cred ca returneaza mereu un singur element in weather/main pentru ca am free tier
    const requestData: IOpenWeatherData = await request.json();
    
    const embedFields: EmbedField[] = createEmbedFields({
      "Temperatura:": `${requestData.main.temp} Celsius`,
      "Se simte": `${requestData.main.feels_like} Celsius`,
      "Minima zilei": `${requestData.main.temp_min} Celsius`,
      "Maxima zilei": `${requestData.main.temp_max} Celsius`
    });
    const icon: string = weatherIcon(requestData.weather[0].id);
    const messageEmbed: MessageEmbed = createMessageEmbed(
      MESSAGE_COLORS.CHANNEL_JOIN,
      `In orasul ${requestData.name} (${requestData.sys.country}): ${icon}`,
      "Cateva detalii",
      embedFields,
      "Yosoybot",
      REPLY_MESSAGES.COMMANDS_FOOTER
    );

    return messageEmbed;
  } catch(error) {
    return createMessageEmbed(
      MESSAGE_COLORS.CHANNEL_LEFT,
      "Vremea :skull:",
      "Poate ai gresit numele orasului, codul tarii sau incearca mai tarziu.",
      [],
      "Yosoybot",
      REPLY_MESSAGES.COMMANDS_FOOTER
    );
  }
}