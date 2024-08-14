import { FunctionComponent } from "react";
import Guard, { PageGuardProps } from "./Guard";
import { REGULATION_ROLES } from "../../routes/permission";

export interface RegulationGuardProps extends PageGuardProps {}

const RegulationGuard: FunctionComponent<RegulationGuardProps> = ({
  children,
}) => {
  return <Guard roles={REGULATION_ROLES}>{children}</Guard>;
};

export default RegulationGuard;
