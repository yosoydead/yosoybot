export const BOT_NAME = "Yosoybot";

export const REPLY_MESSAGES = {
  ALO: "Aaalo",
  BACKEND_REQUEST_FAIL: "Request-ul catre backend a esuat.",
  CHANNEL_ENTRY_LOG: "Canal pe care am intrat",
  COMMANDS_DESCRIPTION: "Here is a list of all my current commands:",
  COMMANDS_FOOTER: "Much love. @yosoydead#9299 for other questions.",
  COMMANDS_TITLE: `Hi. I am ${BOT_NAME}!`,
  DB_BULK_UPDATE: "Am reusit sa trimit tot ce era in cache spre baza de date si sa le inserez cu succes",
  EMPTY_EIGHT_BALL: "Nu fi nesi si adauga o intrebare ;)",
  EMPTY_ANIMAL_FACT: "The request failed. Check if the API is still available. :)",
  GIVE_EVERYONE_MONEY_ERROR: "Ceva nu e ok. Nu am reusit sa culeg toti userii. Incearca mai tarziu sau da bani doar catorva.",
  GIVE_MONEY_FORMAT: "Comanda trebuie sa fie de formatul: %give @user 50",
  GIVEAWAY_FORMAT: "Format incorect. Comanda trebuie sa fie: %giveaway <cati useri> <ce suma> cu spatiu intre fiecare caracter.",
  MESSAGE_NOT_FOUND: "Ceva nu e in regula. Nu am putut gasi mesajul pentru a fi trimis mai departe.",
  NO_AUTHORITY: "Nu ai dreptul sa folosesti comanda asta",
  PONG: "PONG",
  SERVER_ENTERED: "Salut",
  SERVER_KICKED: "Am fost dat afara",
  UNKNOWN_COMMAND: "Nu stiu comanda :(",
  USERS_ADDED: "Am reusit sa adaug userii curenti si am adaugat tuturor 10 rublerts din partea casei.",
};

export const YOSOYDB_ERROR_MESSAGES = {
  RANDOM_QUOTE: "Nu am putut apela baza de date pentru un random quote.",
  ADD_QUOTE: "Nu am putut apela baza de date pentru a insera quote. Mesajul a fost adaugat in cache si o sa fie trimis spre backend mai tarziu.",
  ADD_TRANSACTIONS: "Nu am putut apela baza de date pentru a insera tranzactiile de pana acum.",
  BULK_UPDATE_TRANSACTIONS: "Ceva nu e in regula. Nu am putut salva tranzactiile. Vor fi pastrate in cache si trimise urmatoarea data.",
  BULK_UPDATE_COMMENTS: "Ceva nu e in regula. Nu am putut salva comentariile care o ajuns in cache. Vor fi pastrate in cache si trimise urmatoarea data.",
  BULK_UPDATE_FAIL: "Nu am putut adauga niste date in baza de date. O sa ramana in cache pana la urmatorul update.",
  REMOVE_QUOTE: "Nu am putut sa apelez baza de date pentru a sterge comentariul. Vorbeste cu Bogdan."
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
  WAKEUP_CRONJOB: "785846537543876639",
  ERROR_LOGS: "785130953525559307"
};

export const GUILD_IDS = {
  YOSOYDEAD_SERVER: "781108831421333535",
  GOKU_SERVER: "672558611037159442"
};

export const USER_IDS = {
  YOSOYDEAD: "405081094057099276",
  GOKU: "291235021367279617",
  YOSOYBOT: "784135061225734184",
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
  DOGS = "http://dog-api.kinduff.com/api/facts",
}

export enum BACKEND_BASE_URLS {
  LOCAL = "http://localhost:3000/test",
  LOCAL_GOKU = "http://localhost:3000/goku",
  PRODUCTION = "http://157.230.99.199:3000/goku"
}

export const BACKEND_ROUTES = {
  "DELETE": {},
  "GET": {
    // comments
    randomQuote: "/comment/random",

    // users
    userData: "/user/get/", // needs an ID
    allUsersData: "/users",
    getUsersBank: "/transactions/getUsersBank",
    getUserTransactions: "/transactions/getUserTransactions/", // needs an id
    getUserBank: "/user/getBank/" // needs an id
  },
  "PATCH": {
    //comments

    //users
    rewardUser: "/user/reward",
    rewardMultipleUsers: "/users/reward"
  },
  "POST": {
    // comments
    addComment: "/comment",
    removeComment: "/removeComment",
    addMultipleComments: "/comments",

    // users
    addUser: "/user/add",
    addMultipleUsers: "/users",
    addTransactions: "/transactions/add"
  },
  "PUT": {},
  "UPDATE": {},
};