import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { sirusStatusMonitoring } from "./features/sirusStatusHandler";
import { registerCommands } from "./comands";
import { daySummaryService } from "./features/daySummary";
import { resolveConflictService } from "./features/resolveConflict";
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
resolveConflictService(bot, chatId!);
setInterval(() => {
  sirusStatusMonitoring(bot, chatId!);
}, 30000); // каждые 30 секунд стучим в сервера

bot.on("polling_error", console.log);
bot.on("webhook_error", console.error);
