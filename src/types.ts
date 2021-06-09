export type BackendComment = {
  content: string;
  author: string;
}

export interface IBackendClient {
  getRandomQuote: () => any;
  addQuote: (comment: BackendComment) => any;
}