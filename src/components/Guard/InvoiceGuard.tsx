import { FunctionComponent } from "react";
import Guard, { PageGuardProps } from "./Guard";
import { INVOICE_ROLES } from "../../routes/permission";

export interface InvoiceGuardProps extends PageGuardProps {}

const InvoiceGuard: FunctionComponent<InvoiceGuardProps> = ({ children }) => {
  return <Guard roles={INVOICE_ROLES}>{children}</Guard>;
};

export default InvoiceGuard;
