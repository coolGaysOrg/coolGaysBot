export interface OllamaChatResponse {
  model: string;
  created_at: Date;
  message: Message;
  done: boolean;
  done_reason: string;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
}
interface Message {
  role: string;
  content: string;
  images?: Uint8Array[] | string[];
  tool_calls?: ToolCall[];
}
interface ToolCall {
  function: {
    name: string;
    arguments: {
      [key: string]: any;
    };
  };
}
export interface OllamaChatRequestBody {
  prompt: string;
}
