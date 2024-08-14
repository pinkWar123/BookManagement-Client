import { FunctionComponent, useState } from "react";
import InvoiceTable, { DataType } from "./InvoiceTable";
import CustomerInfo from "../../../components/CustomerInfo/CustomerInfo";
import CustomDivider from "../../../components/CustomDivider/CustomDivider";
import { App, Button, Flex, Form, Typography } from "antd";
import { Plus } from "react-feather";
import styles from "./Invoice.module.scss";
import AddCustomerModal from "./AddCustomerModal";
import { CreateInvoiceDto } from "../../../models/Invoice/Dto/CreateInvoiceDto";
import { callCreateInvoce } from "../../../services/invoiceService";
import { getToday } from "../../../helpers/date";
import { handleAxiosError } from "../../../helpers/errorHandling";

interface InvoicePageProps {}

const InvoicePage: FunctionComponent<InvoicePageProps> = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [data, setData] = useState<DataType[] | undefined>();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const handleCreateInvoice = async () => {
    const values = form.getFieldValue("bookList");
    console.log(values);
    const bookList = Object.values(values).map((value) => {
      const _value = value as unknown as DataType;
      return {
        bookId: _value.id,
        quantity: _value.sellQuantity,
      };
    });
    const customerId = form.getFieldValue(["customer", "id"]);
    if (!customerId) {
      message.error({ content: "Customer không được để trống" });
      return;
    }
    const createInvoiceDto: CreateInvoiceDto = {
      customerId,
      invoiceDate: getToday(),
      invoiceDetails: bookList,
    };
    try {
      const res = await callCreateInvoce(createInvoiceDto);
      if (res.data) {
        message.success({ content: "Tạo hóa đơn thành công" });
        form.resetFields();
        setData([]);
      }
    } catch (error) {
      message.error({ content: handleAxiosError(error) });
    }
  };

  return (
    <>
      <Flex gap="middle">
        <Typography.Title>Hóa đơn bán hàng</Typography.Title>
        <Button
          type="primary"
          icon={<Plus />}
          className={styles["add-customer-btn"]}
          onClick={handleOpenModal}
        >
          Thêm khách hàng
        </Button>
      </Flex>
      <CustomerInfo form={form} />
      <CustomDivider />
      <InvoiceTable form={form} data={data} setData={setData} />
      <Button onClick={handleCreateInvoice}>Tạo hóa đơn</Button>
      {openModal && <AddCustomerModal onClose={handleCloseModal} />}
    </>
  );
};

export default InvoicePage;
