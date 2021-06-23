import { MessageEmbed } from "discord.js";

export type BackendComment = {
  content: string;
  author: string;
}

export interface IBackendClient {
  getRandomQuote: () => Promise<MessageEmbed>;
  addQuote: (comment: BackendComment) => Promise<string>;
}

export type RESPONSE_TYPE = "success" | "error";
export interface IBackendResponse {
  message: string;
  statusCode: number;
  status: RESPONSE_TYPE;
  arrayOfStuff: [];
}