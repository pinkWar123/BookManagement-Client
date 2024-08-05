import { App, Button, Table, TableProps } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import { ICustomer } from "../../../models/Customer/Customer";
import PaymentModal from "./PaymentModal";
import useQueryParams from "../../../hooks/useQueryParams";
import { callGetCustomers } from "../../../services/customerService";
import { handleAxiosError } from "../../../helpers/errorHandling";
import { CustomerViewDto } from "../../../models/Customer/Dto/CustomerViewDto";
import QueryBuilder from "./QueryBuilder";

interface PaymentTableProps {}

interface ModalConfig {
  open: boolean;
  value?: ICustomer;
}

const PaymentTable: FunctionComponent<PaymentTableProps> = () => {
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    open: false,
  });
  const [customers, setCustomers] = useState<CustomerViewDto[]>();
  const { getQuery, pagination, setPagination } = useQueryParams();
  const { message } = App.useApp();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        console.log(getQuery());
        const res = await callGetCustomers(getQuery());
        console.log(res);
        setCustomers(res.data);
      } catch (error) {
        message.error({ content: handleAxiosError(error) });
      }
    };
    fetchCustomers();
  }, [getQuery, message]);
  const columns: TableProps<CustomerViewDto>["columns"] = [
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
      <QueryBuilder />
      <Table
        columns={columns}
        dataSource={customers}
        pagination={{
          pageSize: pagination.pageSize,
          total: pagination.total,
          current: pagination.pageNumber,
        }}
      />
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
