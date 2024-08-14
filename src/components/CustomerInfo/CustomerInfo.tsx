import { Col, Form, FormInstance, Input, Row, Typography } from "antd";
import { FunctionComponent } from "react";
import CustomerDebounceSelect from "../Debouncer/CustomerDebounceSelect";
import CustomDivider from "../CustomDivider/CustomDivider";
import { CustomerViewDto } from "../../models/Customer/Dto/CustomerViewDto";

interface CustomerInfoProps {
  form: FormInstance<unknown>;
}

const CustomerInfo: FunctionComponent<CustomerInfoProps> = ({ form }) => {
  const handleCustomerChange = (value: CustomerViewDto) => {
    form.setFieldValue("customer", value);
  };
  return (
    <>
      <CustomDivider />
      <Typography.Title level={3}>Thông tin khách hàng</Typography.Title>
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name={["customer", "fullName"]}
              key="fullName"
              label="Họ tên"
            >
              <CustomerDebounceSelect onChange={handleCustomerChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={["customer", "address"]}
              key="address"
              label="Địa chỉ"
            >
              <Input placeholder="Địa chỉ" disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={["customer", "phoneNumber"]}
              key="phoneNumber"
              label="Số điện thoại"
            >
              <Input placeholder="Số điện thoại" disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={["customer", "email"]} key="email" label="Email">
              <Input placeholder="Email" disabled />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CustomerInfo;
