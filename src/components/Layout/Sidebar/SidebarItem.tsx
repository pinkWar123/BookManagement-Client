import { Flex } from "antd";
import React, { ComponentType, FunctionComponent } from "react";
import styles from "./Sidebar.module.scss";
import { PageGuardProps } from "../../Guard/Guard";
interface SidebarItemProps {
  title: string;
  icon: React.ReactElement;
  guard?: ComponentType<PageGuardProps>;
}

const SidebarItem: FunctionComponent<SidebarItemProps> = ({
  title,
  icon,
  guard,
}) => {
  const Guard = guard || React.Fragment; // Use GuardComponent if available, otherwise a Fragment
  console.log(guard);
  return (
    <Guard>
      <Flex gap="small" className={styles["item-wrapper"]}>
        <div>{icon}</div>
        <div className={styles["title"]}>{title}</div>
      </Flex>
    </Guard>
  );
};

export default SidebarItem;
