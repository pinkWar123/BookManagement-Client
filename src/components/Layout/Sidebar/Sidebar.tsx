import { FunctionComponent, useState } from "react";
import { FEATURES } from "./featureList";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import styles from "./Sidebar.module.scss";
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

const items: MenuItem[] = FEATURES.map((feature, index) =>
  getItem(feature.title, index, feature.icon)
);

const Sidebar: FunctionComponent<SidebarProps> = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div style={{ color: "red" }}>Quản lý sách</div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        className={styles["menu"]}
      />
    </Sider>
  );
};

export default Sidebar;
