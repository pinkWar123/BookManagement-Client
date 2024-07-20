import { FunctionComponent } from "react";
import InvoiceTable from "./InvoiceTable";
import CustomerInfo from "../../../components/CustomerInfo/CustomerInfo";

interface InvoicePageProps {}

const InvoicePage: FunctionComponent<InvoicePageProps> = () => {
  return (
    <>
      <CustomerInfo />
      <InvoiceTable />
    </>
  );
};

export default InvoicePage;
