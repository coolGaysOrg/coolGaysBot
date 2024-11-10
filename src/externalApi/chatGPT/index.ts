import axios from "axios";
import dotenv from "dotenv";
import { ChatGPTRequestBody, ChatGPTResponse } from "../types/chatGPT";
dotenv.config();

export const getChatGPTResponse = async (data: ChatGPTRequestBody) => {
  return await axios<ChatGPTResponse>({
    method: "post",
    url: `http://${process.env.OPENA_AI_PROXY_URL}/api/openai`,
    data,
  });
};
