import { useContext, useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

// import { getUrl } from "../../urlGetter";
import {
  useQueryClient
} from '@tanstack/react-query'

// import RoadmapCardsContext from "../../context/RoadmapContext"

// const url = getUrl();

type ChatMessage = {
  input: string;
  sender: "user" | "bot";
};


let isWaitingConfirmation = false;
let confirmedSubject = "";

export default function Chat() {
  // const context = useContext(RoadmapCardsContext);
  // if (!context) {
  //   return <></>;
  // }
  // const {roadMapCardSession, setRoadMapCardSession} = context;
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState(""); 
  const sendMessage = (input: string) => {
    if (!input.trim()) return;    
    if (isWaitingConfirmation) {
      confirmSubjectMessage(input);
      isWaitingConfirmation = false;
    } else {
      sendSubjectMessage(input);
      isWaitingConfirmation = true;
    } 
    setInput("");
  };  
    function sendSubjectMessage(input: string) {
      confirmedSubject = input;
      setMessages((prevMsg) => [
        ...prevMsg,
        { input, sender: "user" },
        { input: `Search for "${input}"? (yes/no)`, sender: "bot" },
      ]);
    }   
    async function confirmSubjectMessage(input: string) {
      if (input.toLowerCase() === "yes") {
        // const data = await createSubject(confirmedSubject);
        // console.log(data);
        // setRoadMapCardSession(data.children);
        // setRoadmapId(id);
        setMessages((prevMsg) => [
          ...prevMsg,
          { input, sender: "user" },
          {
            input: `Okay! Creating a learning roadmap for "${confirmedSubject}".`,
            sender: "bot",
          },
        ]
      )

      queryClient.invalidateQueries({ queryKey: ["historyData"] });
      queryClient.refetchQueries({ queryKey: ["historyData"] });

      } else {
        setMessages((prevMsg) => [
          ...prevMsg,
          { input, sender: "user" },
          {
            input: `Sorry. Please enter the subject you want to learn.`,
            sender: "bot",
          },
        ]);
      }
    }
    
    return (
      <>
        <div className="box relative min-h-[100px] min-w-[100px] w-[400px] h-[400px] bg-zinc-800/0 rounded-lg p-1 flex flex-col">
        <div className="top bg-zinc-900 rounded-t-lg flex-[0.1] flex items-center justify-center text-xs"></div>
          
        <ChatMessages messages={messages} />
          <ChatInput
            input={input}
            setInput={setInput}
            sendMessage={() => sendMessage(input)}
          />
        </div>
      </>
    );
}


// async function createSubject(subjectInput: string) {
//   const response = await fetch(`${url}create-roadmap?subject=${subjectInput}`);
//   const data = await response.json();
//   return data;
// }
