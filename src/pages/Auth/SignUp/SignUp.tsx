import { Button, Flex, Input, Typography } from "antd";
import { FunctionComponent, useState } from "react";
import { Form } from "antd";
import styles from "./SignUp.module.scss";
import PasswordStrengthbar from "../../../components/PasswordStrengthBar/PasswordStrengthBar";
interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = () => {
  const [password, setPassword] = useState<string>("");
  const [isValid, setValid] = useState<boolean>(false);
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
      <Flex justify="center" style={{ marginTop: "50px" }}>
        <Form
          layout="vertical"
          className={`${styles["form-wrapper"]} ${isValid && styles["shake"]}`}
        >
          <Form.Item label="Họ tên" name="fullname" key="fullname">
            <Input />
          </Form.Item>

          <Form.Item label="Tên tài khoản" name="username" key="username">
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" key="email">
            <Input type="email" />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phone" key="phone">
            <Input type="phone" />
          </Form.Item>

          <Form.Item label="Mật khẩu" name="password" key="password">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordStrengthbar password={password} />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{ width: "100%" }}
              onClick={() => setValid(true)}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
};

export default SignUp;
