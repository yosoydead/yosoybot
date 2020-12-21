import { IFetchClient } from "../FetchClient";

export async function getMeteo(client: IFetchClient, appKey: string, city: string): Promise<string> {
  try{
    const request = await client.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appKey}&units=metric`);
    const bla = await request.json();
    console.log(bla);
    return "";
  }catch(error) {
    return "";
  }
}