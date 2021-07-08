"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CacheClient {
    constructor() {
        this.store = {
            comments: [],
            transactions: []
        };
        this.secondaryStore = {
            comments: [],
            transactions: []
        };
        this.isUpdateOngoing = false;
        console.log("cache client init successfully");
    }
    clearMainCache() {
        this.store.comments = [];
        this.store.transactions = [];
    }
    clearComments() {
        this.store.comments = [];
    }
    clearTransactions() {
        this.store.transactions = [];
    }
    getCurrentCache() {
        return this.store;
    }
    // vreau sa stiu daca exista vreo ceva in cache sau nu
    isCacheEmpty() {
        return this.store.comments.length === 0 && this.store.transactions.length === 0;
    }
    lockStore() {
        this.isUpdateOngoing = true;
    }
    //functia asta se apeleaza atunci cand se termina bulk update si
    //trebuie sa fac sync dintre main store si secondary store
    //apoi fac clear in secondary store
    syncBetweenSecondaryAndMainStore() {
        this.secondaryStore.transactions.forEach((t) => {
            this.store.transactions.push(t);
        });
        this.secondaryStore.transactions = [];
        this.secondaryStore.comments.forEach((c) => {
            this.store.comments.push(c);
        });
        this.secondaryStore.comments = [];
    }
    unlockStore() {
        this.isUpdateOngoing = false;
    }
    // asta e doar in cazul extrem in care nu pot sa trimit un comment in baza de date
    // o sa stea aici pana trimit in DB tot ce e in cache
    updateCommentStore(comment) {
        console.log("cumva nu am reusit sa trimit comment asa ca il adaug in cache momentan");
        if (this.isUpdateOngoing === false) {
            this.store.comments.push(comment);
        }
        else {
            this.secondaryStore.comments.push(comment);
        }
    }
    // asta e ca sa adun tranzactii mai multe, in loc sa fac un request pentru fiecare in parte
    // in cazul in care o sa crape iar requestul, tranzactiile o sa ramana aici
    updateTransactionStore(transaction) {
        if (this.isUpdateOngoing === false) {
            this.store.transactions.push(transaction);
        }
        else {
            this.secondaryStore.transactions.push(transaction);
        }
    }
}
exports.default = CacheClient;
