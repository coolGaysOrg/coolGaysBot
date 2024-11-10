import dotenv from "dotenv";
dotenv.config();

export const useChatId = (): string => {
  const chatId = process.env.CHAT_ID;
  if (!chatId) {
    throw Error("CHAT_ID не определен в .env");
  }
  return chatId;
};
