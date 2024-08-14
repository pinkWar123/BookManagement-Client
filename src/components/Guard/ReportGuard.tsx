import { FunctionComponent } from "react";
import Guard, { PageGuardProps } from "./Guard";
import { REPORT_ROLES } from "../../routes/permission";

export interface ReportGuardProps extends PageGuardProps {}

const ReportGuard: FunctionComponent<ReportGuardProps> = ({ children }) => {
  return <Guard roles={REPORT_ROLES}>{children}</Guard>;
};

export default ReportGuard;
