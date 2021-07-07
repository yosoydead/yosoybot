import { BackendComment, BackendTransaction, ICacheClient, ICacheSchema } from "./types";

type CachePart = "comments" | "transactions";

export default class CacheClient implements ICacheClient {
  private store: ICacheSchema = {
    comments: [],
    transactions: []
  };

  constructor() {
    console.log("cache client init successfully");
  }

  // vreau sa stiu daca exista vreo ceva in cache sau nu
  isCacheEmpty(): boolean {
    return this.store.comments.length === 0 && this.store.transactions.length === 0;
  }

  // asta e doar in cazul extrem in care nu pot sa trimit un comment in baza de date
  // o sa stea aici pana trimit in DB tot ce e in cache
  updateCommentStore(comment: BackendComment): void {
    console.log("cumva nu am reusit sa trimit comment asa ca il adaug in cache momentan");
    this.store.comments.push(comment);
  }

  // asta e ca sa adun tranzactii mai multe, in loc sa fac un request pentru fiecare in parte
  // in cazul in care o sa crape iar requestul, tranzactiile o sa ramana aici
  updateTransactionStore(transaction: BackendTransaction): void {
    this.store.transactions.push(transaction);
  }
}