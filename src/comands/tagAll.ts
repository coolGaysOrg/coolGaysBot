import TelegramBot, { Message } from "node-telegram-bot-api";
import { USER_LIST } from "../utils/constants";

export const tagAllCommand = (bot: TelegramBot, msg: Message) => {
  bot.sendMessage(msg.chat.id, USER_LIST.join(" "));
};
