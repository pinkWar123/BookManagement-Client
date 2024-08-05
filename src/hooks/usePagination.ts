import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
  total: number;
}

export const usePagination = (
  defaultPageSize: number = 10,
  defaultPageNumber: number = 1
) => {
  const location = useLocation();
  const [pagination, setPagination] = useState<PaginationParams>({
    pageNumber: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageSize = parseInt(
      searchParams.get("pageSize") || `${defaultPageSize}`,
      10
    );
    const pageNumber = parseInt(
      searchParams.get("pageNumber") || `${defaultPageNumber}`,
      10
    );

    setPagination((prev) => ({ ...prev, pageNumber, pageSize }));
  }, [location.search, defaultPageNumber, defaultPageSize]);

  const handleChangePage = (pageNumber: number) => {
    setPagination((prev) => ({ ...prev, pageNumber }));
  };

  return { pagination, setPagination, handleChangePage };
};
