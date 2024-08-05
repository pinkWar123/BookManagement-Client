import { Flex, Form, Input, InputNumber, Modal, Select } from "antd";
import { FunctionComponent } from "react";
import { BookViewDto } from "../../../models/Book/Dto/BookViewDto";
import { BOOK_GENRES } from "../../../constants/bookGenres";
import { UpdateBookDto } from "../../../models/Book/Dto/UpdateBookDto";
import CancelButton from "../../../components/Button/CancelButton";
import ConfirmButton from "../../../components/Button/ConfirmButton";

interface UpdateBookModalProps {
  info: BookViewDto;
  onUpdate: (updateBookDto: UpdateBookDto) => Promise<void>;
  onClose: () => void;
}

const UpdateBookModal: FunctionComponent<UpdateBookModalProps> = ({
  info,
  onUpdate,
  onClose,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    await form.validateFields();
    const updateBookDto: UpdateBookDto = {
      ...form.getFieldsValue(),
      stockQuantity: info.stockQuantity,
    };
    await onUpdate(updateBookDto);
  };
  return (
    <Modal
      open={true}
      title="Cập nhật thông tin sách"
      footer={<></>}
      onClose={onClose}
      onCancel={onClose}
    >
      <Form initialValues={info} form={form} layout="vertical">
        <Form.Item
          label="Tên sách"
          key={"title"}
          name={"title"}
          rules={[
            {
              required: true,
              message: "Tên sách không được để trống",
            },
          ]}
        >
          <Input placeholder="Nhập tiêu đề mới..." />
        </Form.Item>
        <Form.Item
          label="Tác giả"
          key={"author"}
          name={"author"}
          rules={[
            {
              required: true,
              message: "Tên tác giả không được để trống",
            },
          ]}
        >
          <Input placeholder="Nhập tên tác giả" />
        </Form.Item>
        <Form.Item label="Thể loại" name={"genre"} key={"genre"}>
          <Select
            options={BOOK_GENRES.map((genre) => ({
              value: genre,
              label: genre,
            }))}
          />
        </Form.Item>
        <Form.Item label="Giá bán" name={"price"} key={"price"}>
          <InputNumber min={0} />
        </Form.Item>
        <Flex gap="small" justify="flex-end">
          <CancelButton onClick={onClose} cancelText="Hủy" />
          <ConfirmButton onClick={handleSubmit} confirmText="Xác nhận" />
        </Flex>
      </Form>
    </Modal>
  );
};

export default UpdateBookModal;
