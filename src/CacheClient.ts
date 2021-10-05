import { ICacheClient, ICacheSchema, BackendComment, BackendTransaction } from "./types";
export default class CacheClient implements ICacheClient {
  private store: ICacheSchema = {
    comments: [],
    transactions: []
  };

  private secondaryStore: ICacheSchema = {
    comments: [],
    transactions: []
  };

  private isUpdateOngoing = false;

  constructor() {
    console.log("cache client init successfully");
  }

  clearSecondaryComments(): void {
    this.secondaryStore.comments = [];
  }

  clearSecondaryTransactions(): void {
    this.secondaryStore.transactions = [];
  }

  clearMainCache(): void {
    this.store.comments = [];
    this.store.transactions = [];
  }

  clearMainComments(): void {
    this.store.comments = [];
  }

  clearMainTransactions(): void {
    this.store.transactions = [];
  }

  getCurrentCache(): ICacheSchema {
    return this.store;
  }

  // vreau sa stiu daca exista vreo ceva in cache sau nu
  isCacheEmpty(): boolean {
    return this.store.comments.length === 0 && this.store.transactions.length === 0;
  }

  lockStore(): void {
    this.isUpdateOngoing = true;
  }

  //functia asta se apeleaza atunci cand se termina bulk update si
  //trebuie sa fac sync dintre main store si secondary store
  //apoi fac clear in secondary store
  syncBetweenSecondaryAndMainStore(): void {
    this.secondaryStore.transactions.forEach((t) => {
      this.store.transactions.push(t);
    });
    this.secondaryStore.transactions = [];

    this.secondaryStore.comments.forEach((c) => {
      this.store.comments.push(c);
    });
    this.secondaryStore.comments = [];
  }

  unlockStore(): void {
    this.isUpdateOngoing = false;
  }

  // asta e doar in cazul extrem in care nu pot sa trimit un comment in baza de date
  // o sa stea aici pana trimit in DB tot ce e in cache
  updateCommentStore(comment: BackendComment): void {
    console.log("cumva nu am reusit sa trimit comment asa ca il adaug in cache momentan");
    if (this.isUpdateOngoing === false) {
      this.store.comments.push(comment);
    } else {
      this.secondaryStore.comments.push(comment);
    }
  }

  // asta e ca sa adun tranzactii mai multe, in loc sa fac un request pentru fiecare in parte
  // in cazul in care o sa crape iar requestul, tranzactiile o sa ramana aici
  updateTransactionStore(transaction: BackendTransaction[]): void {
    if (this.isUpdateOngoing === false) {
      this.store.transactions.push(transaction);
    } else {
      this.secondaryStore.transactions.push(transaction);
    }
  }
}