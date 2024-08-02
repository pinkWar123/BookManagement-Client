export interface IListQuery {
  sortBy?: string;
  isDescending?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

export interface IListUserQuery extends IListQuery {
  fullName?: string;
  role?: string;
}
