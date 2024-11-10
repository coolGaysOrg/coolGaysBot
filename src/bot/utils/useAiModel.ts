import { getChatGPTResponse } from "../../externalApi/chatGPT";
import { getOllamaChatResponse } from "../../externalApi/ollama";

type TAiModel = "ollama" | "chatGPT";
export const useAiModelResponse = async (
  model: TAiModel,
  prompt: string,
): Promise<string> => {
  if (model === "ollama") {
    try {
      const response = await getOllamaChatResponse({
        prompt,
      });
      return response.data.message.content;
    } catch (error) {
      throw Error(`Что-то пошло не так с моделью, ${model}`);
    }
  } else if (model === "chatGPT") {
    try {
      const response = await getChatGPTResponse({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });
      return response.data.choices[0].message.content;
    } catch (error) {
      throw Error(`Что-то пошло не так с моделью, ${model}`);
    }
  } else {
    throw Error(`Что-то пошло не так с моделью, ${model}`);
  }
};
