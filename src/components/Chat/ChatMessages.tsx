type Props = {
  messages: { input: string; sender: "user" | "bot" }[];
};

export default function ChatMessages({ messages }: Props) {
  const botCSS =
    "bg-green-500 rounded-r-lg rounded-tl-lg max-w-[12rem] px-3 ms-2 self-start";
  const userCSS =
    "bg-blue-500 rounded-l-lg rounded-tr-lg max-w-[12rem] px-3 ms-2 self-end";

  return (
    <div className="content bg-zinc-100/100 flex-[0.75] flex flex-col gap-1 p-1 overflow-auto">
      {messages.map((msg, i) => (
        <p key={i} className={msg.sender === "user" ? userCSS : botCSS}>
          {msg.input}
        </p>
      ))}
    </div>
  );
}
