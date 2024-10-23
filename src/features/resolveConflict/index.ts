import TelegramBot from "node-telegram-bot-api";
import type { CallbackQuery } from "node-telegram-bot-api";
import { sendToOpenAi } from "../../externalApi/openAi";
interface StoredMessage {
  text: string;
  date: number;
  user: string;
  chatId: number;
}

let messages: StoredMessage[] = [];
export const resolveConflictService = async (
  bot: TelegramBot,
  chatId: string,
) => {
  bot.on("message", (msg: TelegramBot.Message) => {
    if (msg.text && !msg.text.startsWith("/")) {
      messages.push({
        text: msg.text,
        date: msg.date,
        user:
          msg.from?.first_name ||
          msg.from?.last_name ||
          msg.from?.username ||
          "Unknown",
        chatId: msg.chat.id,
      });
    }
  });
  bot.onText(/\/resolveDispute/, (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;

    bot.sendMessage(
      chatId,
      "Выберите временной промежуток (в минутах) для разрешения спора:",
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "10 мин", callback_data: "10" },
              { text: "20 мин", callback_data: "20" },
            ],
            [
              { text: "40 мин", callback_data: "40" },
              { text: "60 мин", callback_data: "60" },
            ],
          ],
        },
      },
    );
  });
  bot.on("callback_query", async (query: CallbackQuery) => {
    if (!query.message) return;
    const chatId = query.message.chat.id;
    const minutes = parseInt(query.data || "0");

    const currentTime = Math.floor(Date.now() / 1000);
    const timeStart = currentTime - minutes * 60;

    const filteredMessages = messages.filter((message) => {
      return message.chatId === chatId && message.date >= timeStart;
    });

    if (filteredMessages.length > 0) {
      let response = `Сообщения за последние ${minutes} минут:\n\n`;
      filteredMessages.forEach((msg) => {
        response += `[${msg.user}]: ${msg.text}\n`;
      });
      /* bot.sendMessage(chatId, response); */
      const res = await sendToOpenAi({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `
            Проанализируй сообщения, и определи, кто из участников спора прав
  
            Вот список наших сообщений:
            ${response}
              `,
          },
        ],
      });
      if (res.data.choices[0].message.content) {
        await bot.sendMessage(chatId, res.data.choices[0].message.content);
      }
    } else {
      bot.sendMessage(
        chatId,
        `Сообщений за последние ${minutes} минут не найдено.`,
      );
    }
  });
};
