export const REPLY_MESSAGES = {
  ALO: "Aaalo",
  CHANNEL_ENTRY_LOG: "Canal pe care am intrat",
  COMMANDS_DESCRIPTION: "Here is a list of all my current commands:",
  COMMANDS_FOOTER: "Much love. @yosoydead#9299 for other questions.",
  COMMANDS_TITLE: "Hi. I am yosoybot!",
  EMPTY_EIGHT_BALL: "Nu fi nesi si adauga o intrebare ;)",
  EMPTY_ANIMAL_FACT: "The request failed. Check if the API is still available. :)",
  PONG: "PONG",
  SERVER_ENTERED: "Salut",
  SERVER_KICKED: "Am fost dat afara",
  UNKNOWN_COMMAND: "Nu stiu comanda :(",
};

export const enum REACT_EMOJI {
  RUBLERT =  "rubl",
  STITCH = "stitch",
}

export const enum STANDARD_EMOJI {
  BURNITA = ":cloud_rain:",
  CEATA = ":foggy:",
  CER_CURAT = ":sun_with_face:",
  FURTUNA = ":thunder_cloud_rain:",
  INNORAT = ":white_sun_cloud:",
  NU_STIU = ":man_shrugging:",
  PLOAIE = ":cloud_rain:",
  ZAPADA = ":cloud_snow:",
}

export const MY_CHANNEL_IDS = {
  INTRAT_PE_SERVERE: "785131037139140641",
  GENERAL: "781108831421333538",
  LOG_ERORI: "785130953525559307",
  YOSOYDEAD_SERVER: "781108831421333535",
  WAKEUP_CRONJOB: "785846537543876639"
};

//colorez MessageEmbed
export enum MESSAGE_COLORS {
  DEFAULT = "#3f51b5",
  CHANNEL_LEFT = "#dd2c00",
  CHANNEL_JOIN = "#00c853"
}

// folosita pentru guildAdd/guildRemove
export enum SERVER_ACTION {
  JOIN,
  KICK
}

export enum ANIMAL_FACTS_APIS {
  CATS = "https://meowfacts.herokuapp.com/",
  DOGS = "http://dog-api.kinduff.com/api/facts"
}