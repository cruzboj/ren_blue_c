import { useContext , useRef , useEffect } from "react";
import { ChatContext } from "../context/ChatContext";

export default function ChatMessages() {
  /*
    - take messages and display them
    - useEffect for auto scroll down for new messages
  */
  const { messages } = useContext(ChatContext);

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const botCSS =
    "bg-green-500 rounded-r-lg rounded-tl-lg max-w-[20rem] px-3 ms-2 self-start text-xl break-words";
  const userCSS =
    "bg-blue-500 rounded-l-lg rounded-tr-lg max-w-[20rem] px-3 ms-2 self-end text-xl break-words";

  return (
    <div 
    ref={scrollRef}
    className="content chat bg-zinc-800 flex-[0.75] flex flex-col gap-5 p-1 overflow-auto">
      {messages.map((msg, i) => (
        <p key={i} className={msg.sender === "user" ? userCSS : botCSS}>
          {msg.input}
        </p>
      ))}
    </div>
  );
}
