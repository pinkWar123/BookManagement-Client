import { App, Button, Flex, Form, Input, InputNumber, Modal } from "antd";
import { FunctionComponent, useState } from "react";
import CustomDivider from "../../../components/CustomDivider/CustomDivider";
import { CustomerViewDto } from "../../../models/Customer/Dto/CustomerViewDto";

interface PaymentModalProps {
  customer?: CustomerViewDto;
  handleClose: () => void;
  onCharge: (amount: number, customer: CustomerViewDto) => void;
}
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 48 },
};
const PaymentModal: FunctionComponent<PaymentModalProps> = ({
  customer,
  handleClose,
  onCharge,
}) => {
  const { modal } = App.useApp();
  const [payAmount, setPayAmount] = useState<number>(0);
  if (!customer) return;
  const handleCharge = () => {
    modal.confirm({
      title: "Bạn có chắc chắn thu tiền không?",
      onOk: () => {
        onCharge(payAmount, customer);
      },
    });
  };
  return (
    <>
      <Modal open centered footer={<></>} onCancel={handleClose}>
        <Flex justify="center">
          <strong>Phiếu thu tiền</strong>
        </Flex>
        <CustomDivider />
        <strong>Thông tin khách hàng</strong>
        <Form layout="horizontal" {...layout}>
          <Form.Item label="Họ tên">
            <Input
              disabled
              variant="borderless"
              value={customer.customerName}
            />
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Input disabled variant="borderless" value={customer.phoneNumber} />
          </Form.Item>
          <Form.Item label="Địa chỉ">
            <Input disabled variant="borderless" value={customer.address} />
          </Form.Item>
          <Form.Item label="Email">
            <Input disabled variant="borderless" value={customer.email} />
          </Form.Item>
        </Form>
        <CustomDivider />
        <Flex justify="space-between">
          <strong>Nợ cũ</strong>
          <strong>{customer.totalDebt}</strong>
        </Flex>
        <Flex justify="space-between" style={{ marginTop: "30px" }}>
          <strong>Thanh toán</strong>
          <Form.Item>
            <InputNumber
              placeholder="Nhập số tiền"
              min={0}
              onChange={(value) => setPayAmount(value ?? 0)}
            />
          </Form.Item>
        </Flex>
        <CustomDivider />
        <Flex justify="space-between">
          <strong>Nợ mới</strong>
          <div>{customer.totalDebt - (payAmount ?? 0)}</div>
        </Flex>
        <Flex justify="flex-end" style={{ marginTop: "20px" }}>
          <Button
            type="primary"
            disabled={payAmount === 0}
            onClick={handleCharge}
          >
            Thu tiền
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default PaymentModal;
