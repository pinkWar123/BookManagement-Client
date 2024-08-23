export interface DebtReportDto {
  reportId: number;
  customerId: number;
  customerName: string;
  initialDebt: number;
  finalDebt: number;
  additionalDebt: number;
}
