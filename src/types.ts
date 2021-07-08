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
  sendCacheDataOnDemand: (cacheClient: ICacheClient) => any;
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

export interface ICacheClient {
  clearMainCache: () => void;
  clearComments: () => void;
  clearTransactions: () => void;
  getCurrentCache: () => ICacheSchema;
  isCacheEmpty: () => boolean;
  lockStore: () => void;
  syncBetweenSecondaryAndMainStore: () => void;
  unlockStore: () => void;
  updateCommentStore: (comment: BackendComment) => void;
  updateTransactionStore: (transaction: BackendTransaction) => void;
}
export interface ICacheSchema {
  // lista din care sa fac update la quotes
  comments: BackendComment[];

  // lista din care sa fac update la useri cu bani
  // trebuie cumva indexata dupa discordUserId sau ceva unic
  transactions: BackendTransaction[]
}

