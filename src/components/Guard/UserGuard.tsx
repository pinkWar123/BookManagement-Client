import { FunctionComponent } from "react";
import Guard, { PageGuardProps } from "./Guard";
import { USER_ROLES } from "../../routes/permission";

export interface UserGuardProps extends PageGuardProps {}

const UserGuard: FunctionComponent<UserGuardProps> = ({ children }) => {
  return <Guard roles={USER_ROLES}>{children}</Guard>;
};

export default UserGuard;
