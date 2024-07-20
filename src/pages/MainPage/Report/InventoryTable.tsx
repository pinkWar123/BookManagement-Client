import { Divider, Table, TableProps, Tag } from "antd";
import { FunctionComponent } from "react";

interface InventoryTableProps {}

interface IInventory {
  title: string;
  startInventory: number;
  change: number;
  endInventory: number;
  order: number;
}

const data: IInventory[] = [
  {
    order: 1,
    title: "Dám bị ghét",
    startInventory: 2,
    change: 150,
    endInventory: 300,
  },
  {
    order: 2,
    title: "Dám hạnh phúc",
    startInventory: 2,
    change: 120,
    endInventory: 240,
  },
];

const InventoryTable: FunctionComponent<InventoryTableProps> = () => {
  const columns: TableProps<IInventory>["columns"] = [
    {
      title: "STT",
      dataIndex: "order",
      key: "STT",
      render: (value) => <span>{value}</span>,
    },
    {
      title: "Tên sách",
      dataIndex: "title",
      key: "title",
      width: "30%",
      render: (value) => <span>{value}</span>,
    },
    {
      title: "Tồn đầu",
      dataIndex: "startInventory",
      key: "startInventory",
      render: (value) => <Tag>{value}</Tag>,
    },
    {
      title: "Tồn cuối",
      dataIndex: "endInventory",
      key: "endInventory",
      render: (value) => <span>{value}</span>,
    },
    {
      title: "Phát sinh",
      dataIndex: "change",
      key: "change",
      render: (value) => <span>{value}</span>,
    },
  ];
  return (
    <>
      <Divider>Tình trạng tồn</Divider>
      <Table columns={columns} dataSource={data}></Table>
    </>
  );
};

export default InventoryTable;
