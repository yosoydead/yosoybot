import fetch, {Response} from "node-fetch";

//api-ul asta returneaza un obiect cu o proprietate numita DATA
//data e un array cu un singur element in el
const url = "https://meowfacts.herokuapp.com/";
interface IRequestData {
  data: string[]
}

export async function cats(): Promise<string> {
  try{
    const request: Response = await fetch(url);
    const requestData: IRequestData = await request.json();
    return requestData.data[0];
  } catch(err) {
    console.log(err);
    return "";
  }
}