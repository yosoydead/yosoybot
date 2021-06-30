export const enum CommandNames {
  ADD_QUOTE = "addQuote",
  CATS_FACT = "cats",
  COMMANDS = "commands",
  DEPRESIE = "depresie",
  DOGS_FACT = "dogs",
  EIGHT_BALL =  "8ball",
  GIVE_MONEY = "give",
  PING = "ping",
  PONG = "pong",
  RANDOM_QUOTE = "quote",
  WEEB = "weeb",
  METEO = "meteo",
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
  "@<person> <anything you want> weeb": "Tags that person and sends an ascii weeb stuff." 
};