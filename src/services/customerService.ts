import { CreateCustomerDto } from "../models/Customer/Dto/CreateCustomerDto";
import { CustomerViewDto } from "../models/Customer/Dto/CustomerViewDto";
import { IPagedResponse, IResponse } from "../types/response";
import axiosInstance from "./config";

export const callCreateCustomer = async (
  createCustomerDto: CreateCustomerDto
) => {
  return (
    await axiosInstance.post<IResponse<CustomerViewDto>>(
      "customers",
      createCustomerDto
    )
  ).data;
};

export const callGetCustomersByName = async (customerName: string) => {
  return (
    await axiosInstance.get<IPagedResponse<CustomerViewDto>>(
      `customers?customerName=${customerName}&current=1&pageSize=5`
    )
  ).data;
};

export const callGetCustomers = async (
  query: Record<string, string | number | boolean>
) => {
  return (
    await axiosInstance.get<IPagedResponse<CustomerViewDto>>(`customers`, {
      params: query,
    })
  ).data;
};

export const callGetTopCustomers = async (month: number, year: number) => {
  return (
    await axiosInstance.get<IResponse<CustomerViewDto[]>>(
      "customers/getTop5CustomerPerMonth",
      {
        params: { month, year },
      }
    )
  ).data;
};
