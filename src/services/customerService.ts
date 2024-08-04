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
