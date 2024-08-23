import { DebtReportDto } from "../models/Report/Dto/DebtReportDto";
import { InventoryReportDetailDto } from "../models/Report/Dto/InventoryReportDto";
import { IPagedResponse } from "../types/response";
import axiosInstance from "./config";

export const callGetDebtReportsByMonth = async (
  query: Record<string, string | number>
) => {
  return (
    await axiosInstance.get<IPagedResponse<DebtReportDto>>(
      "debt-report/getAllDebtReportsByMonth",
      {
        params: query,
      }
    )
  ).data;
};

export const callGetAllInventoryReportsByMonth = async (
  query: Record<string, string | number>
) => {
  return (
    await axiosInstance.get<IPagedResponse<InventoryReportDetailDto>>(
      "inventory_report/AllbyMonthYear",
      {
        params: query,
      }
    )
  ).data;
};
