import { FunctionComponent, useState } from "react";
import InvoiceTable from "./InvoiceTable";
import CustomerInfo from "../../../components/CustomerInfo/CustomerInfo";
import CustomDivider from "../../../components/CustomDivider/CustomDivider";
import { Button, Flex, Typography } from "antd";
import { Plus } from "react-feather";
import styles from "./Invoice.module.scss";
import AddCustomerModal from "./AddCustomerModal";

interface InvoicePageProps {}

const InvoicePage: FunctionComponent<InvoicePageProps> = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
      <CustomerInfo />
      <CustomDivider />
      <InvoiceTable />
      {openModal && <AddCustomerModal onClose={handleCloseModal} />}
    </>
  );
};

export default InvoicePage;
