import { MessageEmbed } from "discord.js";

export type BackendComment = {
  content: string;
  author: string;
}

export interface IBackendClient {
  getAppMode(): string;
  getRandomQuote: () => Promise<MessageEmbed>;
  addQuote: (comment: BackendComment) => Promise<string>;
  addTransactions(): any;
}

export type RESPONSE_TYPE = "success" | "error";
export enum APP_MODES {
  LOCAL = "local",
  PROD = "production"
}
export interface IBackendResponse {
  message: string;
  statusCode: number;
  status: RESPONSE_TYPE;
  arrayOfStuff: [];
}