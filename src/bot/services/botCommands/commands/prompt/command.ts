import { TBotCommandConfig } from "../../../../types/botCommands";
import { promptCallback } from "./callback";

export const promptCommand: TBotCommandConfig = {
  value: "/prompt",
  description: "Команда для отправки промта ИИ модели",
  commandCallback: promptCallback,
};
