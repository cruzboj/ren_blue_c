import { useEffect, useState } from "react";
import { HistoryList } from "./HistoryList";


import { useQuery } from "@tanstack/react-query";

import historyDatafetch from "../../queryOptions/historyDataFetch"


export function SearchHistory() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const { isPending, error, data: historyData } = useQuery(historyDatafetch());

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    const toggle = (index: number) =>
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );

    return (
      <div className="SearchHistory bg-stone-950/40 p-4 rounded-lg shadow-md h-[72vh] overflow-y-auto">
        <HistoryList
          items={historyData}
          openIndexes={openIndexes}
          toggle={toggle}
        />
      </div>
    );
  }
