import { CreateInvoiceDto } from "../models/Invoice/Dto/CreateInvoiceDto";
import { InvoiceDto } from "../models/Invoice/InvoiceDto";
import { IResponse } from "../types/response";
import axiosInstance from "./config";

export const callCreateInvoce = async (createInvoiceDto: CreateInvoiceDto) => {
  return (
    await axiosInstance.post<IResponse<InvoiceDto>>(
      "invoices",
      createInvoiceDto
    )
  ).data;
};
