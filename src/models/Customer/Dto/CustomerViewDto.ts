export interface CustomerViewDto {
  id: string;
  customerName: string;
  totalDebt: number;
  address: string;
  phoneNumber: string;
  email?: string;
}
