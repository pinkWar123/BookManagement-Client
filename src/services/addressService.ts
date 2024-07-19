import axios, { AxiosResponse } from "axios";
import { IProvinceResponse } from "../interfaces/provinces";

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    // Add any other default headers you need
  },
});

export const getAllCities = async (): Promise<
  AxiosResponse<IProvinceResponse>
> => {
  return await axiosInstance.get(
    "https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1"
  );
};
