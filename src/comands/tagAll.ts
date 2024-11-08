import TelegramBot, { Message } from "node-telegram-bot-api";
import { USER_LIST } from "../utils/constants";

export const tagAllCommand = (bot: TelegramBot, msg: Message) => {
  console.log('tagAllCommand');
  bot.sendMessage(msg.chat.id, USER_LIST.join(" "));
};
