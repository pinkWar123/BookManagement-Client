import { Avatar, Button, Dropdown, Flex, Space } from "antd";
import type { MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import { ChevronDown, LogOut } from "react-feather";
interface MainHeaderProps {
  style: Record<string, unknown>;
}

const MainHeader: FunctionComponent<MainHeaderProps> = ({ style }) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Space onClick={logout}>
          Đăng xuất <LogOut />
        </Space>
      ),
    },
  ];
  return (
    <Header style={{ display: "flex", justifyContent: "flex-end", ...style }}>
      <div style={{ color: "white" }}>
        <Flex gap="small" style={{ marginTop: "-10px" }}>
          {user && (
            <Space>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <ChevronDown style={{ marginTop: "10px", cursor: "pointer" }} />
              </Dropdown>
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
              <div style={{ cursor: "pointer", userSelect: "none" }}>
                <div>{user?.username}</div>
                <div style={{ marginTop: "-45px" }}>{user?.roles}</div>
              </div>
            </Space>
          )}
          {!user && (
            <Button
              style={{ marginTop: "20px" }}
              onClick={() => navigate("/auth/login")}
            >
              Đăng ký / Đăng nhập
            </Button>
          )}
        </Flex>
      </div>
    </Header>
  );
};

export default MainHeader;
