import { TServices } from "../types/services";

export const setupServices = (services: TServices) => {
  Object.entries(services).forEach(([key, serviceConfig]) => {
    if (serviceConfig.enable) {
      serviceConfig.service().init(serviceConfig, (serviceConfig) => {
        console.log(`Сервис "${serviceConfig.label}" зарегистрирован`);
      });
    }
  });
};
