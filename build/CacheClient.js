"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CacheClient {
    constructor() {
        this.store = {
            comments: [],
            transactions: []
        };
        console.log("cache client init successfully");
    }
    // vreau sa stiu daca exista vreo ceva in cache sau nu
    isCacheEmpty() {
        return this.store.comments.length === 0 && this.store.transactions.length === 0;
    }
    // asta e doar in cazul extrem in care nu pot sa trimit un comment in baza de date
    // o sa stea aici pana trimit in DB tot ce e in cache
    updateCommentStore(comment) {
        console.log("cumva nu am reusit sa trimit comment asa ca il adaug in cache momentan");
        this.store.comments.push(comment);
    }
    // asta e ca sa adun tranzactii mai multe, in loc sa fac un request pentru fiecare in parte
    // in cazul in care o sa crape iar requestul, tranzactiile o sa ramana aici
    updateTransactionStore(transaction) {
        this.store.transactions.push(transaction);
    }
}
exports.default = CacheClient;
