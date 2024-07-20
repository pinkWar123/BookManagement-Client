import { Avatar, Col, Row } from "antd";
import { FunctionComponent } from "react";
import styles from "./TopUsers.module.scss";
interface TopUserItemProps {
  avatar: string;
  fullName: string;
  email: string;
}

const TopUserItem: FunctionComponent<TopUserItemProps> = ({
  avatar,
  fullName,
  email,
}) => {
  return (
    <Row gutter={16} className={styles["item-wrapper"]}>
      <Col span={4}>
        <Avatar src={avatar} />
      </Col>
      <Col span={20}>
        <strong>{fullName}</strong>
        <div>{email}</div>
      </Col>
    </Row>
  );
};

export default TopUserItem;
