import { FunctionComponent, useState } from "react";
import { FEATURES } from "./featureList";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import styles from "./Sidebar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { getLastSegment } from "../../../helpers/location";
interface SidebarProps {}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = FEATURES.map((feature) =>
  getItem(feature.title, feature.to, feature.icon)
);

const Sidebar: FunctionComponent<SidebarProps> = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div style={{ color: "red" }}>Quản lý sách</div>
      <Menu
        theme="dark"
        defaultSelectedKeys={[`/${getLastSegment(location)}`]}
        mode="inline"
        items={items}
        className={styles["menu"]}
        onClick={(info) => navigate(info.key)}
      />
    </Sider>
  );
};

export default Sidebar;
