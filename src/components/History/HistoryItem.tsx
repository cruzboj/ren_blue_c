
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faL } from "@fortawesome/free-solid-svg-icons";
import { type HistoryItemInterface } from "./types";

type HistoryItemProps = {
  item: HistoryItemInterface;
  isOpen: boolean;
  toggle: () => void;
};


export function HistoryItem({ item, isOpen, toggle }: HistoryItemProps) {
  return (
    <li className="text-gray-300 border-l-4 border-green-500 relative">
      <div
        className="cursor-pointer font-semibold select-none flex justify-between"
        onClick={toggle}
      >
        <span className="ml-2">{item.subject}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`ml-2 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {item.children.length > 0 && (
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-40 mt-1" : "max-h-0"
          }`}
        >
          <ul className="list-disc pl-5">
            {item.children.map((child) => (
              <li key={child.id} className="text-gray-300 list-none">
                <FontAwesomeIcon icon={faL} className="mr-1" />
                {child.subject}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}