import { MessageAttachment, MessageEmbed } from "discord.js";

export type RESPONSE_TYPE = "success" | "error";
export type TRANSACTION_STATUS = "successful" | "pending" | "rejected";
export type TRANSACTION_TYPE = "give" | "receive";

export enum APP_MODES {
  LOCAL = "local",
  PROD = "production"
}

export type MessageContentAndAttachment = {
  content: string;
  attachments: MessageAttachment[];
  authorUsername: string;
}

export interface ICacheClient {
  clearMainCache: () => void;
  clearMainComments: () => void;
  clearMainTransactions: () => void;
  clearSecondaryComments: () => void;
  clearSecondaryTransactions: () => void;
  getCurrentCache: () => ICacheSchema;
  isCacheEmpty: () => boolean;
  lockStore: () => void;
  syncBetweenSecondaryAndMainStore: () => void;
  unlockStore: () => void;
  updateCommentStore: (comment: BackendComment) => void;  
  //o sa primeasca un array de 2 elemente: 1. cine initiaza tranzactia, 2. cui ii e adresata tranzactia 
  updateTransactionStore: (transactionSet: BackendTransaction[]) => void;
}

export interface ICacheSchema {
  // lista din care sa fac update la quotes
  comments: BackendComment[];

  // lista din care sa fac update la useri cu bani
  // trebuie cumva indexata dupa discordUserId sau ceva unic
  transactions: BackendTransaction[][];
}

export interface BackendComment {
  content: string;
  author: string;
}

export interface BackendTransaction {
  reason: string;
  cost: number;
  discordUserId: string;
  initiatorDiscordUsername?: string;
  initiatorDiscordUserId?: string;
  receiverDiscordUserId?: string;
  receiverDiscordUsername?: string;
  status: TRANSACTION_STATUS;
  type: TRANSACTION_TYPE;
}

export interface IBackendResponse {
  message: string;
  statusCode: number;
  status: RESPONSE_TYPE;
  arrayOfStuff?: [];
}

export interface IBackendClient {
  getAppMode(): string;
  getRandomQuote: () => Promise<MessageEmbed>;
  getUsersBank: () => Promise<IBackendResponse>;
  getUserBank: (userId: string) => Promise<string>;
  getUserTransactions: (userId: string, numberOfTransactions: number) => Promise<string>
  addQuote: (comment: BackendComment) => Promise<string>;
  addTransactions(transactions: BackendTransaction[]): Promise<string>;
  sendCacheDataOnDemand: (cacheClient: ICacheClient) => Promise<string>;
}