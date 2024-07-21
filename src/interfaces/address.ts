import { IDistrict } from "./districts";
import { IProvince } from "./provinces";

export interface IAdress {
  province: IProvince;
  district: IDistrict;
  address: string;
}
