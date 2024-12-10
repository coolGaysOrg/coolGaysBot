import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { registerCommands } from "./comands";
import { daySummaryService } from "./features/daySummary";
dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.CHAT_ID;

if (!token) {
  throw new Error("TELEGRAM_BOT_TOKEN не указан в .env файле");
}

if (!chatId) {
  throw new Error("CHAT_ID не указан в .env файле");
}

const bot = new TelegramBot(token, { polling: true });

daySummaryService(bot, chatId);

registerCommands(bot);

bot.on("polling_error", console.log);
bot.on("webhook_error", console.error);
