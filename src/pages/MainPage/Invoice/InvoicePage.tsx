import { FunctionComponent } from "react";
import InvoiceTable from "./InvoiceTable";
import CustomerInfo from "../../../components/CustomerInfo/CustomerInfo";
import CustomDivider from "../../../components/CustomDivider/CustomDivider";
import { Typography } from "antd";

interface InvoicePageProps {}

const InvoicePage: FunctionComponent<InvoicePageProps> = () => {
  return (
    <>
      <Typography.Title>Hóa đơn bán hàng</Typography.Title>
      <CustomerInfo />
      <CustomDivider />
      <InvoiceTable />
    </>
  );
};

export default InvoicePage;
