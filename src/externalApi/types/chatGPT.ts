export type ChatGPTRequestBody = {
  model: "gpt-4o-mini";
  messages: { role: "system" | "user"; content: string }[];
};

export type ChatGPTResponse = {
  choices: { message: { content: string } }[];
};
