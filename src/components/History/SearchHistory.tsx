import { useState } from "react";
import { HistoryList } from "./HistoryList";
import { useQuery } from "@tanstack/react-query";
import historyDatafetch from "../../queryOptions/historyDataFetch"
import { useAuth0 } from "@auth0/auth0-react";

export function SearchHistory() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const { getAccessTokenSilently } = useAuth0()

  const { isPending, error, data: historyData } = useQuery(historyDatafetch(getAccessTokenSilently));

  if (error) return "An error has occurred: " + error.message;
  else if (isPending) return "Loading...";

  const toggle = (index: number) =>
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );


  return (
    <div className="SearchHistory bg-stone-950/40 p-4 rounded-lg shadow-md h-[72vh] overflow-y-auto mt-4">
      <HistoryList
        items={historyData}
        openIndexes={openIndexes}
        toggle={toggle}
      />
    </div>
  );
}
