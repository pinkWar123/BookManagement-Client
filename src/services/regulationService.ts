import { RegulationViewDto } from "../models/Regulation/RegulationViewDto";
import { UpdateRegulationDto } from "../models/Regulation/UpdateRegulationDto";
import { IPagedResponse, IResponse } from "../types/response";
import axiosInstance from "./config";

export const callGetAllRegulations = async () => {
  return (
    await axiosInstance.get<IPagedResponse<RegulationViewDto>>(
      `regulation?pageNumber=${1}&pageSize=${5}`
    )
  ).data;
};

export const callUpdateRegulation = async (
  regulationId: number,
  updateRegulation: UpdateRegulationDto
) => {
  return (
    await axiosInstance.put<IResponse<RegulationViewDto>>(
      `regulation/${regulationId}`,
      updateRegulation
    )
  ).data;
};
