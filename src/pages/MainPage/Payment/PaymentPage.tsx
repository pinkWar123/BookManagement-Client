import { FunctionComponent, useState } from "react";
import CustomerInfo from "../../../components/CustomerInfo/CustomerInfo";
import { Button, Divider, Flex, Form, InputNumber, Typography } from "antd";
import { DollarSign } from "react-feather";

interface PaymentPageProps {}

const PaymentPage: FunctionComponent<PaymentPageProps> = () => {
  const [pay, setPay] = useState<number>();
  return (
    <>
      <CustomerInfo />
      <div style={{ padding: "0px 40px" }}>
        <Flex justify="space-between">
          <Typography.Title>Nợ cũ</Typography.Title>
          <Typography.Title style={{ marginTop: "20px" }}>
            5,000,000
          </Typography.Title>
        </Flex>

        <Flex justify="space-between">
          <Typography.Title>Thanh toán</Typography.Title>
          <Form.Item style={{ marginTop: "40px" }}>
            <InputNumber
              placeholder="Nhập số tiền"
              style={{ width: "500px" }}
              onChange={(e) => setPay(e as number)}
            />
          </Form.Item>
        </Flex>

        <Flex justify="flex-end">
          <Button type="primary" icon={<DollarSign />}>
            Thu tiền
          </Button>
        </Flex>

        <Divider style={{ border: "1px solid #333", marginTop: "50px" }} />

        <Flex justify="space-between">
          <Typography.Title>Nợ mới</Typography.Title>
          <Typography.Title style={{ marginTop: "20px" }}>
            {pay !== undefined ? 5000000 - pay : undefined}
          </Typography.Title>
        </Flex>
      </div>
    </>
  );
};

export default PaymentPage;
