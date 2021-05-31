// pur si simplu trebuie sa alcatuiesc o lista de quotes care sa contina:
// author: discordID
// content: continutul mesajului la care s-a dat cu %addQuote
interface IQuotesCache {
  author: string,
  content: string
}

interface IMoneyCache {
  rublerts: number,
  discordServerId: string,
  discordUserId: string,
  discordUsername: string
}

interface ICache {
  // lista din care sa fac update la quotes
  quotes: IQuotesCache[];

  // lista din care sa fac update la useri cu bani
  // trebuie cumva indexata dupa discordUserId sau ceva unic
  bank: IMoneyCache[]
}

type CachePart = "quotes" | "bank";

export default class CacheClient {
  private store: ICache | null = {
    quotes: [],
    bank: []
  };

  getStore(): ICache | null {
    return this.store;
  }

  setStore(updatePart: CachePart, valueToAdd: IQuotesCache | IMoneyCache): void {
    if (updatePart === "quotes") {
      console.log("quotes");
    } else if (updatePart === "bank") {
      console.log("bank");
    }
  }
}