import { BookEntryDto } from "../models/BookEntry/Dto/BookEntryDto";
import { CreateBookEntryDto } from "../models/BookEntry/Dto/CreateBookEntryDto";
import { IResponse } from "../types/response";
import axiosInstance from "./config";

export const callCreateBookEntry = async (
  createBookEntryDto: CreateBookEntryDto
) => {
  return (
    await axiosInstance.post<IResponse<BookEntryDto>>(
      "book-entries",
      createBookEntryDto
    )
  ).data;
};
