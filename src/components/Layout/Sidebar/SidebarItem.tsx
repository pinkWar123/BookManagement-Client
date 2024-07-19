import { Flex } from "antd";
import { FunctionComponent } from "react";
import styles from "./Sidebar.module.scss";
interface SidebarItemProps {
  title: string;
  icon: React.ReactElement;
}

const SidebarItem: FunctionComponent<SidebarItemProps> = ({ title, icon }) => {
  return (
    <Flex gap="small" className={styles["item-wrapper"]}>
      <div>{icon}</div>
      <div className={styles["title"]}>{title}</div>
    </Flex>
  );
};

export default SidebarItem;
