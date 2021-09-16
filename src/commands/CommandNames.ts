export const enum CommandNames {
  ADD_QUOTE = "addQuote",
  CATS_FACT = "cats",
  COMMANDS = "commands",
  DEPRESIE = "depresie",
  DOGS_FACT = "dogs",
  EIGHT_BALL =  "8ball",
  FORCE_UPDATE_DB = "forceUpdate",
  GIVE_MONEY = "give",
  METEO = "meteo",
  PING = "ping",
  PONG = "pong",
  RANDOM_QUOTE = "quote",
  TRANSACTION_HISTORY = "transactions",
  WEEB = "weeb",
  WEATHER = "weather",
}

export type TypeCommandObject = {[name: string]: string};

export const CommandsObject: TypeCommandObject = {
  "%8Ball": "The classic 8ball game. Ask a question and get a 'random' response to it.",
  "%ping": "The bot responds with pong.", 
  "%pong": "The bot responds with ping.",
  "%cats": "Get a random fact about cats.",
  "%dogs": "Get a random fact about dogs.",
  "%meteo or %weather <city name> --<country code>": "Get weather data about a certain city.",
  "@<person> <anything you want> weeb": "Tags that person and sends an ascii weeb stuff.",
  "%give @<person/here> <number>": "Yosoydead sau Goku o sa poata adauga fonduri cuiva",
  "%forceUpdate": "Yosoydead sau Goku pot porni un update fortat pentru baza de date. O sa fie trimise toate tranzactiile stocate in cache.",
  "%transactions": "Acel user o sa primeasca un istoric al tranzactiilor. By default, o sa dea ultimele 10 tranzactii. Foloseste %transactions <numar> pt un anumit numar sau %transactions all pentru o lista completa a tranzactiilor."
};