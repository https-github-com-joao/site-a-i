export interface ICustomPagination {
  currentPage: number;
  from: number;
  lastPage?: number;
  perPage: number;
  to: number;
  total?: number;
  isFromStart: true;
};

export interface IPaginate {
  perPage: number;
  currentPage: number;
  isLengthAware?: boolean;
};

export interface IResponseWithPagination {
  data: any;
  pagination: ICustomPagination;
};
