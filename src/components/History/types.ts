// Data from backend

export type HistoryItemInterface = {
  id: number;
  subject: string;
  parent_id: number | null;
  children: HistoryItemInterface[];
  data: Record<string, unknown> | null;
};