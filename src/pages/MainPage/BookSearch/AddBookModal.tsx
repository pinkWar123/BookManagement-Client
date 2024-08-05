import { App, Flex, Form, Input, InputNumber, Modal, Select } from "antd";
import TypedInputNumber from "antd/es/input-number";
import { FunctionComponent, useState } from "react";
import CancelButton from "../../../components/Button/CancelButton";
import ConfirmButton from "../../../components/Button/ConfirmButton";
import { CreateBookDto } from "../../../models/Book/Dto/CreateBookDto";
import { handleAxiosError } from "../../../helpers/errorHandling";
import { callCreateNewBook } from "../../../services/bookService";
import { BOOK_GENRES } from "../../../constants/bookGenres";

interface AddBookModalProps {
  open: boolean;
  closeModal: () => void;
  fetchBook: () => Promise<void>;
}

const AddBookModal: FunctionComponent<AddBookModalProps> = ({
  open,
  closeModal,
  fetchBook,
}) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async () => {
    await form.validateFields();
    try {
      setLoading(true);
      const createBookDto: CreateBookDto = form.getFieldsValue();
      const res = await callCreateNewBook(createBookDto);
      console.log(res);
      if (res.data) {
        message.success({ content: "Tạo mới sách thành công" });
        setLoading(false);
        await fetchBook();
        closeModal();
      }
    } catch (error) {
      message.error({ content: handleAxiosError(error) });
      setLoading(false);
      closeModal();
    }
  };
  return (
    <Modal
      centered
      open={open}
      onClose={closeModal}
      onCancel={closeModal}
      footer={<></>}
      title="Thêm sách"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          stockQuantity: 0,
          price: 0,
        }}
      >
        <Form.Item name="title" key="title" label="Tên sách:" required>
          <Input placeholder="Nhập tên sách..." />
        </Form.Item>
        <Form.Item name="author" key="author" label="Tác giả" required>
          <Input placeholder="Nhập tác giả..." />
        </Form.Item>
        <Form.Item
          name="stockQuantity"
          key="stockQuantity"
          label="Số lượng nhập vào"
          required
        >
          <TypedInputNumber placeholder="Nhập số lượng sách..." min={0} />
        </Form.Item>
        <Form.Item name="genre" key="genre" label="Thể loại" required>
          <Select
            placeholder="Nhập thể loại..."
            options={BOOK_GENRES.map((bookGenre) => ({
              label: bookGenre,
              value: bookGenre,
            }))}
          />
        </Form.Item>
        <Form.Item name="price" key={"price"} label="Giá bán" required>
          <InputNumber min={0} />
        </Form.Item>
        <Flex gap="small">
          <Form.Item>
            <CancelButton onClick={closeModal} />
          </Form.Item>
          <Form.Item>
            <ConfirmButton loading={loading} onClick={onSubmit} />
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};

export default AddBookModal;
