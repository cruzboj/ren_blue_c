import { queryOptions } from "@tanstack/react-query";

import { getUrl } from "../urlGetter";
const url = getUrl();

import { type HistoryItemInterface } from "../components/History/types";


export default function historyDatafetch() {
    return queryOptions<HistoryItemInterface[]>({
    queryKey: ["historyData"],
    queryFn: () => fetch(`${url}get-roadmap/`).then((res) => res.json()),
    select: (data) => data.filter((item) => item.children.length > 0),
  })
}