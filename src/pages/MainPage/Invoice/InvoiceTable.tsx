import {
  Button,
  Flex,
  Form,
  FormInstance,
  Input,
  Popconfirm,
  Table,
  TableProps,
  Tag,
} from "antd";
import { FunctionComponent, useState } from "react";
import { Plus, Trash } from "react-feather";
import TitleDebounceSelect, {
  BookValue,
} from "../../../components/Debouncer/TitleDebounceSelect";
import TypedInputNumber from "antd/es/input-number";
import styles from "./Invoice.module.scss";
interface InvoiceTableTableProps {
  form: FormInstance<unknown>;
  data: DataType[] | undefined;
  setData: React.Dispatch<React.SetStateAction<DataType[] | undefined>>;
}

export interface DataType {
  order: number;
  key: number;
  title: string;
  sellQuantity: number;
  price: number;
  total: number;
  id: number;
  stockQuantity: number;
}

interface IProps {
  key: string;
  value: number;
}

const InvoiceTable: FunctionComponent<InvoiceTableTableProps> = ({
  form,
  data,
  setData,
}) => {
  const [count, setCount] = useState<number>(1);
  const [total, setTotal] = useState<IProps[] | undefined>();
  const handleAdd = () => {
    const newData: DataType = {
      title: "",
      key: count,
      order: count,
      sellQuantity: 0,
      price: 0,
      total: 0,
      id: 0,
      stockQuantity: 0,
    };
    setData((prev) => {
      if (!prev) return [newData];
      return [...prev, newData];
    });
    setCount((prev) => prev + 1);
    setTotal((prev) => {
      const newItem = { key: count.toString(), value: 0 };
      if (!prev) return [newItem];
      return [
        ...prev,
        {
          key: count.toString(),
          value: 0,
        },
      ];
    });
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
    console.log(item);
    form.setFieldValue(["bookList", id], item);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "order",
      key: "STT",
      render: (_, record) => (
        <span>
          {record && data?.findIndex((item) => item.key === record.key)
            ? data?.findIndex((item) => item.key === record.key) + 1
            : 1}
        </span>
      ),
    },
    {
      title: "Tên sách",
      dataIndex: "title",
      key: "title",
      width: "35%",
      render: (_, record) => {
        return (
          <Form.Item name={["bookList", record.key.toString(), "title"]}>
            <TitleDebounceSelect
              id={record.key.toString()}
              onChange={handleSelect}
            />
          </Form.Item>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "sellQuantity",
      key: "sellQuantity",
      width: "5%",
      render: (_, record) => (
        <Form.Item
          name={["bookList", record.key.toString(), "sellQuantity"]}
          rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
        >
          <TypedInputNumber
            type="number"
            min={1}
            max={form.getFieldValue([
              "bookList",
              record.key.toString(),
              "stockQuantity",
            ])}
            required
            onChange={(e) => {
              const _record = form.getFieldValue([
                "bookList",
                record.key.toString(),
              ]);
              console.log(_record.price);
              form.setFieldValue(["bookList", record.key.toString()], {
                ..._record,
                sellQuantity: e,
                total: (e ?? 0) * _record.price,
              });
              setTotal((prev) => {
                const newItem = {
                  key: record.key.toString(),
                  value: e !== null ? e * _record.price : 0,
                };
                if (!prev) return prev;
                else
                  return (
                    prev?.map((item) =>
                      item.key === newItem.key ? newItem : item
                    ) ?? []
                  );
              });
            }}
          />
        </Form.Item>
      ),
    },
    {
      title: "Tồn kho",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
      width: "10%",
      render: (_, record) => (
        <Form.Item name={["bookList", record.key.toString(), "stockQuantity"]}>
          <Input disabled variant="borderless" />
        </Form.Item>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      width: "20%",
      render: (_, record) => (
        <Form.Item name={["bookList", record.key.toString(), "price"]}>
          <Input disabled variant="borderless" />
        </Form.Item>
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      width: "20%",

      render: (_, record) => (
        <Form.Item name={["bookList", record.key.toString(), "total"]}>
          <Tag>
            {form.getFieldValue(["bookList", record.key.toString()])?.title
              ? total?.find((x) => x.key === record.key.toString())?.value
              : 0}
          </Tag>
        </Form.Item>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Popconfirm
            title="Bạn có chắc muốn hủy dòng này không?"
            onConfirm={() => handleRemove(record.key)}
          >
            <a>
              <Trash />
            </a>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Flex gap="small">
        <Button onClick={handleAdd} icon={<Plus />}>
          Thêm sách
        </Button>
      </Flex>
      <Form
        initialValues={undefined}
        form={form}
        className={styles["add-book-btn"]}
      >
        <Table columns={columns} dataSource={data}></Table>
      </Form>
    </>
  );
};

export default InvoiceTable;
