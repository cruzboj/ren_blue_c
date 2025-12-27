import { HistoryItem } from "./HistoryItem";
import { type HistoryItemInterface } from "./types";

type HistoryListProps = {
  items: HistoryItemInterface[];
  openIndexes: number[];
  toggle: (index: number) => void;
};

export function HistoryList({ items, openIndexes, toggle }: HistoryListProps) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <HistoryItem
          key={item.id} // use unique ID instead of index
          item={item}
          isOpen={openIndexes.includes(index)}
          toggle={() => toggle(index)}
        />
      ))}
    </ul>
  );
}