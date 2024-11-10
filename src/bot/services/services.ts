import { TServices } from "../types/services";
import { botCommandsService } from "./botCommands/botCommandsService";
import { dailyMessagesService } from "./dailyMessages/dailyMessagesService";
import { daySummaryService } from "./daySummary/daySummaryService";

import { sirusMonitoringService } from "./sirusStatus/sirusStatusService";

export const services: TServices = {
  dailyMessages: {
    enable: true,
    service: dailyMessagesService,
    label: "Daily Messages",
  },
  botCommands: {
    enable: true,
    service: botCommandsService,
    label: "Bot Commands",
  },
  sirusMonitoring: {
    enable: true,
    service: sirusMonitoringService,
    label: "Sirus Monitoring",
  },
  daySummary: {
    enable: true,
    service: daySummaryService,
    label: "Day Summary",
  },
};
