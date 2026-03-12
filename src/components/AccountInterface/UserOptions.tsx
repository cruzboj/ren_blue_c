
// import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import OptionsForm from "./OptionsForm";
import {useState} from "react";
// import { useAuth0 } from "@auth0/auth0-react";

export default function SettingsButton(){
    /*
        user settings button,
        will open a menu with options to change user settings.
        uses auth0 for authentication, so options will include:

        - change password
        - change email
        - delete account


    */
    const [animation, setAnimation] = useState(false);
    const [isFinished, setIsFinished] = useState(true);
    const handleCloseSettings = () => setAnimation(true);
    const handleOpenSettings = () => { setAnimation(false); setIsFinished(false); };
    const handleAnimationEnd = () => {
        if (animation) setIsFinished(true);
    };


    return (
        <>
            {!isFinished && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 ">
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
                        <div className="top bg-zinc-900 rounded-t-lg flex-[0.2] flex items-center justify-end text-xs">
                            <button 
                                onClick={handleCloseSettings}
                                className="w-5 h-5 rounded-full bg-orange-600 hover:bg-red-600 mr-5 cursor-pointer">
                            </button>
                        </div>

                        <OptionsForm />
                        
                    </div>
                </div>
            )}

            {isFinished && (
                <div 
                    onClick={handleOpenSettings}
                    className={`
                        pointer-events-auto
                        absolute left-0 top-5 w-12 h-12 bg-zinc-500 hover:bg-zinc-400 rounded-r-lg flex items-center justify-center cursor-pointer text-white shadow-lg origin-left z-9        
                        ${animation ? 'motion-scale-x-in-0 motion-duration-700 motion-ease-spring-bouncier motion-loop-once' : ''}
                    `}
                >
                    <button className="cursor-pointer">
                        <FontAwesomeIcon icon={faGear} size="lg" />
                    </button>
                </div>
            )}
        </>
    );
}