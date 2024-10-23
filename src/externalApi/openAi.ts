import axios from "axios";

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
    url: "http://194.36.209.192:8080/api/openai",
    data,
  });
};
