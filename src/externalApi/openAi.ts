import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

type SendToOpenAiDto = {
  model: "gpt-4o-mini";
  messages: { role: "system" | "user"; content: string }[];
};

type SendToOpenAiResponse = {
  choices: { message: { content: string } }[];
};

export const sendToOpenAi = async (data: SendToOpenAiDto) => {
  return await axios<SendToOpenAiResponse>({
    method: "post",
    url: `http://${process.env.OPENA_AI_PROXY_URL}/api/openai`,
    data,
  });
};
