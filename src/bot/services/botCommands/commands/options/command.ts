import { TBotCommandConfig } from "../../../../types/botCommands";
import { optionsCallback } from "./callback";

export const optionsCommand: TBotCommandConfig = {
  value: "/options",
  description: "Команда активирует меню настроек бота",
  commandCallback: optionsCallback,
};
