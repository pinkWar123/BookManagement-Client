import { Divider } from "antd";
import { FunctionComponent } from "react";
import styles from "./CustomDivider.module.scss";
interface CustomDividerProps {}

const CustomDivider: FunctionComponent<CustomDividerProps> = () => {
  return <Divider className={styles["border"]} />;
};

export default CustomDivider;
