import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import { sendToOpenAi } from "../../externalApi/openAi";

let messagesForToday: string[] = [];

export const daySummaryService = async (bot: TelegramBot, chatId: string) => {
  bot.on("message", (msg) => {
    const text = msg.text;

    const userName =
      msg.from?.first_name || msg.from?.last_name || msg.from?.username;
    const isForwardMessageFromChat = !!msg.forward_from_chat;

    // Игнорируем сообщения от самого бота
    if (msg.from?.is_bot) return;

    if (isForwardMessageFromChat && text) {
      const forwardFrom =
        msg.forward_from_chat?.title || msg.forward_from_chat?.username;
      messagesForToday.push(
        `${userName} переслал сообщение с канала ${forwardFrom} с таким текстом: ${text}`,
      );
    }

    if (text && !isForwardMessageFromChat) {
      messagesForToday.push(`${userName}: ${text}`);
    }
  });

  cron.schedule("0 21 * * *", async () => {
    if (messagesForToday.length === 0) {
      console.log("Нет сообщений для анализа.");
      return;
    }

    try {
      const res = await sendToOpenAi({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `
          Проанализируй сообщения за день и дай краткую сводку. Пожалуйста, выдели ключевые темы и основные выводы в виде тезисов. Используй эмоджи для улучшения восприятия информации.

          Вот список наших сообщений:
          ${messagesForToday.join("\n")}

          Сделай сводку ясной и лаконичной, чтобы ее легко было прочитать.
            `,
          },
        ],
      });

      if (res.data.choices[0].message.content) {
        await bot.sendMessage(chatId, res.data.choices[0].message.content);
      }
    } catch (error) {
      console.error("Ошибка при отправке сообщения в OpenAI:", error);
    } finally {
      clearMessagesForToday();
    }
  });
};

function clearMessagesForToday() {
  messagesForToday = [];
  console.log("Очистил сообщения");
}
