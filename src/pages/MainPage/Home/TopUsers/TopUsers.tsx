import { Card, Typography } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import TopUserItem from "./TopUserItem";
import { CustomerViewDto } from "../../../../models/Customer/Dto/CustomerViewDto";
import { callGetTopCustomers } from "../../../../services/customerService";
import styles from "./TopUsers.module.scss";
import lineChartStyles from "../HomePage.module.scss";
import dayjs from "dayjs";

interface TopUserProps {}

const TopUser: FunctionComponent<TopUserProps> = () => {
  const [customers, setCustomers] = useState<CustomerViewDto[]>();
  useEffect(() => {
    const fetchCustomers = async () => {
      const today = dayjs();
      const res = await callGetTopCustomers(today.month() + 1, today.year());
      if (res.data) {
        console.log(res.data);
        setCustomers(res.data);
      }
    };
    fetchCustomers();
  }, []);
  return (
    <Card style={{ minHeight: "300px" }} className={lineChartStyles["shadow"]}>
      <Typography.Title level={4} className={styles["title"]}>
        Top thành viên
      </Typography.Title>
      <div>
        {customers?.map((user) => (
          <TopUserItem
            avatar="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
            fullName={user.customerName}
            email={user.email ?? ""}
          />
        ))}
      </div>
    </Card>
  );
};

export default TopUser;
