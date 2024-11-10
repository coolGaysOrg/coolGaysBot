import type TelegramBot from "node-telegram-bot-api";

export type TBotCommandKeys = "prompt" | "options" | "help" | "tagAll";
export type TBotCommandCallback = (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  commandText?: string,
) => void;
export type TBotCommandConfig = {
  value: string;
  description: string;
  commandCallback: TBotCommandCallback;
};
export type TBotCommandsList = Record<TBotCommandKeys, TBotCommandConfig>;
