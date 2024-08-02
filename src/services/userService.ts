import { IPagedResponse, IResponse } from "../types/response";
import { CheckUserDto } from "../models/User/Dto/checkUserDto";
import axiosInstance from "./config";
import { RegisterDto } from "../models/User/Dto/registerDto";
import { UserDto } from "../models/User/Dto/userDto";
import { LoginDto } from "../models/User/Dto/loginDto";
import { IListUserQuery } from "../types/query";
import { buildQuery } from "../helpers/query";
import { UserViewDto } from "../models/User/Dto/userViewDto";
import { ChangeUserRoleDto } from "../models/User/Dto/changeUserRoleDto";

export const doesUsernameExist = async (username: string) => {
  return await axiosInstance.get<IResponse<CheckUserDto>>(
    `/users/check-username?username=${username}`
  );
};

export const callRegister = async (registerDto: RegisterDto) => {
  return await axiosInstance.post<IResponse<UserDto>>(
    `/users/register`,
    registerDto
  );
};

export const callLogin = async (loginDto: LoginDto) => {
  return (
    await axiosInstance.post<IResponse<UserDto>>(`/users/login`, loginDto)
  ).data;
};

export const callGetUserByAccessToken = async (accessToken: string) => {
  return (
    await axiosInstance.get<IResponse<UserDto>>(
      `/users/get-user?accessToken=${accessToken}`
    )
  ).data;
};

export const callGetAllUsers = async (query: IListUserQuery) => {
  let base = buildQuery("/users", query);
  if (query.fullName) base += `&fullName=${query.fullName}`;
  if (query.role) base += `&role=${query.role}`;
  return (await axiosInstance.get<IPagedResponse<UserViewDto>>(base)).data;
};

export const callChangeUserRole = async (
  userId: string,
  changeUserRoleDto: ChangeUserRoleDto
) => {
  return (
    await axiosInstance.post<IResponse<UserViewDto>>(
      `/users/change-role/${userId}`,
      changeUserRoleDto
    )
  ).data;
};

export const callDeleteUser = async (userId: string) => {
  return (
    await axiosInstance.delete<IResponse<UserViewDto>>(`/users/${userId}`)
  ).data;
};
