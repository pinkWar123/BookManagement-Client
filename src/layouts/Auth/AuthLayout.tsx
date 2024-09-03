import { Button, Carousel, Col, Flex, Row } from "antd";
import { FunctionComponent, useEffect } from "react";
import { Book } from "react-feather";
import styles from "./Auth.module.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getLastSegment } from "../../helpers/location";
import { useUser } from "../../hooks/useUser";
interface AuthLayoutProps {}

const AuthLayout: FunctionComponent<AuthLayoutProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user) navigate("/home");
  }, [user, navigate]);

  const authNavigate = () => {
    const lastSegment = getLastSegment(location);
    if (lastSegment === "signup") {
      navigate("/auth/login");
    } else if (lastSegment === "login") {
      navigate("/auth/signup");
    }
  };

  return (
    <Row gutter={16}>
      <Col span={16} style={{ padding: "18px" }}>
        <Flex justify="space-between">
          <Flex gap="small">
            <div>
              <Book />
            </div>
            <div className={styles["brand-title"]}>Nhà sách nhóm 6</div>
          </Flex>
          <Flex gap="large">
            <div className={styles["has-account"]}>
              {getLastSegment(location) === "signup"
                ? "Đã có tài khoản?"
                : "Chưa có tài khoản?"}
            </div>
            <Button onClick={authNavigate}>
              {getLastSegment(location) === "signup" ? "Đăng nhập" : "Đăng ký"}
            </Button>
          </Flex>
        </Flex>
        <Outlet />
      </Col>

      <Col span={8}>
        <Carousel autoplay>
          <div>
            <img
              className={styles["img"]}
              src="/wallpaperflare.com_wallpaper.jpg"
            />
          </div>
          <div>
            <img className={styles["img"]} src="/bìa 2.jpg" />
          </div>
        </Carousel>
      </Col>
    </Row>
  );
};

export default AuthLayout;
