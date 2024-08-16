import { Button, Flex, Form, Input, Popconfirm, Table, TableProps } from "antd";
import TypedInputNumber from "antd/es/input-number";
import { FunctionComponent, useState } from "react";
import { CreditCard, Plus, Trash } from "react-feather";
import TitleDebounceSelect, {
  BookValue,
} from "../../../components/Debouncer/TitleDebounceSelect";
import styles from "./BookEntryPage.module.scss";
interface BookEntryTableProps {}

interface DataType {
  order: number;
  key: number;
  title: string;
  genre: string;
  author: string;
  stockQuantity: number;
}

const BookEntryTable: FunctionComponent<BookEntryTableProps> = () => {
  const [data, setData] = useState<DataType[] | undefined>();
  const [count, setCount] = useState<number>(1);
  const [form] = Form.useForm();
  const handleAdd = () => {
    const newData: DataType = {
      title: "",
      key: count,
      order: count,
      genre: "",
      author: "",
      stockQuantity: 0,
    };
    setData((prev) => {
      if (!prev) return [newData];
      return [...prev, newData];
    });
    setCount((prev) => prev + 1);
  };
  const handleRemove = (key: number) => {
    console.log(key);
    if (!data || data.length === 0) return;
    const itemToRemove = data.find((item) => item.key === key);
    if (!itemToRemove) return;
    const newData = data.filter((item) => item.key !== key);
    setData(
      newData.map((item) =>
        item.order < itemToRemove?.order
          ? item
          : { ...item, order: item.order - 1 }
      )
    );
  };
  const handleSelect = (id: string, item?: BookValue) => {
    console.log("change");
    form.setFieldValue(id, item);

    // setIds(prev => )
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "order",
      width: "10%",
      key: "STT",
      render: (_, record) => (
        <Form.Item key={`stt-${record.key.toString()}`}>
          <Input
            disabled
            variant="borderless"
            value={
              record && data?.findIndex((item) => item.key === record.key)
                ? data?.findIndex((item) => item.key === record.key) + 1
                : 1
            }
          ></Input>
        </Form.Item>
      ),
    },
    {
      title: "Tên sách",
      dataIndex: "title",
      key: "title",
      width: "30%",
      render: (value, record) => {
        console.log(record.key.toString());
        return (
          <Form.Item
            name={[record.key.toString(), "title"]}
            key={`opt-${value.bookId}`}
          >
            <TitleDebounceSelect
              id={record.key.toString()}
              onChange={handleSelect}
              getExistedValues={() => form.getFieldsValue()}
            />
          </Form.Item>
        );
      },
    },
    {
      title: "Thể loại",
      dataIndex: "genre",
      key: "genre",
      render: (_, record) => (
        <Form.Item name={[record.key.toString(), "genre"]}>
          <Input disabled variant="borderless" />
        </Form.Item>
      ),
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      render: (_, record) => (
        <Form.Item name={[record.key.toString(), "author"]}>
          <Input disabled variant="borderless" />
        </Form.Item>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
      render: (_, record) => (
        <Form.Item
          name={[record.key.toString(), "addQuantity"]}
          rules={[{ required: true }]}
        >
          <TypedInputNumber />
        </Form.Item>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Form.Item key={`remove_icon-${record.key.toString()}`}>
          <Popconfirm
            title="Bạn có chắc muốn hủy dòng này không?"
            onConfirm={() => handleRemove(record.key)}
          >
            <a>
              <Trash />
            </a>
          </Popconfirm>
        </Form.Item>
      ),
    },
  ];

  const handleSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
  };

  return (
    <>
      <Flex gap="small">
        <Button
          onClick={handleAdd}
          icon={<Plus size={16} />}
          className={styles["add-btn"]}
        >
          Thêm sách
        </Button>
      </Flex>
      <Form initialValues={undefined} form={form}>
        <Table columns={columns} dataSource={data} pagination={false}></Table>
      </Form>
      <Flex justify="flex-end" className={styles["submit"]}>
        <Button
          className={styles["submit-btn"]}
          type="primary"
          icon={<CreditCard size={16} />}
          onClick={() => {
            console.log(form.getFieldsValue());
            console.log(data);
            form.validateFields();
          }}
        >
          Thêm sách
        </Button>
      </Flex>
    </>
  );
};

export default BookEntryTable;
