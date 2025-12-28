import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export default function ChatMessages() {
  const { messages } = useContext(ChatContext);

  const botCSS =
    "bg-green-500 rounded-r-lg rounded-tl-lg max-w-[20rem] px-3 ms-2 self-start text-xl break-words";
  const userCSS =
    "bg-blue-500 rounded-l-lg rounded-tr-lg max-w-[20rem] px-3 ms-2 self-end text-xl break-words";

  return (
    <div className="content bg-zinc-800/100 flex-[0.75] flex flex-col gap-5 p-1 overflow-auto">
      {messages.map((msg, i) => (
        <p key={i} className={msg.sender === "user" ? userCSS : botCSS}>
          {msg.input}
        </p>
      ))}
    </div>
  );
}
