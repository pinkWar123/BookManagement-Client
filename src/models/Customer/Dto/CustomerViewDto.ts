export interface CustomerViewDto {
  id: number;
  customerName: string;
  totalDebt: number;
  address: string;
  phoneNumber: string;
  email?: string;
}
