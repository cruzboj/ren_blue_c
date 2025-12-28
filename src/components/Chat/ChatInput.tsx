import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

import { streamLLMResponse } from "./chatService";

export default function ChatInput() {
  const { input , setInput , sendUser , updateBotResponse} = useContext(ChatContext);

  const handleSend = async () => {
    if (input.trim() !== "") {
      const userText = input;
      const botMsgId = Date.now();
      
      setInput("");
      sendUser(userText);

      try {
        await streamLLMResponse(userText, (accumulatedText) => {
          updateBotResponse(botMsgId, accumulatedText);
        });
      } catch (error) {
        console.error("Failed to stream:", error);
        updateBotResponse(botMsgId, "i'm sorry there was a problem generating text");
      }
    }
  };
  
  return (
    <>
      <div
        className="inputbox relative bg-zinc-800 rounded-b-lg flex-[0.2] flex items-center text-xs"
        key="inputbox"
      >
        <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="text-white text-lg bg-zinc-900/80 flex-1 flex-1 w-full h-full max-h-[50px] max-w-[660px] rounded px-2 ml-17 "
            placeholder="Type Subject you want to learn..."
            />
        <span
            onClick={handleSend}
            onPointerDown={(e) => e.stopPropagation()}
            className="absolute bg-blue-600 text-white w-full h-full max-h-[40px] max-w-[40px] rounded hover:bg-blue-700 flex items-center justify-center ml-170 cursor-auto"
            >
          <FontAwesomeIcon icon={faPaperPlane} />
        </span>
      </div>
      
    </>
  );
}