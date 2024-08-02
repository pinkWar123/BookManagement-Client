export interface IResponse<T> {
  succeeded: boolean;
  errors: string[] | null;
  message?: string;
  data: T;
  problemDetails?: {
    errors: Map<string, string[]>;
    type: string;
    title: string;
    status: number;
  };
  statusCode: number;
}

export interface IErrorResponse<T> {
  data: T;
}

export interface IPagedResponse<T> {
  pageNumber: number;
  pageSize: number;
  firstPage?: string;
  lastPage?: string;
  totalPages: number;
  totalRecords: number;
  nextPage?: string;
  previousPage?: string;
  data: T[];
}
