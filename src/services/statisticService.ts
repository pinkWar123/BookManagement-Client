import { IncomeByMonthDto } from "../models/Statistics/IncomeByMonthDto";
import { IncomeViewDto } from "../models/Statistics/IncomeViewDto";
import { IResponse } from "../types/response";
import axiosInstance from "./config";

export const callGetIncomeByMonth = async (month: number, year: number) => {
  return (
    await axiosInstance.get<IResponse<IncomeViewDto>>("statistic/income", {
      params: { month, year },
    })
  ).data;
};

export const callGetCustomerCount = async () => {
  return (
    await axiosInstance.get<IResponse<number>>("statistic/customer-count")
  ).data;
};

export const callGetInvoiceCountByMonth = async (
  month: number,
  year: number
) => {
  return (
    await axiosInstance.get<IResponse<number>>("statistic/invoice-count", {
      params: { month, year },
    })
  ).data;
};

export const callGetIncomeHistory = async () => {
  return (
    await axiosInstance.get<IResponse<IncomeByMonthDto[]>>(
      "statistic/income-history"
    )
  ).data;
};
