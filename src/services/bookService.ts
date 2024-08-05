import { BookViewDto } from "../models/Book/Dto/BookViewDto";
import { CreateBookDto } from "../models/Book/Dto/CreateBookDto";
import { UpdateBookDto } from "../models/Book/Dto/UpdateBookDto";
import { IPagedResponse, IResponse } from "../types/response";
import axiosInstance from "./config";

export const callGetAllBooks = async (
  params: Record<string, string | number>
) => {
  return (
    await axiosInstance.get<IPagedResponse<BookViewDto>>("book", {
      params,
    })
  ).data;
};

export const callCreateNewBook = async (createBookDto: CreateBookDto) => {
  return (
    await axiosInstance.post<IResponse<BookViewDto>>("book", createBookDto)
  ).data;
};

export const callUpdateBook = async (
  bookId: number,
  updateBookDto: UpdateBookDto
) => {
  return (
    await axiosInstance.put<IResponse<BookViewDto>>(
      `book/${bookId}`,
      updateBookDto
    )
  ).data;
};
