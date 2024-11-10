import TelegramBot from "node-telegram-bot-api";
import { TBotCommandCallback } from "../../../../types/botCommands";

export const optionsCallback: TBotCommandCallback = (
  bot: TelegramBot,
  msg: TelegramBot.Message,
) => {
  const chatId = msg.chat.id;
  const helpMessage = `Вызвана команда опций`;
  bot.sendMessage(chatId, helpMessage);
};
