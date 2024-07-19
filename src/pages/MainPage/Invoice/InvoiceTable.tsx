import {
  Button,
  Flex,
  Form,
  Input,
  Popconfirm,
  Table,
  TableProps,
  Tag,
} from "antd";
import { FunctionComponent, useState } from "react";
import { Trash } from "react-feather";
import TitleDebounceSelect, {
  BookValue,
} from "../../../components/Debouncer/TitleDebounceSelect";
import TypedInputNumber from "antd/es/input-number";

interface InvoiceTableTableProps {}

interface DataType {
  order: number;
  key: number;
  title: string;
  sellQuantity: number;
  price: number;
  total: number;
}

const InvoiceTable: FunctionComponent<InvoiceTableTableProps> = () => {
  const [data, setData] = useState<DataType[] | undefined>();
  const [count, setCount] = useState<number>(1);
  const [total, setTotal] = useState<
    [{ key: string; value: number }] | undefined
  >();
  const [form] = Form.useForm();
  const handleAdd = () => {
    const newData: DataType = {
      title: "",
      key: count,
      order: count,
      sellQuantity: 0,
      price: 0,
      total: 0,
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
    form.setFieldValue(id, item);
  };

  const calculateTotal = (record: DataType) => {
    console.log(record.price);
    return record.sellQuantity * record.price;
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
      width: "30%",
      render: (_, record) => {
        console.log(record.key.toString());
        return (
          <Form.Item name={[record.key.toString(), "title"]}>
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
      render: (_, record) => (
        <Form.Item name={[record.key.toString(), "sellQuantity"]}>
          <TypedInputNumber
            type="number"
            min={0}
            required
            onChange={(e) => {
              const _record = form.getFieldValue(record.key.toString());
              console.log(_record.price);
              console.log(e);
              console.log(e * _record.price);
              form.setFieldValue(record.key.toString(), {
                ..._record,
                sellQuantity: e,
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
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (_, record) => (
        <Form.Item name={[record.key.toString(), "price"]}>
          <Input disabled variant="borderless" />
        </Form.Item>
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (_, record) => (
        <Form.Item name={[record.key.toString(), "total"]}>
          <Tag>
            {form.getFieldValue([record.key.toString()])?.title
              ? total?.find((item) => item.key === record.key.toString())
                  ?.value ?? 0
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
        <Button onClick={handleAdd}>Thêm sách</Button>
        <Button>Get all data</Button>
      </Flex>
      <Form initialValues={undefined} form={form}>
        <Table columns={columns} dataSource={data}></Table>
      </Form>
      <Button
        onClick={() => {
          console.log(form.getFieldsValue());
          console.log(data);
          form.validateFields();
        }}
      >
        Submit
      </Button>
    </>
  );
};

export default InvoiceTable;
