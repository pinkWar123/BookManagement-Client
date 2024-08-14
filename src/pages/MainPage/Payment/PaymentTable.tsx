import { App, Button, Table, TableProps } from "antd";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import PaymentModal from "./PaymentModal";
import useQueryParams from "../../../hooks/useQueryParams";
import { callGetCustomers } from "../../../services/customerService";
import { handleAxiosError } from "../../../helpers/errorHandling";
import { CustomerViewDto } from "../../../models/Customer/Dto/CustomerViewDto";
import QueryBuilder from "./QueryBuilder";
import { CreatePaymentReceiptDto } from "../../../models/PaymentReceipt/CreatePaymentReceiptDto";
import { getToday } from "../../../helpers/date";
import { createPaymentReceipt } from "../../../services/paymentReceiptService";

interface PaymentTableProps {}

interface ModalConfig {
  open: boolean;
  value?: CustomerViewDto;
}

const PaymentTable: FunctionComponent<PaymentTableProps> = () => {
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    open: false,
  });
  const [customers, setCustomers] = useState<CustomerViewDto[]>();
  const { getQuery, pagination } = useQueryParams();
  const { message } = App.useApp();

  const fetchCustomers = useCallback(async () => {
    try {
      console.log(getQuery());
      const res = await callGetCustomers(getQuery());
      console.log(res);
      setCustomers(res.data);
    } catch (error) {
      message.error({ content: handleAxiosError(error) });
    }
  }, [getQuery, message]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);
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
            disabled={record.totalDebt <= 0}
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
  const handleCharge = async (amount: number, customer: CustomerViewDto) => {
    console.log(amount);
    console.log(customer.id);
    try {
      const createPaymentReceiptDto: CreatePaymentReceiptDto = {
        receiptDate: getToday(),
        amount,
        customerId: customer.id,
      };
      const res = await createPaymentReceipt(createPaymentReceiptDto);
      console.log(res.data);
      if (res.data) {
        message.success({
          content: `Đã thu tiền khách hàng ${customer.customerName} với số tiền ${amount}`,
        });
        await fetchCustomers();
        handleClose();
      }
    } catch (error) {
      message.error({ content: handleAxiosError(error) });
    }
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
