export interface InventoryReportDetailDto {
  reportId: number;
  reportMonth: number;
  reportYear: number;
  bookId: number;
  title: string;
  initialStock: number;
  finalStock: number;
  additionalStock: number;
}
