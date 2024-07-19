import { Button, Carousel, Col, Flex, Row } from "antd";
import { FunctionComponent } from "react";
import { Book } from "react-feather";
import styles from "./Auth.module.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
interface AuthLayoutProps {}

const AuthLayout: FunctionComponent<AuthLayoutProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getLastSegment = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    return lastSegment;
  };

  const authNavigate = () => {
    const lastSegment = getLastSegment();
    if (lastSegment === "signup") {
      navigate("/auth/login");
    } else if (lastSegment === "login") {
      navigate("/auth/signup");
    }
  };

  return (
    <Row gutter={16}>
      <Col span={16}>
        <Flex justify="space-between">
          <Flex gap="small">
            <div>
              <Book />
            </div>
            <div className={styles["brand-title"]}>Nhà sách nhóm 6</div>
          </Flex>
          <Flex gap="large">
            <div className={styles["has-account"]}>
              {getLastSegment() === "signup"
                ? "Đã có tài khoản?"
                : "Chưa có tài khoản?"}
            </div>
            <Button onClick={authNavigate}>
              {getLastSegment() === "signup" ? "Đằng nhập" : "Đăng ký"}
            </Button>
          </Flex>
        </Flex>
        <Outlet />
      </Col>

      <Col span={8}>
        <Carousel autoplay>
          <div>
            <img
              style={{ maxWidth: "100%", height: "100vh" }}
              src="https://media.istockphoto.com/id/1135341047/vector/login-page-on-laptop-screen-notebook-and-online-login-form-sign-in-page-user-profile-access.jpg?s=612x612&w=0&k=20&c=EsJEsevxVZujj_IU_nLz4tZcvmcXTy7sQt03bpfz3ZQ="
            />
          </div>
          <div>
            <img
              style={{ maxWidth: "100%", height: "100vh" }}
              src="https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg"
            />
          </div>
          <div>
            <img
              style={{ maxWidth: "100%", height: "100vh" }}
              src="https://static.vecteezy.com/system/resources/thumbnails/011/635/825/small/abstract-square-interface-modern-background-concept-fingerprint-digital-scanning-visual-security-system-authentication-login-vector.jpg"
            />
          </div>
        </Carousel>
      </Col>
    </Row>
  );
};

export default AuthLayout;
