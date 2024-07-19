import { Flex, Form, Input, Modal } from "antd";
import TypedInputNumber from "antd/es/input-number";
import { FunctionComponent, useState } from "react";
import CancelButton from "../../../components/Button/CancelButton";
import ConfirmButton from "../../../components/Button/ConfirmButton";

interface AddBookModalProps {
  open: boolean;
  closeModal: () => void;
}

const AddBookModal: FunctionComponent<AddBookModalProps> = ({
  open,
  closeModal,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Modal centered open={open} onClose={closeModal} footer={<></>}>
      <Form layout="vertical">
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
          <TypedInputNumber
            defaultValue={10}
            placeholder="Nhập số lượng sách..."
          />
        </Form.Item>
        <Form.Item name="genre" key="genre" label="Thể loại" required>
          <Input placeholder="Nhập thể loại..." />
        </Form.Item>
        <Flex gap="small">
          <Form.Item>
            <CancelButton onClick={closeModal} />
          </Form.Item>
          <Form.Item>
            <ConfirmButton loading={loading} onClick={() => setLoading(true)} />
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};

export default AddBookModal;
