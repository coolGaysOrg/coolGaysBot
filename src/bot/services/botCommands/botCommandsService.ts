import { TService, TServiceConfig } from "../../types/services";
import { botCommands } from "./botCommands";
import { useBot } from "../../utils/useBot";

export const botCommandsService: TService = () => {
  const registerCommands = () => {
    const bot = useBot();

    Object.entries(botCommands).forEach(([key, value]) => {
      const regExp = new RegExp(`^/${key}(@\\w+)?\\s?(.*)$`);

      bot.onText(regExp, (msg, match) => {
        const commandText = match?.[2]?.trim();
        if (value.commandCallback) {
          value.commandCallback(bot, msg, commandText);
        }
      });
    });
  };

  const init = (
    config: TServiceConfig,
    callback?: (config: TServiceConfig) => void,
  ) => {
    registerCommands();
    if (callback) callback(config);
  };

  return {
    init,
  };
};
