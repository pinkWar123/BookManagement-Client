import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL,
} from "../constants/pagination";

interface QueryParams {
  [key: string]: string;
}

interface PaginationParams {
  pageNumber: number;
  pageSize: number;
  total: number;
}

const useQueryParams = () => {
  const location = useLocation();
  const [params, setParams] = useState<QueryParams>();
  const [pagination, setPagination] = useState<PaginationParams>({
    pageNumber: DEFAULT_PAGE_NUMBER,
    pageSize: DEFAULT_PAGE_SIZE,
    total: DEFAULT_TOTAL,
  });
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params: QueryParams = {};
    let pageNumber = DEFAULT_PAGE_NUMBER;
    let pageSize = DEFAULT_PAGE_SIZE;
    searchParams.forEach((value, key) => {
      if (key === "pageNumber") {
        pageNumber = parseInt(value);
      } else if (key === "pageSize") {
        pageSize = parseInt(value);
      } else params[key] = value;
    });
    setParams(params);
    setPagination({
      pageNumber,
      pageSize,
      total: DEFAULT_TOTAL,
    });
  }, [location.search]);

  const handleChangePage = (pageNumber: number) => {
    setPagination((prev) => ({ ...prev, pageNumber }));
  };

  const getQuery = useCallback(() => {
    return {
      ...params,
      pageNumber: pagination.pageNumber,
      pageSize: pagination.pageSize,
    };
  }, [pagination.pageNumber, pagination.pageSize, params]);

  return {
    params,
    pagination,
    setPagination,
    handleChangePage,
    getQuery,
  };
};

export default useQueryParams;
