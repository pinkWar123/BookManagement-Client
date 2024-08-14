export interface CreateInvoiceDto {
  customerId: number;
  invoiceDate: string;
  invoiceDetails: BookEntry[];
}

export interface BookEntry {
  bookId: number;
  quantity: number;
}
