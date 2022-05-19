export interface IPaginateVueTable {
  total?: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  prev_page_url: string | null,
  next_page_url: string | null,
  data: any;
};
