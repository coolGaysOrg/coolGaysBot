import TelegramBot from "node-telegram-bot-api";
import { tagAllCommand } from "./tagAll";

// Регистрация команд
export const registerCommands = (bot: TelegramBot) => {
  bot.onText(/\/tagall/, (msg) => {
    tagAllCommand(bot, msg);
  });
};
