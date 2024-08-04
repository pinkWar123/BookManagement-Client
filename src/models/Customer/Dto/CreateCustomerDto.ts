export interface CreateCustomerDto {
  customerName: string;
  totalDebt: number;
  address: string;
  phoneNumber: string;
  email?: string;
}
