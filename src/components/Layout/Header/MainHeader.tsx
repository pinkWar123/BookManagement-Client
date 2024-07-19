import { Avatar, Button, Flex } from "antd";
import { Header } from "antd/es/layout/layout";
import { FunctionComponent } from "react";
import styles from "./MainHeader.module.scss";
import { useNavigate } from "react-router-dom";
interface MainHeaderProps {}

const MainHeader: FunctionComponent<MainHeaderProps> = () => {
  const navigate = useNavigate();
  return (
    <Header style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{ color: "white" }}>
        <Flex gap="small" style={{ marginTop: "-10px" }}>
          <Avatar
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
            style={{ marginTop: "24px" }}
          />
          <div>
            <div>Triệu Gia Huy</div>
            <div style={{ marginTop: "-45px" }}>Quản lý</div>
          </div>
          <Button
            style={{ marginTop: "20px" }}
            onClick={() => navigate("/auth/login")}
          >
            Bấm vào đây để qua trang auth nè
          </Button>
        </Flex>
      </div>
    </Header>
  );
};

export default MainHeader;
