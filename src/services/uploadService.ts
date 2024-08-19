import { UploadResultDto } from "../models/Upload/Dto/UploadResultDto";
import { IResponse } from "../types/response";
import axiosInstance from "./config";

export const callUploadFiles = async (formData: FormData) => {
  return (
    await axiosInstance.post<IResponse<UploadResultDto>>(
      "Attachment",
      formData,
      {
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
  ).data;
};
