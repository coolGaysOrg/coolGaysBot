import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

dotenv.config();

let botInstance: TelegramBot | null = null;

export const useBot = (): TelegramBot => {
  if (botInstance) {
    return botInstance;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN не определен в .env файле");
  }

  botInstance = new TelegramBot(token, { polling: true });
  return botInstance;
};
