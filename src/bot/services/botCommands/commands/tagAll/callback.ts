import TelegramBot, { Message } from "node-telegram-bot-api";
import { TBotCommandCallback } from "../../../../types/botCommands";
import { USER_LIST } from "../../../../utils";

export const tagAllCallback: TBotCommandCallback = (
  bot: TelegramBot,
  msg: Message,
) => {
  bot.sendMessage(msg.chat.id, USER_LIST.join(" "));
};
