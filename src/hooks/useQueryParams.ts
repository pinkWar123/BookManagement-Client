import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const useQueryParams = (defaultPageSize?: number) => {
  const location = useLocation();
  const [params, setParams] = useState<QueryParams>(() => {
    const searchParams = new URLSearchParams(location.search);
    const params: QueryParams = {};
    searchParams.forEach((value, key) => {
      if (key !== "pageNumber" && key !== "pageSize") params[key] = value;
    });
    return params;
  });
  const [pagination, setPagination] = useState<PaginationParams>(() => {
    const searchParams = new URLSearchParams(location.search);
    let pageNumber = DEFAULT_PAGE_NUMBER;
    let pageSize = defaultPageSize ?? DEFAULT_PAGE_SIZE;
    searchParams.forEach((value, key) => {
      if (key === "pageNumber") {
        pageNumber = parseInt(value);
        console.log(pageNumber);
      } else if (key === "pageSize") {
        pageSize = parseInt(value);
      }
    });
    return { pageNumber, pageSize, total: DEFAULT_TOTAL };
  });
  const navigate = useNavigate();

  console.log(location);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params: QueryParams = {};
    let pageNumber = DEFAULT_PAGE_NUMBER;
    let pageSize = defaultPageSize ?? DEFAULT_PAGE_SIZE;
    searchParams.forEach((value, key) => {
      if (key === "pageNumber") {
        pageNumber = parseInt(value);
        console.log(pageNumber);
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

  const handleChangePage = (pageNumber: number, pageSize: number) => {
    // Get the current page number, increment it by 1, and update it in the params
    const searchParams = new URLSearchParams(location.search);

    // Update the pageNumber parameter with the new value
    searchParams.set("pageNumber", pageNumber.toString());
    searchParams.set("pageSize", pageSize.toString());

    // Update the URL with the new query string
    navigate(`${location.pathname}?${searchParams.toString()}`);
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
