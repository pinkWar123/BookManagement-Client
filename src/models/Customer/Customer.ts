import { IAdress } from "../../interfaces/address";

export interface ICustomer {
  customerName: string;
  totalDebt: number;
  address: IAdress;
  phoneNumber: string;
  email: string;
}
