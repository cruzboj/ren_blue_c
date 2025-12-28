import { createContext } from "react";
import type {ChatMessage} from "../Chat/types"

export type ChatContextType = {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;

  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;

  sendUser: (input: string) => void;
};

export const ChatContext = createContext<ChatContextType>({
  messages: [],
  setMessages: () => {},
  input: "",
  setInput: () => {},
  sendUser: () => {},
});