import { TBotCommandConfig } from "../../../../types/botCommands";
import { helpCallback } from "./callback";

export const helpCommand: TBotCommandConfig = {
  value: "/help",
  description: "Команда для получения помощи",
  commandCallback: helpCallback,
};
