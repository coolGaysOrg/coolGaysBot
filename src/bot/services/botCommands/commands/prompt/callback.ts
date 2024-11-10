import TelegramBot from "node-telegram-bot-api";
import { TBotCommandCallback } from "../../../../types/botCommands";
import { useAiModelResponse } from "../../../../utils/useAiModel";

export const promptCallback: TBotCommandCallback = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  commandText?: string,
) => {
  const thinkingMessage = await bot.sendMessage(msg.chat.id, "Ща думаю");
  try {
    if (!commandText) {
      throw Error("Вы должны указать текст промпта после команды /prompt");
    }
    try {
      const response = await useAiModelResponse("ollama", commandText);
      await bot.editMessageText(response, {
        chat_id: msg.chat.id,
        message_id: thinkingMessage.message_id,
      });
    } catch (error) {
      if (!(error instanceof Error)) return;
      await bot.editMessageText(error.message, {
        chat_id: msg.chat.id,
        message_id: thinkingMessage.message_id,
      });
    }
  } catch (error) {
    console.error("Ошибка запроса к ИИ", error);
    if (!(error instanceof Error)) return;
    await bot.editMessageText(error.message, {
      chat_id: msg.chat.id,
      message_id: thinkingMessage.message_id,
    });
  }
};
