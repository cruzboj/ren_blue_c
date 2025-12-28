export type ChatMessage = {
  id?: number | string;
  input: string;
  sender: "user" | "bot";
};