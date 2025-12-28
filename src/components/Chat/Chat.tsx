import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentMedical } from "@fortawesome/free-solid-svg-icons";

import type { ChatMessage } from "./types";
import { ChatContext } from "../context/ChatContext";

export default function Chat() {
    /*
        Chat Component
        + useContext for useStates

        - function SendLLM:
            take input and setMessage as bot
        - function sendUser:
            take input and setMessage as user

    */
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    
    
    // animation states 
    const [animation, setAnimation] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const handleCloseChat = () => setAnimation(true);
    const handleOpenChat = () => { setAnimation(false); setIsFinished(false); };
    const handleAnimationEnd = () => {
        if (animation) setIsFinished(true);
    };

    function sendLLM(input : string){
        setMessages((prevMsg) => [
            ...prevMsg,
            { input, sender: "user" },
            {
              input: `${input}`,
              sender: "bot",
            },
        ]);
    }

    function sendUser(input: string) {
        setMessages((prevMsg) => [
            ...prevMsg,
            { 
                input: input, 
                sender: "user" 
            },
        ]);
    }

    return (

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 ">
            {!isFinished && (
                <div 
                    onAnimationEnd={handleAnimationEnd}
                    className={`
                        pointer-events-auto
                        min-h-[100px] min-w-[100px] w-[800px] h-[650px] rounded-lg p-1 flex flex-col
                        absolute top-10
                        bg-zinc-800
                        ${animation ? 
                            'motion-scale-out-[0.07] motion-translate-x-out-[-85%] motion-translate-y-out-[-50%] motion-opacity-out-[0%] motion-duration-[400ms]' 
                            : 'motion-scale-in-[0.07] motion-translate-x-in-[-85%] motion-translate-y-in-[-50%] motion-opacity-in-[0%] motion-duration-[400ms] motion-ease-spring-bouncier'}
                    `}
                >
                    <div className="top bg-zinc-900 rounded-t-lg flex-[0.1] flex items-center justify-end text-xs">
                        <button 
                            onClick={handleCloseChat}
                            className="w-5 h-5 rounded-full bg-orange-600 hover:bg-red-600 mr-5 cursor-pointer">
                        </button>
                    </div>
                    <ChatContext.Provider value={{ messages , setMessages , input , setInput , sendUser}}>
                        <ChatMessages />
                        <ChatInput/>
                    </ChatContext.Provider>
                </div>
            )}

            {isFinished && (
                <div 
                    onClick={handleOpenChat}
                    className={`
                        pointer-events-auto
                        absolute left-0 top-10 w-12 h-12 bg-lime-600 hover:bg-lime-500 rounded-r-lg flex items-center justify-center cursor-pointer text-white shadow-lg origin-left         
                        ${animation ? 'motion-scale-x-in-0 motion-duration-700 motion-ease-spring-bouncier motion-loop-once' : ''}
                    `}
                >
                    <button className="cursor-pointer">
                        <FontAwesomeIcon icon={faCommentMedical} size="lg" />
                    </button>
                </div>
            )}
        </div>
    );
}