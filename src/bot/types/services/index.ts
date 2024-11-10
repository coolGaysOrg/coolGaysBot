export type TServices = Record<TServiceList, TServiceConfig>;
export type TServiceConfig = {
  enable: boolean;
  service: TService;
  label: string;
};
export type TService<T = {}> = () => {
  init: (
    config: TServiceConfig,
    callback?: (config: TServiceConfig) => void,
  ) => void;
} & T;
export type TServiceList =
  | "dailyMessages"
  | "botCommands"
  | "sirusMonitoring"
  | "daySummary";
