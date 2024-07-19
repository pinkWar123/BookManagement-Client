export interface IProvinceResponse {
  exitCode: number;
  data?: {
    nItems: number;
    nPages: number;
    data?: IProvince[];
  };
}

export interface IProvince {
  _id: string;
  name: string;
  slug: string;
  type: string;
  name_with_type: string;
  code: string;
  isDelete: boolean;
}
