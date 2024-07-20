import { Divider, Table, TableProps, Tag } from "antd";
import { FunctionComponent } from "react";

interface DeptTableProps {}

interface IDebt {
  title: string;
  startDebt: number;
  change: number;
  endDebt: number;
  order: number;
}

const data: IDebt[] = [
  {
    order: 1,
    title: "Dám bị ghét",
    startDebt: 2,
    change: 150,
    endDebt: 300,
  },
  {
    order: 2,
    title: "Dám hạnh phúc",
    startDebt: 2,
    change: 120,
    endDebt: 240,
  },
];

const DeptTable: FunctionComponent<DeptTableProps> = () => {
  const columns: TableProps<IDebt>["columns"] = [
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
      title: "Nợ đầu",
      dataIndex: "startDebt",
      key: "startDebt",
      render: (value) => <Tag>{value}</Tag>,
    },
    {
      title: "Nợ cuối",
      dataIndex: "endDebt",
      key: "endDebt",
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
      <Divider>Tình trạng nợ</Divider>
      <Table columns={columns} dataSource={data}></Table>
    </>
  );
};

export default DeptTable;
