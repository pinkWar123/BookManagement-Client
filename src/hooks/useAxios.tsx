import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/config";
import { App, message } from "antd";
import { isAxiosError } from "axios";
import { handleAxiosError } from "../helpers/errorHandling";
import { useLoading } from "./useLoading";

export const useAxiosInterceptors = () => {
  const navigate = useNavigate();
  const { modal } = App.useApp();
  const { setLoading } = useLoading();
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        setLoading(true);
        // You can modify the config before the request is sent
        // For example, attach an authorization token
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // Do something with request error
        console.log(error);
        setLoading(false);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        setLoading(false);
        return response;
      },
      (error) => {
        console.log(error);
        const originalRequest = error.config;
        console.log(originalRequest);
        if (error.response.status === 401) {
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("token");
          modal.warning({
            content: "Phiên đăng nhập của bạn đã hết, vui lòng đăng nhập lại!",
            onOk: () => {
              // setUser(undefined);
              navigate("/auth/login", { replace: true });
            },
          });
          setLoading(false);
          return Promise.reject(error);

          // if (!originalRequest._retry) {
          //   ... other code
          // }
        } else {
          if (isAxiosError(error)) {
            message.error({ content: handleAxiosError(error) }, 1);
          }
        }
        setLoading(false);

        return Promise.reject(error);
      }
    );

    // Return cleanup function to remove interceptors if necessary
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);
};
