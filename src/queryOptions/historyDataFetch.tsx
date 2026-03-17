import { queryOptions } from "@tanstack/react-query";

import { getUrl } from "../urlGetter";
const url = getUrl();

import { type HistoryItemInterface } from "../components/History/types";


export default function historyDatafetch(getAccessTokenSilently: () => Promise<string>) {
    return queryOptions<HistoryItemInterface[]>({
    queryKey: ["historyData"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      const res = await fetch(`${url}/get-roadmap`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return res.json();
    },
    
    select: (data) => data.filter((item) => item.children.length > 0),
  });
}