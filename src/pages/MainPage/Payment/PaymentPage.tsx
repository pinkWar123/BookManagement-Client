import { FunctionComponent } from "react";
import PaymentTable from "./PaymentTable";
import { Flex, Typography } from "antd";

interface PaymentPageProps {}

const PaymentPage: FunctionComponent<PaymentPageProps> = () => {
  return (
    <>
      <Flex justify="center">
        <Typography.Title level={3}>Danh sách khách hàng</Typography.Title>
      </Flex>
      <PaymentTable />
    </>
  );
};

export default PaymentPage;
