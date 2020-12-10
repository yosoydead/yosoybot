export const enum CommandNames {
  CATS_FACT = "cats",
  COMMANDS = "commands",
  DEPRESIE = "depresie",
  DOGS_FACT = "dogs",
  EIGHT_BALL =  "8ball",
  PING = "ping",
  PONG = "pong",
  WEEB = "weeb"
}

export type TypeCommandObject = {[name: string]: string};

export const CommandsObject: TypeCommandObject = {
  "!8Ball": "The classic 8ball game. Ask a question and get a 'random' response to it.",
  "!ping": "The bot responds with pong.", 
  "!pong": "The bot responds with ping.",
  "!cats": "Get a random fact about cats.",
  "!dogs": "Get a random fact about dogs."
};