export type BackendComment = {
  content: string;
  author: string;
}

export interface IBackendClient {
  getRandomQuote: () => any;
  addQuote: (comment: BackendComment) => any;
}

export type RESPONSE_TYPE = "success" | "error";
export interface IBackendResponse {
  message: string;
  statusCode: number;
  status: string;
  arrayOfStuff: [];
}