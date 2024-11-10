import { TBotCommandConfig } from "../../../../types/botCommands";
import { tagAllCallback } from "./callback";

export const tagAllCommand: TBotCommandConfig = {
  value: "/tagall",
  description: "Команда для тега всех участников беседы",
  commandCallback: tagAllCallback,
};
