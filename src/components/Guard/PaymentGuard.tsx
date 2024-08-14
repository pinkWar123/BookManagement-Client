import { FunctionComponent } from "react";
import Guard, { PageGuardProps } from "./Guard";
import { PAYMENT_ROLES } from "../../routes/permission";

export interface PaymentGuardProps extends PageGuardProps {}

const PaymentGuard: FunctionComponent<PaymentGuardProps> = ({ children }) => {
  return <Guard roles={PAYMENT_ROLES}>{children}</Guard>;
};

export default PaymentGuard;
