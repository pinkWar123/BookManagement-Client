import { App, Button, Flex, Form, Typography } from "antd";
import { FunctionComponent } from "react";
import styles from "./Login.module.scss";
import Input from "antd/es/input/Input";
import { LoginDto } from "../../../models/User/Dto/loginDto";
import { useUser } from "../../../hooks/useUser";
import { isAxiosError } from "axios";
interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const { login } = useUser();
  const { message } = App.useApp();
  const handleLogin = async (loginDto: LoginDto) => {
    try {
      await login(loginDto);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 201)
          message.error({
            content: "Username hoặc password bị sai!!! Vui lòng nhập lại",
          });
      }
    }
  };
  return (
    <>
      <Flex justify="center" style={{ marginTop: "60px" }}>
        <Typography.Title level={3}>Đăng ký tài khoản</Typography.Title>
      </Flex>
      <Flex justify="center">
        <div className={styles["signup-description"]}>
          VUI LÒNG ĐĂNG KÝ TÀI KHOẢN ĐỂ ĐĂNG NHẬP VÀO HỆ THỐNG
        </div>
      </Flex>
      <Flex justify="center" style={{ marginTop: "100px" }}>
        <Form
          layout="vertical"
          className={styles["form-wrapper"]}
          onFinish={(value) => {
            handleLogin(value);
          }}
        >
          <Form.Item label="Tên tài khoản" name="username" key="username">
            <Input />
          </Form.Item>

          <Form.Item label="Mật khẩu" name="password" key="password">
            <Input type="password" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" style={{ width: "100%" }}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
};

export default Login;
