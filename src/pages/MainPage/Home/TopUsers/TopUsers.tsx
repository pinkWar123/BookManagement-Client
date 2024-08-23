import { Card } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import TopUserItem from "./TopUserItem";
import { CustomerViewDto } from "../../../../models/Customer/Dto/CustomerViewDto";
import { callGetTopCustomers } from "../../../../services/customerService";
import dayjs from "dayjs";

interface TopUserProps {}

const USERS = [
  {
    avatar:
      "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    fullName: "Helena",
    email: "email@figmasfakeddomain.net",
  },
  {
    avatar:
      "data:image/jpeg;base64,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",
    fullName: "Oscar",
    email: "email@figmasfakeddomain.net",
  },
  {
    avatar:
      "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    fullName: "Daniel",
    email: "email@figmasfakeddomain.net",
  },
  {
    avatar:
      "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    fullName: "Daniel Jay Park",
    email: "email@figmasfakeddomain.net",
  },
  {
    avatar:
      "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    fullName: "Mark Rojas",
    email: "email@figmasfakeddomain.net",
  },
];

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
    <Card>
      <div>Top thành viên</div>
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
