import { BookViewDto } from "../models/Book/Dto/BookViewDto";
import { CreateBookDto } from "../models/Book/Dto/CreateBookDto";
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
