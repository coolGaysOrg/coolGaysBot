import axios from "axios";
import dotenv from "dotenv";
import { OllamaChatRequestBody, OllamaChatResponse } from "../types";
dotenv.config();

export const getOllamaChatResponse = async (data: OllamaChatRequestBody) => {
  return await axios<OllamaChatResponse>({
    method: "post",
    url: `${process.env.OLLAMA_API_URL}/ollama`,
    data,
  });
};
