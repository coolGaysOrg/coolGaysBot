import TelegramBot from "node-telegram-bot-api";
import { botCommands } from "../../botCommands";
import { TBotCommandCallback } from "../../../../types/botCommands";
export const helpCallback: TBotCommandCallback = (
  bot: TelegramBot,
  msg: TelegramBot.Message,
) => {
  let parsedBotCommands = "";
  Object.entries(botCommands).forEach(([key, value]) => {
    parsedBotCommands += `/${key} - ${value.description} \n`;
  });
  const chatId = msg.chat.id;
  const helpMessage = `Доступные команды: \n${parsedBotCommands}`;
  bot.sendMessage(chatId, helpMessage);
};
