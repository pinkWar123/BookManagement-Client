import { CreatePaymentReceiptDto } from "../models/PaymentReceipt/CreatePaymentReceiptDto";
import { PaymentReceiptDto } from "../models/PaymentReceipt/PaymentReceiptDto";
import { IResponse } from "../types/response";
import axiosInstance from "./config";

export const createPaymentReceipt = async (
  createPaymentReceiptDto: CreatePaymentReceiptDto
) => {
  return (
    await axiosInstance.post<IResponse<PaymentReceiptDto>>(
      "payment-receipt",
      createPaymentReceiptDto
    )
  ).data;
};
