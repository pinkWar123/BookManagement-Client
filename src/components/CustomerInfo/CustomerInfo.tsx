import {
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import { FunctionComponent, useState } from "react";
import { dateFormat } from "../../constants/dateFormat";
import dayjs from "dayjs";
import TypedInputNumber from "antd/es/input-number";
import { PROVINCES } from "../../data/provinces";
import { DISTRICTS } from "../../data/districts";

interface CustomerInfoProps {}

interface ICustomerInfo {
  fullname: string;
  phone: string;
  email: string;
  province: string;
  district: string;
  address: string;
}

const CustomerInfo: FunctionComponent<CustomerInfoProps> = () => {
  const [customerInfo, setCustomerInfo] = useState<ICustomerInfo>();
  return (
    <Form
      onValuesChange={(_, values) => {
        setCustomerInfo(values);
      }}
    >
      <Form.Item label="Ngày nhập sách" name={["date"]} key="date">
        <DatePicker
          onChange={(date) => console.log(date.format(dateFormat))}
          format={dateFormat}
          defaultValue={dayjs()}
        />
      </Form.Item>
      <Flex
        justify="space-around"
        style={{ backgroundColor: "#aaa", padding: "20px" }}
      >
        <Col span={4} style={{ alignContent: "center" }}>
          <Form.Item name={["fullname"]}>
            <Input placeholder="Họ tên" />
          </Form.Item>
          <Form.Item name={["phone"]}>
            <TypedInputNumber placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item name={["email"]}>
            <Input placeholder="Địa chỉ email" type="email" />
          </Form.Item>
        </Col>
        <Col
          span={16}
          style={{
            marginLeft: "20px",
            alignContent: "center",
            backgroundColor: "#ddd",
            padding: "0px 30px",
          }}
        >
          <Typography.Title level={2}>Địa chỉ</Typography.Title>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={["province"]}>
                <Select
                  options={PROVINCES.data.data.map((province) => ({
                    label: province.name,
                    value: province.code,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["district"]}>
                <Select
                  placeholder="Quận"
                  options={
                    customerInfo?.province
                      ? DISTRICTS.data.data
                          .filter(
                            (item) =>
                              item.parent_code === customerInfo?.province
                          )
                          .map((district) => ({
                            label: district.name,
                            value: district.code,
                          }))
                      : undefined
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Input placeholder="Tên đường, số nhà" />
          </Form.Item>
        </Col>
      </Flex>
    </Form>
  );
};

export default CustomerInfo;
