import TelegramBot from "node-telegram-bot-api";
import { TService, TServiceConfig } from "../../types/services";
import cron from "node-cron";
import { useBot } from "../../utils/useBot";

let messages: TelegramBot.Message[] = [];

export const dailyMessagesService: TService<{
  messages: TelegramBot.Message[];
}> = () => {
  const addMessage = (message: TelegramBot.Message): void => {
    messages.push(message);
  };

  const resetMessages = (): void => {
    messages = [];
    console.log(`Сообщения за ${new Date().toLocaleDateString()} сброшены.`);
  };

  const setupMessageListener = () => {
    const bot = useBot();
    bot.on("message", (message) => {
      addMessage(message);
    });
  };

  const setupScheduler = () => {
    cron.schedule(
      "58 23 * * *",
      async () => {
        resetMessages();
      },
      {
        timezone: "Europe/Moscow",
      },
    );
  };

  const init = (
    config: TServiceConfig,
    callback?: (config: TServiceConfig) => void,
  ) => {
    setupMessageListener();
    setupScheduler();
    if (callback) callback(config);
  };

  return {
    messages,
    init,
  };
};
