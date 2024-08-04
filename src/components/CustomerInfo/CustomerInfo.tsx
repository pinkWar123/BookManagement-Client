import { Col, Form, Input, Row, Typography } from "antd";
import { FunctionComponent } from "react";
import CustomerDebounceSelect from "../Debouncer/CustomerDebounceSelect";
import CustomDivider from "../CustomDivider/CustomDivider";
import { ICustomer } from "../../models/Customer/Customer";

interface CustomerInfoProps {}

const CustomerInfo: FunctionComponent<CustomerInfoProps> = () => {
  const [form] = Form.useForm();
  const handleCustomerChange = (value: ICustomer) => {
    form.setFieldsValue(value);
  };
  return (
    <>
      <CustomDivider />
      <Typography.Title level={3}>Thông tin khách hàng</Typography.Title>
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="fullName" key="fullName" label="Họ tên">
              <CustomerDebounceSelect onChange={handleCustomerChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={"address"} key="address" label="Địa chỉ">
              <Input placeholder="Địa chỉ" disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              key="phoneNumber"
              label="Số điện thoại"
            >
              <Input placeholder="Số điện thoại" disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="email" key="email" label="Email">
              <Input placeholder="Email" disabled />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CustomerInfo;
