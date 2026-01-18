
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function SettingsButton(){
    return (
        <div 
            className={`
                pointer-events-auto
                absolute left-0 top-5 w-12 h-12 bg-stone-700 hover:bg-stone-600 rounded-r-lg flex items-center justify-center cursor-pointer text-white shadow-lg origin-left         
                motion-scale-x-in-0 motion-duration-700 motion-ease-spring-bouncier motion-loop-once z-50
            `}
        >
            <button className="cursor-pointer">
                <FontAwesomeIcon icon={faGear} size="lg" />
            </button>
        </div>
    );
}