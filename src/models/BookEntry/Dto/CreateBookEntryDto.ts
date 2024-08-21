import { IBookEntryDetail } from "../../BookEntryDetail/BookEntryDetail";

export interface CreateBookEntryDto {
  entryDate: string;
  bookEntryDetails: IBookEntryDetail[];
}
