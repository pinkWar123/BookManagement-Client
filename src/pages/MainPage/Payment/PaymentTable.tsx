import { Button, Table, TableProps } from "antd";
import { FunctionComponent, useState } from "react";
import { ICustomer } from "../../../models/Customer/Customer";
import { CUSTOMERS } from "../../../data/customers";
import PaymentModal from "./PaymentModal";

interface PaymentTableProps {}

interface ModalConfig {
  open: boolean;
  value?: ICustomer;
}

const PaymentTable: FunctionComponent<PaymentTableProps> = () => {
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    open: false,
  });
  const [customers, setCustomers] = useState<ICustomer[]>(CUSTOMERS);
  const columns: TableProps<ICustomer>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ tên",
      dataIndex: "customerName",
      key: "fullName",
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Tổng nợ",
      dataIndex: "totalDebt",
      key: "totalDebt",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() =>
              setModalConfig({
                open: true,
                value: record,
              })
            }
          >
            Thu tiền
          </Button>
        </>
      ),
    },
  ];
  const handleClose = () => {
    setModalConfig({ open: false });
  };
  const handleCharge = (amount: number, customer: ICustomer) => {
    setCustomers((customers) =>
      customers.map((_customer) =>
        _customer === customer
          ? {
              ...customer,
              totalDebt: customer.totalDebt - amount,
            }
          : _customer
      )
    );
  };
  return (
    <>
      <Table columns={columns} dataSource={customers} />
      {modalConfig.open && (
        <PaymentModal
          customer={modalConfig.value}
          handleClose={handleClose}
          onCharge={handleCharge}
        />
      )}
    </>
  );
};

export default PaymentTable;
