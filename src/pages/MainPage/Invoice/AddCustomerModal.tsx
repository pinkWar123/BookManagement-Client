import { App, Flex, Form, Input, InputNumber, Modal } from "antd";
import { FunctionComponent } from "react";
import CancelButton from "../../../components/Button/CancelButton";
import ConfirmButton from "../../../components/Button/ConfirmButton";
import { CreateCustomerDto } from "../../../models/Customer/Dto/CreateCustomerDto";
import { callCreateCustomer } from "../../../services/customerService";
import { handleAxiosError } from "../../../helpers/errorHandling";

interface AddCustomerModalProps {
  onClose: () => void;
}
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 48 },
};
const AddCustomerModal: FunctionComponent<AddCustomerModalProps> = ({
  onClose,
}) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const handleSubmit = async () => {
    form.validateFields();
    const createCustomerDto: CreateCustomerDto = form.getFieldsValue();
    try {
      const res = await callCreateCustomer(createCustomerDto);
      if (res?.data) {
        message.success({ content: "Thêm khách hàng thành công" });
        onClose();
      }
    } catch (error) {
      message.error({ content: handleAxiosError(error) });
    }
  };
  return (
    <Modal
      open
      title="Tạo mới khách hàng"
      onCancel={onClose}
      onClose={onClose}
      footer={<></>}
    >
      <Form
        {...layout}
        layout="horizontal"
        form={form}
        initialValues={{
          totalDebt: 0,
        }}
      >
        <Form.Item
          label="Tên"
          name="customerName"
          key={"customerName"}
          required
          rules={[
            { required: true, message: "Tên khách hàng không được để trống" },
          ]}
        >
          <Input placeholder="Nhập tên khách hàng" />
        </Form.Item>
        <Form.Item label="Nợ" name={"totalDebt"} key={"totalDebt"} required>
          <InputNumber placeholder="Nhập nợ ban đầu" min={0} />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          key="address"
          name={"address"}
          required
          rules={[{ required: true, message: "Địa chỉ không được để trống" }]}
        >
          <Input placeholder="Nhập số nhà, tên đường, quận huyện" />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          key={"phoneNumber"}
          required
          rules={[
            { required: true, message: "Số điện thoại không được để trống" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name={"email"}
          key={"email"}
          rules={[{ type: "email", message: "Email không hợp lệ" }]}
        >
          <Input type="email" placeholder="Nhập địa chỉ email hợp lệ" />
        </Form.Item>

        <Flex justify="flex-end" gap="middle">
          <CancelButton onClick={onClose} />
          <ConfirmButton onClick={handleSubmit} />
        </Flex>
      </Form>
    </Modal>
  );
};

export default AddCustomerModal;
