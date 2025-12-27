import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

type Props = {
  input: string;
  setInput: (text: string) => void;
  sendMessage: () => void;
};

export default function ChatInput({ input, setInput, sendMessage }: Props) {
  return (
    <>
      <div
        className="inputbox relative bg-zinc-100 rounded-b-lg flex-[0.2] flex items-center text-xs"
        key="inputbox"
      >
        <input
          className="text-black bg-zinc-300/80 flex-1 flex-1 w-full h-full max-h-[50px] max-w-[260px] rounded px-2 ml-17"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type Subject you want to learn..."
        />
        <span
          onClick={sendMessage}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute bg-blue-600 text-white w-full h-full max-h-[40px] max-w-[40px] rounded hover:bg-blue-700 flex items-center justify-center ml-70 cursor-auto"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </span>
      </div>
    </>
  );
}