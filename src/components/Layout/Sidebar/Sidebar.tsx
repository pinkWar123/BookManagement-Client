import { ComponentType, FunctionComponent, useState } from "react";
import { FEATURES } from "./featureList";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import styles from "./Sidebar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { getLastSegment } from "../../../helpers/location";
import { PageGuardProps } from "../../Guard/Guard";
import { useUser } from "../../../hooks/useUser";
interface SidebarProps {}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  guard?: ComponentType<PageGuardProps>
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    guard,
  } as MenuItem;
}

const Sidebar: FunctionComponent<SidebarProps> = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const items: MenuItem[] = FEATURES.map((feature) => {
    if (
      user?.roles &&
      user.roles?.length > 0 &&
      feature.roles?.includes(user?.roles[0])
    )
      return getItem(
        feature.title,
        feature.to,
        feature.icon,
        undefined,
        feature.guard
      );
    return null;
  });
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
