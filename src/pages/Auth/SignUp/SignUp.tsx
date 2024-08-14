import { App, Button, Flex, Input, Typography } from "antd";
import { FunctionComponent, useState } from "react";
import { Form } from "antd";
import styles from "./SignUp.module.scss";
import PasswordStrengthbar from "../../../components/PasswordStrengthBar/PasswordStrengthBar";
import { callRegister, doesUsernameExist } from "../../../services/userService";
import { useNavigate } from "react-router-dom";
import { passwordRule } from "../rule";
interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = () => {
  const [isValid, setValid] = useState<boolean>(false);
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const password = Form.useWatch("password", form);
  return (
    <div>
      <Flex align="center" justify="center" style={{ marginTop: "-40px" }}>
        <Typography.Title level={3}>Đăng ký tài khoản</Typography.Title>
      </Flex>
      <Flex justify="center">
        <div className={styles["signup-description"]}>
          VUI LÒNG ĐĂNG KÝ TÀI KHOẢN ĐỂ ĐĂNG NHẬP VÀO HỆ THỐNG
        </div>
      </Flex>
      <Flex justify="center" style={{ marginTop: "0px" }}>
        <Form
          layout="vertical"
          className={`${styles["form-wrapper"]} ${isValid && styles["shake"]}`}
          form={form}
        >
          <Form.Item
            label="Họ tên"
            name="fullname"
            key="fullname"
            rules={[
              {
                required: true,
                message: "Họ tên không được để trống",
              },
              {
                max: 100,
                message: "Họ tên không được vượt quá 100 kí tự",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tên tài khoản"
            name="username"
            key="username"
            validateDebounce={1000}
            rules={[
              {
                required: true,
                message: "Tên tài khoản không được để trống",
              },
              {
                validator: async (_, value: string) => {
                  const res = await doesUsernameExist(value);
                  console.log(res);
                  if (res?.data?.data?.hasExisted) {
                    return Promise.reject("Tên tài khoản đã tồn tại");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            key="email"
            rules={[
              {
                type: "email",
                message: "Email không hợp lệ",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            key="password"
            rules={passwordRule}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <PasswordStrengthbar password={password ?? ""} />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            dependencies={["password"]}
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: "Xác nhận mật khẩu không được để trống",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Không khớp với mật khẩu!"));
                },
              }),
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{ width: "100%" }}
              onClick={async () => {
                const fieldErrors = form.getFieldsError();
                const hasError = fieldErrors.some(
                  (field) => field.errors.length > 0
                );
                if (hasError) {
                  setValid(true);
                  setTimeout(() => {
                    setValid(false);
                  }, 1000);
                }
                const res = await callRegister(form.getFieldsValue());
                if (res?.status === 400) {
                  notification.error({ message: res.data.data.errors });
                  return;
                } else {
                  notification.success({ message: "Đăng ký thành công" });
                  navigate("/auth/login");
                }
              }}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
};

export default SignUp;
