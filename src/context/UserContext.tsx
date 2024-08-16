import React, { createContext, useState, ReactNode, useEffect } from "react";
import { UserDto } from "../models/User/Dto/userDto";
import { LoginDto } from "../models/User/Dto/loginDto";
import { App } from "antd";
import { useNavigate } from "react-router-dom";
import { callGetUserByAccessToken, callLogin } from "../services/userService";
import axios from "axios";
import { useAxiosInterceptors } from "../hooks/useAxios";

export interface UserContextProps {
  user: UserDto | undefined;
  login: (userData: LoginDto) => Promise<void>;
  logout: () => void;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { notification } = App.useApp();
  useAxiosInterceptors();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDto | undefined>();
  useEffect(() => {
    const getUser = async () => {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) return;
      const res = await callGetUserByAccessToken(accessToken);
      console.log(res);
      if (res?.data) {
        setUser(res.data);
      }
    };

    getUser();
  }, []);

  const login = async (loginDto: LoginDto) => {
    try {
      const res = await callLogin(loginDto);
      console.log(res);
      if (res?.data?.isAuthenticated == true) {
        notification.success({ message: "Đăng nhập thành công" });
        localStorage.setItem("token", res.data.token ?? "");
        setUser(res.data);
        navigate("/home");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.message);
        notification.error({
          message: "Tên đăng nhập hoặc mật khẩu không đúng",
        });
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(undefined);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
