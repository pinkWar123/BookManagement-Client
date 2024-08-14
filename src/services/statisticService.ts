import { IncomeViewDto } from "../models/Statistics/incomeViewDto";
import { IResponse } from "../types/response";
import axiosInstance from "./config";

export const callGetIncomeByMonth = async (month: number, year: number) => {
  return (
    await axiosInstance.get<IResponse<IncomeViewDto>>("statistic/income", {
      params: { month, year },
    })
  ).data;
};
