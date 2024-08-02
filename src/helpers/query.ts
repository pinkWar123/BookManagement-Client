import { IListQuery } from "../types/query";

export const buildQuery = (base: string, query: IListQuery) => {
  let queryString = base;
  queryString += `?pageNumber=${query.pageNumber ?? 1}&pageSize=${
    query.pageSize ?? 5
  }`;
  if (query.isDescending) queryString += `&isDescending=${query.isDescending}`;
  if (query.sortBy) queryString += `&sortBy=${query.sortBy}`;
  return queryString;
};
