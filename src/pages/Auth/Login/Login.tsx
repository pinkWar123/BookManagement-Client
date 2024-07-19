import { Button, Flex, Form, Typography } from "antd";
import { FunctionComponent } from "react";
import styles from "./Login.module.scss";
import Input from "antd/es/input/Input";
interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
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
        <Form layout="vertical" className={styles["form-wrapper"]}>
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
