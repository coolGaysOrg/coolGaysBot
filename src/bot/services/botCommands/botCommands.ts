import { TBotCommandsList } from "../../types/botCommands";
import {
  helpCommand,
  optionsCommand,
  promptCommand,
  tagAllCommand,
} from "./commands";

export const botCommands: TBotCommandsList = {
  prompt: promptCommand,
  options: optionsCommand,
  help: helpCommand,
  tagAll: tagAllCommand,
};
