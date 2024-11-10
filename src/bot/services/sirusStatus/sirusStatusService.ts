import cloudscraper from "cloudscraper";
import { TService, TServiceConfig } from "../../types/services";
import { useBot } from "../../utils/useBot";
import { useChatId } from "../../utils";

export const sirusMonitoringService: TService = () => {
  const url = "https://sirus.su/api/statistic/tooltip.json";

  let previousIsOnline: boolean | null = null;

  type StatisticDto = {
    realms: {
      id: string;
      name: string;
      isOnline: boolean;
      online: number;
    }[];
  };

  const tagUsers = "@aleksanedro";

  const getIsOnline = (
    data: StatisticDto,
    realmName: string,
  ): boolean | null => {
    const realm = data.realms.find((r) => r.name === realmName);

    if (realm) {
      return realm.isOnline;
    }

    return null;
  };

  const sirusStatusMonitoring = async () => {
    const bot = useBot();
    const chatId = useChatId();
    try {
      console.log("Слушаем...");
      const response = await cloudscraper.get(url);

      // @ts-ignore - ошибка, но тут сто проц строка
      const data: StatisticDto = JSON.parse(response);

      const isSoulseekerOnline = getIsOnline(data, "Soulseeker x1 - 3.3.5a+");

      // Если состояние изменилось
      if (
        previousIsOnline !== null &&
        previousIsOnline !== isSoulseekerOnline
      ) {
        if (isSoulseekerOnline) {
          console.log("Снова онлайн");
          bot.sendMessage(
            chatId,
            "Soulseeker x1 - 3.3.5a+ снова онлайн! " + tagUsers,
          );
        } else {
          console.log("Упал");
          bot.sendMessage(
            chatId,
            "Soulseeker x1 - 3.3.5a+ ушел в оффлайн! " + tagUsers,
          );
        }
      }

      // Обновляем предыдущее состояние
      previousIsOnline = isSoulseekerOnline;
    } catch (error) {
      let errorMessage = "Что-то пошло не так ";

      if (error instanceof Error) {
        errorMessage = "Ошибка при получении данных: " + error.message;
      }

      console.error(errorMessage);
    }
  };
  const setupMonitoring = () => {
    setInterval(() => {
      sirusStatusMonitoring();
    }, 30000);
  };
  const init = (
    config: TServiceConfig,
    callback?: (config: TServiceConfig) => void,
  ) => {
    setupMonitoring();
    if (callback) callback(config);
  };

  return {
    init,
  };
};
