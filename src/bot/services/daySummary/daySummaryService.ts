import TelegramBot from "node-telegram-bot-api";
import { useAiModelResponse } from "../../utils/useAiModel";
import cron from "node-cron";
import { TService, TServiceConfig } from "../../types/services";
import { useChatId } from "../../utils";
import { useBot } from "../../utils/useBot";
import { dailyMessagesService } from "../dailyMessages/dailyMessagesService";

export const daySummaryService: TService = () => {
  const parseDailyMessages = (messages: TelegramBot.Message[]): string[] => {
    return messages
      .map((msg) => {
        if (msg.from?.is_bot) return undefined;
        const text = msg.text;
        const userName =
          msg.from?.first_name || msg.from?.last_name || msg.from?.username;
        const isForwardMessageFromChat = !!msg.forward_from_chat;

        if (isForwardMessageFromChat && text) {
          const forwardFrom =
            msg.forward_from_chat?.title || msg.forward_from_chat?.username;
          return `${userName} переслал сообщение с канала ${forwardFrom} с таким текстом: ${text}`;
        }
        if (text && !isForwardMessageFromChat) {
          return `${userName}: ${text}`;
        }
        return undefined;
      })
      .filter((message): message is string => message !== undefined);
  };
  const analizeMessages = async () => {
    const { messages: dailyMessages } = dailyMessagesService();

    const messages = parseDailyMessages(dailyMessages);
    const bot = useBot();
    if (messages.length === 0) {
      console.log("Нет сообщений для анализа.");
      return;
    }
    const modelPromt = `
          Проанализируй сообщения за день и дай краткую сводку. Пожалуйста, выдели ключевые темы и основные выводы в виде тезисов. Используй эмоджи для улучшения восприятия информации.

          Вот список наших сообщений:
          ${messages.join("\n")}

          Сделай сводку ясной и лаконичной, чтобы ее легко было прочитать.
            `;
    try {
      const response = await useAiModelResponse("chatGPT", modelPromt);
      if (response) {
        await bot.sendMessage(useChatId(), response);
      }
    } catch (error) {
      if (!(error instanceof Error)) {
        return console.error("Ошибка запроса к ИИ", error);
      }
      await bot.sendMessage(useChatId(), error.message);
    }
  };
  const setupScheduler = () => {
    cron.schedule(
      "59 23 * * *",
      async () => {
        analizeMessages();
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
    setupScheduler();
    if (callback) callback(config);
  };

  return {
    init,
  };
};
