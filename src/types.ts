import { MessageAttachment, MessageEmbed } from "discord.js";

export type BackendComment = {
  content: string;
  author: string;
}

export type MessageContentAndAttachment = {
  content: string;
  attachments: MessageAttachment[];
  authorUsername: string;
}
export interface BackendTransaction {
  reason: string;
  cost: number;
  discordUserId: string;
}

export interface IBackendClient {
  getAppMode(): string;
  getRandomQuote: () => Promise<MessageEmbed>;
  addQuote: (comment: BackendComment) => Promise<string>;
  addTransactions(transactions: BackendTransaction[]): Promise<string>;
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